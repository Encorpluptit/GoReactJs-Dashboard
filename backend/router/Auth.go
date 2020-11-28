package router

import (
	"AppDev_DashBoard/auth"
	"AppDev_DashBoard/controllers"
	"AppDev_DashBoard/models"
	"errors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"log"
	"net/http"
	"os"
)

const RapidAPIKey = "3756035059msh7fa332adcf87e69p13e21djsn7f3750733c19"

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
		tok, _ := auth.CreateToken(userFound.ID)
		//c.Redirect(http.StatusTemporaryRedirect, os.Getenv("FRONT_URL")+"/login/success?token="+tok)
		c.JSON(http.StatusCreated, tok)
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
	url := controllers.GetGithubConf().AuthCodeURL("state", oauth2.AccessTypeOffline)
	//fmt.Printf("Visit the URL for the auth dialog: %v\n", url)
	ctx.Redirect(http.StatusTemporaryRedirect, url)
}

func githubAuthSuccess(c *gin.Context) {
	// TODO: Maybe to put in GithubOAuthSuccess middleware
	code := c.Query("code")
	if code == "" {
		log.Println("NO CODE IN QUERY From Url by Github")
		c.Redirect(http.StatusTemporaryRedirect, os.Getenv("FRONT_URL"))
		return
	}
	log.Printf("In %s: code -> %s", c.HandlerName(), code)

	session := sessions.Default(c)
	session.Set(controllers.GithubCodeKey, code)
	if err := session.Save(); err != nil {
		log.Fatal("In githubAuthSuccess, failed on session save ->", err)
	}
}

func googleAuth(ctx *gin.Context) {
	// Redirect user to consent page to ask for permission
	// for the scopes specified above.
	url := controllers.GetGoogleConf().AuthCodeURL("state", oauth2.AccessTypeOffline)
	//url := controllers.GetGoogleConf().AuthCodeURL("state", oauth2.AccessTypeOnline)
	//fmt.Printf("Visit the URL for the auth dialog: %v\n", url)
	ctx.Redirect(http.StatusTemporaryRedirect, url)
}

func googleAuthSuccess(c *gin.Context) {
	// TODO: Maybe to put in GoogleOAuthSuccess middleware
	code := c.Query("code")
	if code == "" {
		log.Println("NO CODE IN QUERY From Url by Google")
		c.Redirect(http.StatusTemporaryRedirect, os.Getenv("FRONT_URL"))
		return
	}
	session := sessions.Default(c)
	session.Set(controllers.GoogleCodeKey, code)
	if err := session.Save(); err != nil {
		log.Fatal("In googleAuthSuccess, failed on session save ->", err)
	}
	log.Printf("In %s: code -> %v : %T\n", c.HandlerName(), code, code)
}

func addRapidApiHeaders(req *http.Request, host string) {
	req.Header.Add("x-rapidapi-key", RapidAPIKey)
	req.Header.Add("x-rapidapi-host", host)
}
