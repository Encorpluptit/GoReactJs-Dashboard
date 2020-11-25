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
		return false
	}
	return true
}

func GHLoginMiddelware() gin.HandlerFunc {
	return func(c *gin.Context) {
		log.Println("IN Github Login Middleware")
		c.Next()
		c.Redirect(http.StatusMovedPermanently, os.Getenv("FRONT_URL")+"/dashboard")
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
	return func(c *gin.Context) {
		// TODO: Check githubToken in session here.
		// TODO: Add callback ?
		//t := time.Now()
		//
		//// Set example variable
		//c.Set("example", "12345")
		//
		//// before request
		//
		//c.Next()
		//
		//// after request
		//latency := time.Since(t)
		//log.Print(latency)
		//
		//// access the status we are sending
		//status := c.Writer.Status()
		//log.Println(status)
	}
}
