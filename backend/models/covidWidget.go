package models

import (
	"gorm.io/gorm"
)

const TypeCovidWidget = "CovidWidget"

type CovidWidget struct {
	gorm.Model
	UserID  uint   `json:"user_id"`
	Timer   int    `json:"timer"`
	Type    string `gorm:"size:100" json:"type"`
	Country string `gorm:"size:100" json:"country"`
	Fields  string `gorm:"size:100" json:"fields"`
}

//"recovered":12543
//"deaths":1726
//"confirmed":37658
//"lastChecked":"2020-04-21T18:54:05+00:00"
//"lastReported":"2020-04-20T23:44:34+00:00"
func NewCovidWidget(userID uint, covType, country string, fields string, timer int) *CovidWidget {
	return &CovidWidget{
		UserID:  userID,
		Type:    covType,
		Country: country,
		Fields:  fields,
	}
}

func (cw *CovidWidget) Save(db *gorm.DB) error {
	err := db.Debug().Create(&cw).Error
	if err != nil {
		return err
	}
	return nil
}

func (cw *CovidWidget) FindByID(db *gorm.DB, uid uint) error {
	err := db.Debug().Model(CovidWidget{}).Where("id = ?", uid).Take(&cw).Error
	if err != nil {
		return err
	}
	return nil
}

//func (cw *CovidWidget) SaveCovidWidget(db *gorm.DB) (*CovidWidget, error) {
//	var err error
//	err = db.Debug().Create(&cw).Error
//	if err != nil {
//		return nil, err
//	}
//	return cw, nil
//}
//
//func (cw *CovidWidget) FindCovidWidgetByID(db *gorm.DB, uid uint) (*CovidWidget, error) {
//	var err error
//	err = db.Debug().Model(CovidWidget{}).Where("id = ?", uid).Take(&cw).Error
//	if err != nil {
//		return nil, err
//	}
//	return cw, err
//}

//type RepositoryWidgets struct {
//	gorm.Model
//	UserName string `gorm:"size:100" json:"user_name"`
//	RepoName string `gorm:"size:100" json:"repo_name"`
//	//GithubId    int    `json:"github_id"`
//	UpdateTimer int `json:"update_timer"`
//}
