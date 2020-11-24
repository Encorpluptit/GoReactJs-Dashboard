package router

import (
	"AppDev_DashBoard/controllers"
	"AppDev_DashBoard/models"
	"errors"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

// login: Log User with Queries Username and Password.
// Abort when error occurs.
func login(c *gin.Context) {
	log.Println("LOL ICI")
	user := &models.User{
		Username: c.Query("Username"),
		Password: c.Query("Password"),
	}
	if userFound, err := controllers.Login(user); err != nil {
		_ = c.AbortWithError(InternalError, err)
	} else {
		c.JSON(http.StatusCreated, userFound)
	}
}

func register(c *gin.Context) {
	log.Println("LOL ICI")
	user := &models.User{
		Username: c.Query("Username"),
		Password: c.Query("Password"),
		Email:    c.Query("Email"),
	}
	if user.Username == "" || user.Password == "" || user.Email == "" {
		_ = c.AbortWithError(InternalError, errors.New("username, password or email is empty"))
	}
	if project, err := controllers.Register(user); err != nil {
		_ = c.AbortWithError(InternalError, err)
	} else {
		c.JSON(http.StatusCreated, project)
	}
}
