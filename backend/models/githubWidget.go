package models

import "gorm.io/gorm"

type GithubWidget struct {
	gorm.Model
	GithubId int  `json:"github_id"`
	Timer    int  `json:"timer"`
	UserID   uint `json:"user_id"`
}

func NewGithubWidget(userID uint, covType, country string, fields string, timer int) *GithubWidget {
	return &GithubWidget{
		UserID: userID,
		Timer:  timer,
	}
}

func (cw *GithubWidget) Save(db *gorm.DB) error {
	err := db.Debug().Create(&cw).Error
	if err != nil {
		return err
	}
	return nil
}

func (cw *GithubWidget) FindByID(db *gorm.DB, uid uint) error {
	err := db.Debug().Model(GithubWidget{}).Where("id = ?", uid).Take(&cw).Error
	if err != nil {
		return err
	}
	return nil
}
