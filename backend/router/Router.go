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
	//auth := r.Group("/" + rAuth)
	//{
	//	//projects.GET("/list", listProject)
	//	//projects.GET("/get", findProjectById)
	//	//projects.GET("/getByPath", findProjectByPath)
	//	//projects.GET("/get/:"+RProject, findProjectByName)
	//	//projects.POST("/add", addProject)
	//	//projects.PATCH("/update", updateProject)
	//	//projects.DELETE("/delete", deleteProject)
	//}

}
