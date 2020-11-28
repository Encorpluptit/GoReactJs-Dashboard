package router

import (
	"AppDev_DashBoard/middlewares"
	"github.com/gin-gonic/gin"
	"net/http"
)

const (
	rAuth   = "auth"
	rGithub = "github"
	rGoogle = "google"
	//rModule       = "module"
	//RProject      = "project"
	//rFunction     = "function"
	//rType         = "type"
	//rName         = "name"
	InternalError = http.StatusForbidden
)

func ApplyRoutes(r *gin.Engine, store gin.HandlerFunc) {
	r.GET("/health", func(c *gin.Context) {
		c.Status(http.StatusOK)
	})
	r.GET("/about.json", about)
	r.Use(store)
	auth := r.Group("/" + rAuth)
	{
		auth.POST("/login", login)
		auth.POST("/register", register)
		auth.GET(middlewares.GithubAuthLoginUrl, githubAuth)
		auth.GET(middlewares.GithubAuthRegisterUrl, githubAuth)
		auth.GET("/github/success", githubAuthSuccess, middlewares.GithubOAuthSuccess())
		auth.GET(middlewares.GoogleAuthLoginUrl, googleAuth)
		auth.GET(middlewares.GoogleAuthRegisterUrl, googleAuth)
		auth.GET("/google/success", googleAuthSuccess, middlewares.GoogleOAuthSuccess())
	}
	r.GET("/widgets", widgets)
	githubWidgets := r.Group("/" + rGithub).Use(middlewares.GithubMiddleware())
	{
		githubWidgets.GET("/repo", GithubRepo)
	}
	googleWidgets := r.Group("/" + rGoogle).Use(middlewares.GoogleMiddleware())
	{
		googleWidgets.GET("/repo", GoogleRepo)
	}
	r.GET("/covid", covid)
	//githubWidgets.Use()
	//auth.Use(store)
	//githubWidgets.Use(store)
}
