package router

import (
	"AppDev_DashBoard/controllers"
	"AppDev_DashBoard/models"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"io/ioutil"
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
	// Redirect user to consent page to ask for permission
	// for the scopes specified above.
	url := controllers.GetGithubConf().AuthCodeURL("state", oauth2.AccessTypeOnline)
	fmt.Printf("Visit the URL for the auth dialog: %v\n", url)
	ctx.Redirect(http.StatusTemporaryRedirect, url)
}

func githubAuthSuccess(c *gin.Context) {
	code := c.Query("code")
	if code == "" {
		log.Println("NO CODE IN QUERY From Url by Github")
		c.Redirect(http.StatusTemporaryRedirect, os.Getenv("FRONT_URL"))
		return
	}
	log.Printf("In %s: code -> %s", c.HandlerName(), code)

	session := sessions.Default(c)
	session.Set("GithubToken", code)
	session.Save()
	tok, err := controllers.GetGithubConf().Exchange(c, fmt.Sprintf("%v", code))
	if err != nil {
		log.Fatal(err)
	}
	client := controllers.GetGithubConf().Client(c, tok)
	resp, err := client.Get("https://api.github.com/user")
	if err != nil {
		log.Fatal(err)
	}
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	var dat map[string]interface{}
	if err := json.Unmarshal(bodyBytes, &dat); err != nil {
		log.Fatal(err)
	}
	fId, ok := dat["id"].(float64)
	if !ok {
		log.Fatalf("got data of type %T but wanted int\n", dat["id"])
	}
	log.Println(int(fId))
	//myInt := dat["id"].(int)

	//TODO: check for User in User OAuth DB
}

func googleAuth(ctx *gin.Context) {
	// Redirect user to consent page to ask for permission
	// for the scopes specified above.
	url := controllers.GetGoogleConf().AuthCodeURL("state")
	//url := controllers.GetGoogleConf().AuthCodeURL("state", oauth2.AccessTypeOnline)
	fmt.Printf("Visit the URL for the auth dialog: %v\n", url)
	ctx.Redirect(http.StatusTemporaryRedirect, url)
}

func googleAuthSuccess(c *gin.Context) {
	code := c.Query("code")
	if code == "" {
		log.Println("NO CODE IN QUERY From Url by Google")
		c.Redirect(http.StatusTemporaryRedirect, os.Getenv("FRONT_URL"))
		return
	}
	log.Printf("In %s: code -> %s", c.HandlerName(), code)
	session := sessions.Default(c)
	session.Set("GoogleToken", code)
	session.Save()
}
