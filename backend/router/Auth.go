package router

import (
	"AppDev_DashBoard/controllers"
	"AppDev_DashBoard/models"
	"errors"
	"fmt"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"log"
	"net/http"
	"os"
)

// login: Log User with Queries Username and Password.
// Abort when error occurs.
func login(c *gin.Context) {
	log.Println("LOL ICI")
	user := &models.User{
		Username: c.Query("Username"),
		Password: c.Query("Password"),
	}
	if userFound, err := controllers.Login(user); err != nil {
		_ = c.AbortWithError(InternalError, err)
	} else {
		c.JSON(http.StatusCreated, userFound)
	}
}

func register(c *gin.Context) {
	log.Println("LOL ICI")
	user := &models.User{
		Username: c.Query("Username"),
		Password: c.Query("Password"),
		Email:    c.Query("Email"),
	}
	if user.Username == "" || user.Password == "" || user.Email == "" {
		_ = c.AbortWithError(InternalError, errors.New("username, password or email is empty"))
		return
	}
	if project, err := controllers.Register(user); err != nil {
		_ = c.AbortWithError(InternalError, err)
	} else {
		c.JSON(http.StatusCreated, project)
	}
}

func githubAuth(ctx *gin.Context) {
	//ctx := context.Background()
	//conf := &oauth2.Config{
	//	ClientID:     "a758719d422863f322f7",
	//	ClientSecret: "a9a92ef0f4156ee312c41effd65589f36d5c4bca",
	//	//Scopes:       []string{"SCOPE1", "SCOPE2"},
	//	Scopes: []string{"user"},
	//	Endpoint: oauth2.Endpoint{
	//		AuthURL:  "https://github.com/login/oauth/authorize",
	//		TokenURL: "https://github.com/login/oauth/access_token",
	//	},
	//}

	// Redirect user to consent page to ask for permission
	// for the scopes specified above.
	//url := conf.AuthCodeURL("state", oauth2.AccessTypeOffline)
	//url := conf.AuthCodeURL("state", oauth2.AccessTypeOffline)
	url := controllers.GithubConf.AuthCodeURL("state", oauth2.AccessTypeOnline)
	fmt.Printf("Visit the URL for the auth dialog: %v\n", url)
	ctx.Redirect(http.StatusMovedPermanently, url)

	// Use the authorization code that is pushed to the redirect
	// URL. Exchange will do the handshake to retrieve the
	// initial access token. The HTTP Client returned by
	// conf.Client will refresh the token as necessary.
	//var code string
	//if _, err := fmt.Scan(&code); err != nil {
	//	log.Fatal(err)
	//}
	//tok, err := conf.Exchange(ctx, code)
	//if err != nil {
	//	log.Fatal(err)
	//}
	//
	//client := conf.Client(ctx, tok)
	//resp, err := client.Get("https://api.github.com/users/encorpluptit/repos")
	//if err != nil {
	//	log.Fatal(err)
	//}
	//if resp.StatusCode == http.StatusOK {
	//	bodyBytes, err := ioutil.ReadAll(resp.Body)
	//	if err != nil {
	//		log.Fatal(err)
	//	}
	//	bodyString := string(bodyBytes)
	//	log.Println(bodyString)
	//}
}

func githubAuthSuccess(c *gin.Context) {
	// Use the authorization code that is pushed to the redirect
	// URL. Exchange will do the handshake to retrieve the
	// initial access token. The HTTP Client returned by
	// githubConf.Client will refresh the token as necessary.
	code := c.Query("code")
	if code == "" {
		log.Fatal("NO CODE IN QUERY")
	}
	log.Printf("In %s: code -> %s", c.HandlerName(), code)

	session := sessions.Default(c)
	session.Set("GithubToken", code)
	session.Save()
	frontUrl := os.Getenv("FRONT_URL")
	if frontUrl == "" {
		log.Fatal("FrontUrl")
	}
	log.Printf("In %s: frontUrl -> %s", c.HandlerName(), frontUrl+"/dashboard")
	//c.Next()
	c.Redirect(http.StatusMovedPermanently, frontUrl+"/dashboard")
}
