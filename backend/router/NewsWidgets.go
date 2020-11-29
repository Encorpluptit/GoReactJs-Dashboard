package router

import (
	"AppDev_DashBoard/auth"
	"AppDev_DashBoard/controllers"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"net/url"
	"strconv"
)

const (
	NewsRapidAPIHost = "webit-news-search.p.rapidapi.com"
	SearchEndpoint   = "https://webit-news-search.p.rapidapi.com/search"
	TrendingEndpoint = "https://webit-news-search.p.rapidapi.com/trending"
	SearchType       = "Search"
	TrendingType     = "Trending"
)

func doNewsReq(newUrl string) (res *http.Response) {
	req, _ := http.NewRequest("GET", newUrl, nil)
	addRapidApiHeaders(req, NewsRapidAPIHost)
	res, _ = http.DefaultClient.Do(req)
	return res
}

func createNewsWidget(c *gin.Context) {
	userID, _ := auth.ExtractTokenID(c.Request)
	newsType := c.Query("type")
	if newsType != SearchType && newsType != TrendingType {
		_ = c.AbortWithError(http.StatusBadRequest, fmt.Errorf("no news type"))
		return
	}
	lang := c.Query("language")
	topic := c.Query("topic")
	if newsType == SearchType && topic == "" {
		_ = c.AbortWithError(http.StatusBadRequest, fmt.Errorf("no search news topic"))
		return
	}
	fields := c.DefaultQuery("fields", "")
	timer := c.DefaultQuery("timer", "30")
	time, err := strconv.Atoi(timer)
	if err != nil {
		_ = c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	if cov, err := controllers.CreateNews(userID, newsType, lang, topic, fields, time); err != nil {
		_ = c.AbortWithError(http.StatusBadRequest, err)
	} else {
		c.JSON(http.StatusCreated, cov)
	}
}

func getNewsWidget(c *gin.Context) {
	widgetID := c.Param("id")
	id, err := strconv.Atoi(widgetID)
	if err != nil {
		_ = c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	widget, err := controllers.FindNewsByID(uint(id))
	if err != nil {
		_ = c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	var apiUrl string
	switch widget.Type {
	case SearchType:
		apiUrl = SearchEndpoint
	case TrendingType:
		apiUrl = TrendingEndpoint
	default:
		_ = c.AbortWithError(http.StatusBadRequest, errors.New("type not found"))
		return
	}
	u, _ := url.Parse(apiUrl)
	values, _ := url.ParseQuery(u.RawQuery)
	if widget.Lang != "" {
		values.Set("language", widget.Lang)
	}
	if widget.Type == SearchType {
		values.Set("q", widget.Topic)
	}
	u.RawQuery = values.Encode()
	res := doNewsReq(fmt.Sprintf("%v", u))
	c.DataFromReader(
		http.StatusOK,
		res.ContentLength, gin.MIMEJSON,
		res.Body, nil)
}
