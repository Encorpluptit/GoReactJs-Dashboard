package router

import (
	"AppDev_DashBoard/controllers"
	"fmt"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func GoogleRepo(c *gin.Context) {
	// TODO: CHANGE THAT
	// Handle the exchange code to initiate a transport.
	log.Printf("In %s: code\n", c.HandlerName())
	session := sessions.Default(c)
	code := session.Get("GoogleToken")
	log.Printf("In %s: code -> %v : %T\n", c.HandlerName(), code, code)
	tok, err := controllers.GetGoogleConf().Exchange(c, fmt.Sprintf("%v", code))
	if err != nil {
		log.Fatal(err)
	}
	client := controllers.GetGoogleConf().Client(c, tok)
	//
	//resp, err := client.Get("https://www.googleapis.com/auth/userinfo.email")
	//if err != nil {
	//	log.Fatal(err)
	//}
	//log.Println(resp)

	url := "https://www.googleapis.com/auth/userinfo.email"
	log.Printf("Request to -> %s\n", url)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Set("Accept", "application/vnd.github.v3+json")
	resp, err := client.Do(req)

	//resp, err := client.Get(url)

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

	// Use the authorization code that is pushed to the redirect
	// URL. Exchange will do the handshake to retrieve the
	// initial access token. The HTTP Client returned by
	// conf.Client will refresh the token as necessary.
	//tok, err := controllers.GetGithubConf().Exchange(c, fmt.Sprintf("%v", code))
	//if err != nil {
	//	log.Fatal(err)
	//}
	//client := controllers.GetGithubConf().Client(c, tok)
	//resp, err := client.Get("https://api.github.com/users/encorpluptit/repos")
	//if err != nil {
	//	log.Fatal(err)
	//}
	//if resp.StatusCode != http.StatusOK {
	//	c.Status(resp.StatusCode)
	//	return
	//}
	//bodyBytes, err := ioutil.ReadAll(resp.Body)
	//if err != nil {
	//	log.Fatal(err)
	//}
	//bodyString := string(bodyBytes)
	//log.Println(bodyString)
	//log.Printf("%T\n", bodyString)
	//var dat map[string]interface{}
	//if err := json.Unmarshal(bodyBytes, &dat); err != nil {
	//	panic(err)
	//}
	//log.Printf("%v\n", dat)
	//c.Status(http.StatusOK)
	//c.DataFromReader(resp.ContentLength, "application/json", )
	//c.JSON()
}
