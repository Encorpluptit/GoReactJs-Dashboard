package router

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

const (
	rAuth = "auth"
	//rModule       = "module"
	//RProject      = "project"
	//rFunction     = "function"
	//rType         = "type"
	//rName         = "name"
	InternalError = http.StatusForbidden
)

func ApplyRoutes(r *gin.Engine) {
	r.GET("/health", func(c *gin.Context) {
		c.Status(http.StatusOK)
	})
	r.GET("/about.json", about)
	auth := r.Group("/" + rAuth)
	{
		auth.POST("/login", login)
		auth.POST("/register", register)

		//projects.GET("/get/:"+RProject, findProjectByName)
		//projects.POST("/add", addProject)
		//projects.PATCH("/update", updateProject)
		//projects.DELETE("/delete", deleteProject)
	}

}
