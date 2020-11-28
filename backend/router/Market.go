package router

import (
	"AppDev_DashBoard/auth"
	"AppDev_DashBoard/controllers"
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
)

const (
	CovidCountryEndpoint = "https://covid-19-data.p.rapidapi.com/country"
)

func covid(c *gin.Context) {
	id, _ := auth.ExtractTokenID(c.Request)
	user, err := controllers.FindUser(id)
	if err != nil {
		_ = c.AbortWithError(http.StatusForbidden, err)
		return
	}

	log.Println(*user)
	u, _ := url.Parse(CovidCountryEndpoint)
	log.Println("url:", u)
	values, _ := url.ParseQuery(u.RawQuery)
	values.Set("name", "italy")

	u.RawQuery = values.Encode()
	fmt.Println("new url:", u)
	newUrl := fmt.Sprintf("%v", u)
	req, _ := http.NewRequest("GET", newUrl, nil)
	req.Header.Add("x-rapidapi-key", "3756035059msh7fa332adcf87e69p13e21djsn7f3750733c19")
	req.Header.Add("x-rapidapi-host", "covid-19-data.p.rapidapi.com")
	res, _ := http.DefaultClient.Do(req)

	c.DataFromReader(http.StatusOK,
		res.ContentLength, gin.MIMEJSON,
		res.Body, nil)
}

func markets() {
	url := "https://covid-19-data.p.rapidapi.com/help/countries"
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("x-rapidapi-key", "3756035059msh7fa332adcf87e69p13e21djsn7f3750733c19")
	req.Header.Add("x-rapidapi-host", "covid-19-data.p.rapidapi.com")
	res, _ := http.DefaultClient.Do(req)
	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
	fmt.Println(res)
	fmt.Println(string(body))

}
