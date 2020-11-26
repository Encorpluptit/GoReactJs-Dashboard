package middlewares

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"os"
)

func getGHToken(c *gin.Context) {
	code := c.Query("code")
	if code == "" {
		log.Fatal("NO CODE IN QUERY")
	}
	log.Printf("In %s: code -> %s", c.HandlerName(), code)

	session := sessions.Default(c)
	session.Set("GithubToken", code)
	session.Save()
}

func checkGHToken(c *gin.Context) bool {
	session := sessions.Default(c)
	code := session.Get("GithubToken")
	if code == "" {
		log.Printf("In %s: code is not present in session\n", c.HandlerName())
		return false
	}
	log.Printf("In %s: code is present in session\n", c.HandlerName())
	return true
}

func GHLoginMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		log.Println("IN Github Login Middleware")
		c.Next()
		log.Println("AFTER Github Login Middleware BEFORE REDIRECT")
		c.Redirect(http.StatusTemporaryRedirect, os.Getenv("FRONT_URL")+"/dashboard")
		//getGHToken(c)
	}
}

func GHMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// TODO: Check githubToken in session here.
		// TODO: Add callback ?
		log.Println("IN Github Middleware")
		if !checkGHToken(c) {
			c.Redirect(http.StatusTemporaryRedirect, "/auth/github")
			//return
		}
		//getGHToken(c)
		c.Next()
	}
}
