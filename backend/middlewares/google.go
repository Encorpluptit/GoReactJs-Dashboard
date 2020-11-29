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
	GoogleAuthLoginUrl    = "/google/login"
	GoogleAuthRegisterUrl = "/google/register"
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

func GoogleOAuthSuccess() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		code := session.Get(controllers.GoogleCodeKey)
		log.Printf("Code: %v", code)
		email, err := controllers.GetGoogleUserEmail(c, fmt.Sprintf("%v", code))
		if err != nil {
			log.Fatal(err)
		}
		log.Println("Email:", email)

		user, err := controllers.FindGoogleUser(email)
		if err != nil {
			log.Println(err)
			if user, err = controllers.RegisterGoogleUser(user); err != nil {
				log.Println(err)
			}
		}
		tok, err := auth.CreateToken(user.ID)
		//log.Println(tok)
		c.Redirect(http.StatusTemporaryRedirect, os.Getenv("FRONT_URL")+"/login/success?token="+tok)
	}
}

func GoogleMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// TODO: Check googleToken in session here.
		// TODO: Add callback ?
		log.Println("IN Google Middleware")
		if !checkGoogleToken(c) {
			c.Redirect(http.StatusTemporaryRedirect, "/auth"+GoogleAuthLoginUrl)
			return
		}
		c.Next()
	}
}
