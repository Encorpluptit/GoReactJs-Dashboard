package router

import (
	"AppDev_DashBoard/middlewares"
	"github.com/gin-gonic/contrib/cors"
	"github.com/gin-gonic/gin"
	"net/http"
)

const (
	rAuth         = "auth"
	rGithub       = "github"
	rGoogle       = "google"
	rWidget       = "widget"
	rCovid        = "covid"
	InternalError = http.StatusForbidden
)

func ApplyRoutes(r *gin.Engine, store gin.HandlerFunc) {
	r.GET("/health", func(c *gin.Context) {
		c.Status(http.StatusOK)
	})
	r.GET("/about.json", about)
	r.Use(store)
	corsConfig := cors.DefaultConfig()
	//corsConfig.AllowOriginFunc = func(origin string) bool {
	//	return origin == "http://127.0.0.1:3000"
	//}
	r.Use(cors.New(corsConfig))
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
	widgets := r.Group("/"+rWidget, middlewares.SetMiddlewareAuthentication())
	{
		covid := widgets.Group("/" + rCovid)
		{
			covid.GET("/get", getCovidWidget)
			covid.POST("/create", getCovidWidget)
		}
	}
	githubWidgets := r.Group("/" + rGithub).Use(middlewares.GithubMiddleware())
	{
		githubWidgets.GET("/repo", GithubRepo)
	}
	googleWidgets := r.Group("/" + rGoogle).Use(middlewares.GoogleMiddleware())
	{
		googleWidgets.GET("/repo", GoogleRepo)
	}
	r.GET("/test", testWidget)

	//githubWidgets.Use()
	//auth.Use(store)
	//githubWidgets.Use(store)
}
