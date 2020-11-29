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
	CovidRapidAPIHost    = "covid-19-coronavirus-statistics.p.rapidapi.com"
	CovidCountryEndpoint = "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total"
	CovidWorldEndpoint   = "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats"
	CovidTotalType       = "Total"
	CovidStatType        = "Stat"
)

func doCovidReq(newUrl string) (res *http.Response) {
	req, _ := http.NewRequest("GET", newUrl, nil)
	addRapidApiHeaders(req, CovidRapidAPIHost)
	res, _ = http.DefaultClient.Do(req)
	return res
}

func createCovidWidget(c *gin.Context) {
	userID, _ := auth.ExtractTokenID(c.Request)
	covType := c.Query("type")
	if covType != CovidStatType && covType != CovidTotalType {
		_ = c.AbortWithError(http.StatusBadRequest, fmt.Errorf("no cov type"))
		return
	}
	country := c.Query("country")
	fields := c.DefaultQuery("fields", "")
	timer := c.DefaultQuery("timer", "30")
	time, err := strconv.Atoi(timer)
	if err != nil {
		_ = c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	if cov, err := controllers.CreateCovid(userID, covType, country, fields, time); err != nil {
		_ = c.AbortWithError(http.StatusBadRequest, err)
	} else {
		c.JSON(http.StatusCreated, cov)
	}
}

func getCovidWidget(c *gin.Context) {
	widgetID := c.Param("id")
	id, err := strconv.Atoi(widgetID)
	if err != nil {
		_ = c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	widget, err := controllers.FindCovidByID(uint(id))
	if err != nil {
		_ = c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	var apiUrl string
	switch widget.Type {
	case CovidTotalType:
		apiUrl = CovidCountryEndpoint
	case CovidStatType:
		apiUrl = CovidWorldEndpoint
	default:
		c.AbortWithError(http.StatusBadRequest, errors.New("type not found"))
		return
	}
	u, _ := url.Parse(apiUrl)
	values, _ := url.ParseQuery(u.RawQuery)
	if widget.Country != "" {
		values.Set("country", widget.Country)
	}
	u.RawQuery = values.Encode()
	res := doCovidReq(fmt.Sprintf("%v", u))
	c.DataFromReader(
		http.StatusOK,
		res.ContentLength, gin.MIMEJSON,
		res.Body, nil)
}
