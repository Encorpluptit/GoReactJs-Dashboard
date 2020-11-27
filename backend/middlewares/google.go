package middlewares

import (
	"AppDev_DashBoard/controllers"
	"fmt"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

const (
	GoogleAuthLoginUrl    = "/login/google"
	GoogleAuthRegisterUrl = "/register/google"
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

//
//func GoogleLoginMiddleware() gin.HandlerFunc {
//	return func(c *gin.Context) {
//		log.Println("IN Google Login Middleware")
//		session := sessions.Default(c)
//		session.Set(AuthMethod, LoginAuthMethod)
//		if err := session.Save(); err != nil {
//			log.Fatal("In GoogleLoginMiddleware, failed on session save ->", err)
//		}
//		c.Next()
//	}
//}
//
//func GoogleRegisterMiddleware() gin.HandlerFunc {
//	return func(c *gin.Context) {
//		log.Println("IN Google Register Middleware")
//		session := sessions.Default(c)
//		session.Set(AuthMethod, RegisterAuthMethod)
//		if err := session.Save(); err != nil {
//			log.Fatal("In GoogleRegisterMiddleware, failed on session save ->", err)
//		}
//		c.Next()
//		session.Set(AuthMethod, RegisterAuthMethod)
//		if err := session.Save(); err != nil {
//			log.Fatal("In GoogleRegisterMiddleware, failed on session save ->", err)
//		}
//		key := session.Get(AuthMethod)
//		log.Println("Key:", key)
//	}
//}

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
		if user, err := controllers.FindGoogleUser(email); err != nil {
			log.Println(err)
			if user, err = controllers.RegisterGoogleUser(user); err != nil {
				log.Println(err)
			}
		} else {
			user, err = controllers.LoginGoogleUser(user)
		}
		RedirectDashBoard()(c)
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
