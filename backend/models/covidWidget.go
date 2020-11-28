package models

import "gorm.io/gorm"

type CovidWidget struct {
	gorm.Model
	Type   string `gorm:"size:100" json:"type"`
	UserID uint   `json:"user_id"`
}

func (cw *CovidWidget) SaveCovidWidget(db *gorm.DB) (*CovidWidget, error) {
	var err error
	err = db.Debug().Create(&cw).Error
	if err != nil {
		return nil, err
	}
	return cw, nil
}

func (cw *CovidWidget) FindCovidWidgetByID(db *gorm.DB, uid uint) (*CovidWidget, error) {
	var err error
	err = db.Debug().Model(CovidWidget{}).Where("id = ?", uid).Take(&cw).Error
	if err != nil {
		return nil, err
	}
	return cw, err
}

//type RepositoryWidgets struct {
//	gorm.Model
//	UserName string `gorm:"size:100" json:"user_name"`
//	RepoName string `gorm:"size:100" json:"repo_name"`
//	//GithubId    int    `json:"github_id"`
//	UpdateTimer int `json:"update_timer"`
//}
