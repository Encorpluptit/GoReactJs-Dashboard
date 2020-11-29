package router

import (
	"AppDev_DashBoard/auth"
	"AppDev_DashBoard/controllers"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"net/url"
	"strconv"
)

const (
	WeatherRapidAPIHost = "community-open-weather-map.p.rapidapi.com"
	WeatherEndpoint     = "https://community-open-weather-map.p.rapidapi.com/weather"
)

func doWeatherReq(newUrl string) (res *http.Response) {
	req, _ := http.NewRequest("GET", newUrl, nil)
	addRapidApiHeaders(req, WeatherRapidAPIHost)
	res, _ = http.DefaultClient.Do(req)
	return res
}

func createWeatherWidget(c *gin.Context) {
	userID, _ := auth.ExtractTokenID(c.Request)
	city := c.Query("city")
	if city == "" {
		_ = c.AbortWithError(http.StatusBadRequest, errors.New("no city in query"))
		return
	}
	fields := c.DefaultQuery("fields", "")
	timer := c.DefaultQuery("timer", "30")
	time, err := strconv.Atoi(timer)
	if err != nil {
		_ = c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	if cov, err := controllers.CreateWeather(userID, city, fields, time); err != nil {
		_ = c.AbortWithError(http.StatusBadRequest, err)
	} else {
		c.JSON(http.StatusCreated, cov)
	}
}

func getWeatherWidget(c *gin.Context) {
	widgetID := c.Param("id")
	id, err := strconv.Atoi(widgetID)
	if err != nil {
		_ = c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	widget, err := controllers.FindWeatherByID(uint(id))
	if err != nil {
		_ = c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	u, _ := url.Parse(WeatherEndpoint)
	values, _ := url.ParseQuery(u.RawQuery)
	values.Set("q", widget.City)
	values.Set("units", "metric")
	values.Set("mode", "json")
	u.RawQuery = values.Encode()
	log.Println(u)
	res := doWeatherReq(fmt.Sprintf("%v", u))
	c.DataFromReader(
		http.StatusOK,
		res.ContentLength, gin.MIMEJSON,
		res.Body, nil)
}
