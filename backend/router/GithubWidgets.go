package router

import (
	"AppDev_DashBoard/controllers"
	"fmt"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func GithubRepo(c *gin.Context) {
	log.Printf("ARRIVED in %s\n", c.HandlerName())
	session := sessions.Default(c)
	code := session.Get(controllers.GithubCodeKey)
	log.Printf("In %s: code -> %v : %T\n", c.HandlerName(), code, code)
	//
	//// Use the authorization code that is pushed to the redirect
	//// URL. Exchange will do the handshake to retrieve the
	//// initial access token. The HTTP Client returned by
	//// conf.Client will refresh the token as necessary.
	//tok, err := controllers.GetGithubConf().Exchange(c, fmt.Sprintf("%v", code))
	//if err != nil {
	//	log.Fatal(err)
	//}
	//client := controllers.GetGithubConf().Client(c, tok)
	client := controllers.GetGithubClient(c, fmt.Sprintf("%v", code))

	url := "https://api.github.com/users/encorpluptit"
	log.Printf("Request to -> %s\n", url)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Set("Accept", "application/vnd.github.v3+json")
	resp, err := client.Do(req)

	if err != nil {
		log.Fatal(err)
	}
	if resp.StatusCode != http.StatusOK {
		c.Status(resp.StatusCode)
		return
	}

	c.DataFromReader(http.StatusOK,
		resp.ContentLength, gin.MIMEJSON,
		resp.Body, nil)

}
