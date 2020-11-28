package router

import (
	"AppDev_DashBoard/auth"
	"github.com/gin-gonic/gin"
	"log"
)

func widgets(c *gin.Context) {
	log.Println("Token: ", auth.ExtractToken(c.Request))
	id, _ := auth.ExtractTokenID(c.Request)
	log.Println("ID: ", id)
}
