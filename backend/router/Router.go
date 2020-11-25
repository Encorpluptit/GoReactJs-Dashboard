package router

import (
	"AppDev_DashBoard/middlewares"
	"github.com/gin-gonic/gin"
	"net/http"
)

const (
	rAuth   = "auth"
	rGithub = "github"
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
		auth.Use(middlewares.GHLoginMiddelware()).GET("/github", githubAuth)
		auth.GET("/github/success", githubAuthSuccess)
	}
	auth.Use(store)
	githubWidgets := r.Group("/" + rGithub)
	{
		githubWidgets.GET("/repo", GithubRepo)
	}
	githubWidgets.Use(middlewares.GHMiddleware())
}
