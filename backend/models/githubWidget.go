package models

import "gorm.io/gorm"

type GithubWidgets struct {
	gorm.Model
	GithubId int  `json:"github_id"`
	UserID   uint `json:"user_id"`
}

type RepositoryWidgets struct {
	gorm.Model
	UserName string `gorm:"size:100" json:"user_name"`
	RepoName string `gorm:"size:100" json:"repo_name"`
	//GithubId    int    `json:"github_id"`
	UpdateTimer int `json:"update_timer"`
}
