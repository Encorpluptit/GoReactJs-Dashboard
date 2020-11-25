package controllers

import "golang.org/x/oauth2"

var GithubConf = &oauth2.Config{
	ClientID:     "a758719d422863f322f7",
	ClientSecret: "a9a92ef0f4156ee312c41effd65589f36d5c4bca",
	//Scopes:       []string{"SCOPE1", "SCOPE2"},
	Scopes: []string{"user"},
	Endpoint: oauth2.Endpoint{
		AuthURL:  "https://github.com/login/oauth/authorize",
		TokenURL: "https://github.com/login/oauth/access_token",
	},
}
