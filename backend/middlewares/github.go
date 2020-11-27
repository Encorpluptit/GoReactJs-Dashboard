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
	GithubAuthLoginUrl    = "/github/login"
	GithubAuthRegisterUrl = "/github/register"
)

func getGHToken(c *gin.Context) {
	code := c.Query("code")
	if code == "" {
		log.Fatal("NO CODE IN QUERY")
	}
	log.Printf("In %s: code -> %s", c.HandlerName(), code)

	session := sessions.Default(c)
	session.Set(controllers.GithubCodeKey, code)
	session.Save()
}

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

//
//func GithubLoginMiddleware() gin.HandlerFunc {
//	return func(c *gin.Context) {
//		session := sessions.Default(c)
//		session.Set(AuthMethod, LoginAuthMethod)
//		if err := session.Save(); err != nil {
//			log.Fatal("In GithubLoginMiddleware, failed on session save ->", err)
//		}
//		c.Next()
//	}
//}
//
//func GithubRegisterMiddleware() gin.HandlerFunc {
//	return func(c *gin.Context) {
//		session := sessions.Default(c)
//		session.Set(AuthMethod, RegisterAuthMethod)
//		if err := session.Save(); err != nil {
//			log.Fatal("In GithubRegisterMiddleware, failed on session save ->", err)
//		}
//		c.Next()
//	}
//}

func GithubOAuthSuccess() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		code := session.Get(controllers.GithubCodeKey)
		log.Printf("Code: %v", code)
		id, err := controllers.GetGithubUserID(c, fmt.Sprintf("%v", code))
		if err != nil {
			log.Fatal(err)
		}
		log.Println("ID:", id)
		if user, err := controllers.FindGithubUser(id); err != nil {
			log.Println(err)
			if user, err = controllers.RegisterGithubUser(user); err != nil {
				log.Println(err)
			}
		} else {
			user, err = controllers.LoginGithubUser(user)
		}
		RedirectDashBoard()(c)
	}
}

func GithubMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// TODO: Check githubToken in session here.
		// TODO: Add callback ?
		log.Println("IN Github Middleware")
		if !checkGHToken(c) {
			c.Redirect(http.StatusTemporaryRedirect, "/auth"+GithubAuthLoginUrl)
			return
		}
		c.Next()
	}
}
