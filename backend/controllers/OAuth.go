package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"io/ioutil"
	"log"
	"net/http"
)

const (
	GithubCodeKey = "GithubCode"
	GoogleCodeKey = "GoogleCode"
	GithubUserUrl = "https://api.github.com/user"
	GoogleUserUrl = "https://www.googleapis.com/oauth2/v3/userinfo"
)

var GithubConf *oauth2.Config = nil
var GoogleConf *oauth2.Config = nil

func GetGithubConf() *oauth2.Config {
	if GithubConf == nil {
		GithubConf = &oauth2.Config{
			// TODO: Vars in env
			ClientID:     "a758719d422863f322f7",
			ClientSecret: "a9a92ef0f4156ee312c41effd65589f36d5c4bca",
			//Scopes:       []string{"SCOPE1", "SCOPE2"},
			Scopes: []string{"user", "users"},
			Endpoint: oauth2.Endpoint{
				AuthURL:  "https://github.com/login/oauth/authorize",
				TokenURL: "https://github.com/login/oauth/access_token",
			},
		}
	}
	return GithubConf
}

//TODO: Change this
var githubClient *http.Client = nil

func GetGithubClient(c *gin.Context, code string) *http.Client {
	if githubClient == nil {
		tok, err := GetGithubConf().Exchange(c, code)
		if err != nil {
			log.Fatal("In GetGithubConf().Exchange -> ", err)
		}
		githubClient = GetGithubConf().Client(c, tok)
		return githubClient
	}
	return githubClient
}

func GetGithubUserID(c *gin.Context, code string) (int, error) {
	client := GetGithubClient(c, code)
	resp, err := client.Get(GithubUserUrl)
	if err != nil {
		return 0, err
	}
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return 0, err
	}
	var dat map[string]interface{}
	if err := json.Unmarshal(bodyBytes, &dat); err != nil {
		return 0, err
	}
	fId, ok := dat["id"].(float64)
	if !ok {
		return 0, fmt.Errorf("got data of type %T but wanted int\n", dat["id"])
	}
	//log.Println(int(fId))
	return int(fId), nil
}

func GetGoogleConf() *oauth2.Config {
	if GoogleConf == nil {
		GoogleConf = &oauth2.Config{
			// TODO: Vars in env
			ClientID:     "272265762619-dvasr1c41ju1dv81tampdbpplstshl73.apps.googleusercontent.com",
			ClientSecret: "Emxaoj8kyXxv4xgpxy2wLDvV",
			// TODO: Change URL
			//RedirectURL:  "http://localhost:3000/auth/google/sucess",
			RedirectURL: "http://localhost:8080/auth/google/success",
			Scopes: []string{
				//"https://www.googleapis.com/auth/mail",
				"https://www.googleapis.com/auth/bigquery",
				"https://www.googleapis.com/auth/blogger",
				"https://www.googleapis.com/auth/drive",
				"https://www.googleapis.com/auth/userinfo.email",
				"https://www.googleapis.com/auth/userinfo.profile",
				"https://www.googleapis.com/auth/calendar.events.readonly",
			},
			Endpoint: google.Endpoint,
		}
	}
	return GoogleConf
}

func GetGoogleClient(c *gin.Context, code string) *http.Client {
	tok, err := GetGoogleConf().Exchange(c, code)
	if err != nil {
		log.Fatal(err)
	}
	return GetGoogleConf().Client(c, tok)
}

func GetGoogleUserEmail(c *gin.Context, code string) (string, error) {
	client := GetGoogleClient(c, code)
	resp, err := client.Get(GoogleUserUrl)
	if err != nil {
		log.Println("Google Get User Error")
		return "", err
	}
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	var dat map[string]interface{}
	if err := json.Unmarshal(bodyBytes, &dat); err != nil {
		return "", err
	}
	email, ok := dat["email"].(string)
	if !ok {
		return "", fmt.Errorf("got data of type %T but wanted string\n", dat["id"])
	}
	//log.Println(email)
	return email, nil
}
