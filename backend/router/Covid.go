package router

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"net/url"
)

const (
	CovidRapidAPIHost       = "covid-19-data.p.rapidapi.com"
	CovidCountryEndpoint    = "https://covidRoute-19-data.p.rapidapi.com/country"
	CovidAllCountryEndpoint = "https://covid-19-data.p.rapidapi.com/country/all"
)

func doCovidReq(newUrl string) (res *http.Response) {
	req, _ := http.NewRequest("GET", newUrl, nil)
	addRapidApiHeaders(req, CovidRapidAPIHost)
	res, _ = http.DefaultClient.Do(req)
	return res
}

func createCovidWidget(c *gin.Context) {
	//userID, _ := auth.ExtractTokenID(c.Request)

}

func getCovidWidget(c *gin.Context) {
	//widgetID := c.Query("widget_id")
	u, _ := url.Parse(CovidCountryEndpoint)
	log.Println("url:", u)
	values, _ := url.ParseQuery(u.RawQuery)
	values.Set("name", "italy")
	values.Set("format", "json")
	u.RawQuery = values.Encode()
	fmt.Println("new url:", u)
	res := doCovidReq(fmt.Sprintf("%v", u))
	c.DataFromReader(
		http.StatusOK,
		res.ContentLength, gin.MIMEJSON,
		res.Body, nil)

}
