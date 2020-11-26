package controllers

import (
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
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
			Scopes: []string{"users"},
			Endpoint: oauth2.Endpoint{
				AuthURL:  "https://github.com/login/oauth/authorize",
				TokenURL: "https://github.com/login/oauth/access_token",
			},
		}
	}
	return GithubConf
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
				"https://www.googleapis.com/auth/bigquery",
				"https://www.googleapis.com/auth/blogger",
			},
			Endpoint: google.Endpoint,
		}
	}
	return GoogleConf
}
