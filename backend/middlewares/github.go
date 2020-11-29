package middlewares

import (
	"AppDev_DashBoard/auth"
	"AppDev_DashBoard/controllers"
	"fmt"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"os"
)

const (
	GithubAuthLoginUrl    = "/github/login"
	GithubAuthRegisterUrl = "/github/register"
)

func checkGHToken(c *gin.Context) bool {
	session := sessions.Default(c)
	code := session.Get(controllers.GithubCodeKey)
	if code == "" {
		log.Printf("In %s: code is not present in session\n", c.HandlerName())
		return false
	}
	log.Printf("In %s: code is present in session\n", c.HandlerName())
	return true
}

func GithubOAuthSuccess() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		code := session.Get(controllers.GithubCodeKey)
		log.Printf("Code Received after Github OAuth Sucess: %v", code)
		id, err := controllers.GetGithubUserID(c, fmt.Sprintf("%v", code))
		if err != nil {
			log.Fatal(err)
		}
		log.Println("ID:", id)
		user, err := controllers.FindGithubUser(id)
		if err != nil {
			log.Println(err)
			if user, err = controllers.RegisterGithubUser(user); err != nil {
				log.Println(err)
			}
		}
		tok, err := auth.CreateToken(user.ID)
		log.Println(tok)
		c.Redirect(http.StatusTemporaryRedirect, os.Getenv("FRONT_URL")+"/login/success?token="+tok)
	}
}

func GithubMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// TODO: Check githubToken in session here.
		// TODO: Add callback ?
		log.Println("IN Github Middleware")
		if !checkGHToken(c) {
			//_ = c.AbortWithError(http.StatusUnauthorized, errors.New("unauthorized"))
			c.Redirect(http.StatusTemporaryRedirect, "/auth"+GithubAuthLoginUrl)
			return
		}
		c.Next()
	}
}
