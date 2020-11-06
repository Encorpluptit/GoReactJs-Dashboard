package router

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type DumbAboutJson struct {
}

type customer struct {
	Host string `json:"name"`
}

func about(c *gin.Context) {
	response := customer{Host: c.ClientIP()}
	c.JSON(http.StatusOK, response)
}
