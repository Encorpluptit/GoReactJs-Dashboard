package router

import (
	"AppDev_DashBoard/controllers"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func GoogleRepo(c *gin.Context) {
	// TODO: CHANGE THAT
	// Handle the exchange code to initiate a transport.
	tok, err := controllers.GetGoogleConf().Exchange(c, "authorization-code")
	if err != nil {
		log.Fatal(err)
	}
	client := controllers.GetGoogleConf().Client(c, tok)
	//
	log.Printf("In %s: code\n", c.HandlerName())
	session := sessions.Default(c)
	code := session.Get("GithubToken")
	log.Printf("In %s: code -> %v : %T\n", c.HandlerName(), code, code)
	resp, err := client.Get("https://api.github.com/users/encorpluptit/repos")
	if err != nil {
		log.Fatal(err)
	}
	log.Println(resp)

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
	c.Status(http.StatusOK)
	//c.DataFromReader(resp.ContentLength, "application/json", )
	//c.JSON()
}
