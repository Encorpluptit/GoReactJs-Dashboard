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
	rCoin         = "coin"
	rNews         = "news"
	rWeather      = "weather"
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
			covid.GET("/get/:id", getCovidWidget)
			covid.POST("/create/*country", createCovidWidget)
		}
		coin := widgets.Group("/" + rCoin)
		{
			coin.GET("/get/:id", getCovidWidget)
			coin.POST("/create", createCovidWidget)
		}
		weather := widgets.Group("/" + rWeather)
		{
			weather.GET("/get/:id", getWeatherWidget)
			weather.POST("/create", createWeatherWidget)
		}
		news := widgets.Group("/" + rNews)
		{
			news.GET("/get/:id", getNewsWidget)
			news.POST("/create", createNewsWidget)
		}
		github := widgets.Group("/" + rGithub)
		{
			github.GET("/get/:id", getCovidWidget)
			github.POST("/create", createCovidWidget)
		}
	}
	githubWidgets := r.Group("/" + rGithub).Use(middlewares.GithubMiddleware())
	{
		githubWidgets.GET("/create", createGithubWidget)
		githubWidgets.GET("/get/:id", getGithubWidget)
	}
	googleWidgets := r.Group("/" + rGoogle).Use(middlewares.GoogleMiddleware())
	{
		googleWidgets.GET("/repo", GoogleRepo)
	}
	r.GET("/test", testWidget)
	//r.POST("/"+rWidget+"/" + rCovid+"/create", createCovidWidget)

	//githubWidgets.Use()
	//auth.Use(store)
	//githubWidgets.Use(store)
}
