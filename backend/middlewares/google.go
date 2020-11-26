package middlewares

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"os"
)

func checkGoogleToken(c *gin.Context) bool {
	session := sessions.Default(c)
	code := session.Get("GoogleToken")
	if code == "" {
		log.Printf("In %s: code is not present in session\n", c.HandlerName())
		return false
	}
	log.Printf("In %s: code is present in session\n", c.HandlerName())
	return true
}

func GoogleLoginMiddelware() gin.HandlerFunc {
	return func(c *gin.Context) {
		log.Println("IN Google Login Middleware")
		c.Next()
		log.Println("AFTER Google Login Middleware BEFORE REDIRECT")
		c.Redirect(http.StatusTemporaryRedirect, os.Getenv("FRONT_URL")+"/dashboard")
		//getGHToken(c)
	}
}

func GoogleMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// TODO: Check googleToken in session here.
		// TODO: Add callback ?
		log.Println("IN Google Middleware")
		if !checkGoogleToken(c) {
			c.Redirect(http.StatusTemporaryRedirect, "/auth/google")
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
