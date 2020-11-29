package router

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"net/url"
)

func testWidget(c *gin.Context) {
	u, _ := url.Parse(CovidWorldEndpoint)
	log.Println("url:", u)
	values, _ := url.ParseQuery(u.RawQuery)
	values.Set("format", "json")
	u.RawQuery = values.Encode()
	fmt.Println("new url:", u)
	res := doCovidReq(fmt.Sprintf("%v", u))
	c.DataFromReader(
		http.StatusOK,
		res.ContentLength, gin.MIMEJSON,
		res.Body, nil)
	//log.Println("Token: ", auth.ExtractToken(c.Request))
	//id, _ := auth.ExtractTokenID(c.Request)
	//log.Println("ID: ", id)
}
