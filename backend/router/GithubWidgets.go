package router

import (
	"AppDev_DashBoard/controllers"
	"fmt"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"log"
	"net/http"
)

func GithubRepo(c *gin.Context) {
	session := sessions.Default(c)
	code := session.Get("GithubToken")
	log.Printf("In %s: code -> %v : %T\n", c.HandlerName(), code, code)
	tok, err := controllers.GithubConf.Exchange(c, fmt.Sprintf("%v", code))
	if err != nil {
		log.Fatal(err)
	}
	client := controllers.GithubConf.Client(c, tok)
	resp, err := client.Get("https://api.github.com/users/encorpluptit/repos")
	if err != nil {
		log.Fatal(err)
	}
	if resp.StatusCode != http.StatusOK {
		c.Status(resp.StatusCode)
		return
	}
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	bodyString := string(bodyBytes)
	log.Println(bodyString)
	c.Status(http.StatusOK)
	//c.DataFromReader(resp.ContentLength, "application/json", )
	//c.JSON()
}
