package router

import (
	"AppDev_DashBoard/auth"
	"AppDev_DashBoard/controllers"
	"errors"
	"fmt"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strconv"
)

const (
	GithubRepoWidgetType  = "Repo"
	GithubUserWidgetType  = "UserInfos"
	GithubPrivateAuthType = "Private"
	GithubPublicAuthType  = "Public"
	GithubPublicUserURL   = "https://api.github.com/users"
	GithubAuthUserURL     = "https://api.github.com/user"
)

func doGithubRequest(client *http.Client, newUrl string) (res *http.Response) {
	req, err := http.NewRequest("GET", newUrl, nil)
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Set("Accept", "application/vnd.github.v3+json")
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	return resp
}

func createGithubWidget(c *gin.Context) {
	userID, _ := auth.ExtractTokenID(c.Request)
	widgetType := c.Query("widgetType")
	authType := c.Query("authType")
	if widgetType != GithubRepoWidgetType && widgetType != GithubUserWidgetType {
		_ = c.AbortWithError(http.StatusBadRequest, fmt.Errorf("no widget type"))
		return
	}
	if authType != GithubPrivateAuthType && widgetType != GithubPublicAuthType {
		_ = c.AbortWithError(http.StatusBadRequest, fmt.Errorf("no auth type"))
		return
	}
	if user, err := controllers.FindUser(userID); err != nil || (authType == GithubPrivateAuthType && user.GithubId == 0) {
		_ = c.AbortWithError(http.StatusUnauthorized, fmt.Errorf("bad credentials"))
		return
	}
	fields := c.DefaultQuery("fields", "")
	timer := c.DefaultQuery("timer", "30")
	time, err := strconv.Atoi(timer)
	if err != nil {
		_ = c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	if cov, err := controllers.CreateGithub(userID, authType, widgetType, fields, time); err != nil {
		_ = c.AbortWithError(http.StatusBadRequest, err)
	} else {
		c.JSON(http.StatusCreated, cov)
	}
}

func getGithubWidget(c *gin.Context) {
	session := sessions.Default(c)
	code := session.Get(controllers.GithubCodeKey)
	widgetID := c.Param("id")
	id, err := strconv.Atoi(widgetID)
	if err != nil {
		_ = c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	widget, err := controllers.FindGithubByID(uint(id))
	if err != nil {
		_ = c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	var apiUrl string
	//switch {
	//case GithubPrivateAuthType == widget.AuthType:
	//	apiUrl = GithubAuthUserURL
	//case GithubPublicAuthType:
	//	apiUrl = GithubPublicUserURL
	//default:
	//	c.AbortWithError(http.StatusBadRequest, errors.New("type not found"))
	//	return
	//}
	switch widget.AuthType {
	case GithubPrivateAuthType:
		apiUrl = GithubAuthUserURL
	case GithubPublicAuthType:
		apiUrl = GithubPublicUserURL
	default:
		_ = c.AbortWithError(http.StatusBadRequest, errors.New("type not found"))
		return
	}
	client := controllers.GetGithubClient(c, fmt.Sprintf("%v", code))
	res := doGithubRequest(client, apiUrl)
	c.DataFromReader(
		http.StatusOK,
		res.ContentLength, gin.MIMEJSON,
		res.Body, nil)
}

func GithubRepo(c *gin.Context) {
	log.Printf("ARRIVED in %s\n", c.HandlerName())
	session := sessions.Default(c)
	code := session.Get(controllers.GithubCodeKey)
	log.Printf("In %s: code -> %v : %T\n", c.HandlerName(), code, code)
	//// Use the authorization code that is pushed to the redirect
	//// URL. Exchange will do the handshake to retrieve the
	//// initial access token. The HTTP Client returned by
	//// conf.Client will refresh the token as necessary.
	//tok, err := controllers.GetGithubConf().Exchange(c, fmt.Sprintf("%v", code))
	//if err != nil {
	//	log.Fatal(err)
	//}
	//client := controllers.GetGithubConf().Client(c, tok)
	client := controllers.GetGithubClient(c, fmt.Sprintf("%v", code))

	url := "https://api.github.com/users/encorpluptit"
	log.Printf("Request to -> %s\n", url)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Set("Accept", "application/vnd.github.v3+json")
	resp, err := client.Do(req)

	if err != nil {
		log.Fatal(err)
	}
	if resp.StatusCode != http.StatusOK {
		c.Status(resp.StatusCode)
		return
	}
	c.DataFromReader(http.StatusOK,
		resp.ContentLength, gin.MIMEJSON,
		resp.Body, nil)

}
