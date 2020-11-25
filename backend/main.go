package main

import (
	"AppDev_DashBoard/router"
	"AppDev_DashBoard/server"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/joho/godotenv"
	"log"
	"net"
	"os"
	"strings"
)

func loadEnv() {
	if os.Getenv("API_STATE") != "RELEASE" {
		if godotenv.Load() != nil {
			log.Fatalf("Cannot Load .env file.")
		}
	}
	frontUrl := os.Getenv("FRONT_URL")
	if frontUrl == "" {
		log.Fatal("FRONT_URL VAR NOT PRESENT")
	}
	ginMode := os.Getenv("GIN_MODE")
	if ginMode == "" {
		log.Fatal("GIN_MODE VAR NOT PRESENT")
	}
}
func main() {
	loadEnv()
	api, stopApi := server.NewServer()
	//store := cookie.NewStore([]byte(os.Getenv("API_SECRET")))
	store := cookie.NewStore([]byte("secret"))
	router.ApplyRoutes(api.Router, sessions.Sessions("goquestsession", store))
	defer stopApi()

	//var store = sessions.NewCookieStore([]byte("secret"))

	name, err := os.Hostname()
	if err != nil {
		log.Fatalf("Oops when looking for hostname: %v\n", err)
	}
	addrs, err := net.LookupHost(name)
	if err != nil {
		log.Fatalf("Oops: %v\n", err)
	}
	log.Printf("Server runs on http://%s:%s\n", strings.Join(addrs, ""), api.Port)

	if err := api.Router.Run("0.0.0.0:" + api.Port); err != nil {
		//if err := api.Router.Run(); err != nil {
		log.Fatalln(err)
	}
}

//import (
//"fmt"
//"github.com/gin-gonic/contrib/sessions"
//"github.com/gin-gonic/gin"
//"golang.org/x/oauth2"
//"io/ioutil"
//"log"
//"net/http"
//)
//
//var githubConf = &oauth2.Config{
//	ClientID:     "a758719d422863f322f7",
//	ClientSecret: "a9a92ef0f4156ee312c41effd65589f36d5c4bca",
//	//Scopes:       []string{"SCOPE1", "SCOPE2"},
//	Scopes: []string{"user"},
//	Endpoint: oauth2.Endpoint{
//		AuthURL:  "https://github.com/login/oauth/authorize",
//		TokenURL: "https://github.com/login/oauth/access_token",
//	},
//}
//
////var session
//
//
//func index(c *gin.Context) {
//	c.Status(http.StatusOK)
//}
//
//func dashboard(c *gin.Context) {
//
//	session := sessions.Default(c)
//	code := session.Get("GithubToken")
//	log.Println("In DASHBOARD", code)
//	log.Printf("%T\n", code)
//	tok, err := githubConf.Exchange(c, fmt.Sprintf("%v", code))
//	if err != nil {
//		log.Fatal(err)
//	}
//
//	client := githubConf.Client(c, tok)
//	resp, err := client.Get("https://api.github.com/users/encorpluptit/repos")
//	if err != nil {
//		log.Fatal(err)
//	}
//	if resp.StatusCode == http.StatusOK {
//		bodyBytes, err := ioutil.ReadAll(resp.Body)
//		if err != nil {
//			log.Fatal(err)
//		}
//		bodyString := string(bodyBytes)
//		log.Println(bodyString)
//	}
//
//	c.Status(http.StatusOK)
//}
//
//func authHandler(c *gin.Context) {
//
//	// Redirect user to consent page to ask for permission
//	// for the scopes specified above.
//	//url := githubConf.AuthCodeURL("state", oauth2.AccessTypeOffline)
//	//url := githubConf.AuthCodeURL("state", oauth2.AccessTypeOffline)
//	url := githubConf.AuthCodeURL("state", oauth2.AccessTypeOnline)
//	fmt.Printf("Visit the URL for the auth dialog: %v\n", url)
//	c.Redirect(http.StatusMovedPermanently, url)
//}
//
//func authGithubSuccess(c *gin.Context) {
//	// Use the authorization code that is pushed to the redirect
//	// URL. Exchange will do the handshake to retrieve the
//	// initial access token. The HTTP Client returned by
//	// githubConf.Client will refresh the token as necessary.
//	code := c.Query("code")
//	if code == "" {
//		log.Fatal("NO CODE IN QUERY")
//	}
//	log.Println(code)
//
//	session := sessions.Default(c)
//	session.Set("GithubToken", code)
//	code2 := session.Get("GithubToken")
//	log.Println(code2)
//	session.Save()
//	c.Redirect(http.StatusMovedPermanently, "/dashboard")
//}
//
//func main() {
//	router := gin.Default()
//	var store = sessions.NewCookieStore([]byte("secret"))
//	router.Use(sessions.Sessions("goquestsession", store))
//
//	//router.GET("/", indexHandler)
//	router.GET("/dashboard", dashboard)
//	router.GET("/auth", authHandler)
//	router.GET("/auth/gh", authGithubSuccess)
//
//	router.Run("127.0.0.1:8080")
//}
