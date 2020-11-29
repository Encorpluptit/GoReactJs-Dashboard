package models

import "gorm.io/gorm"

type GithubWidget struct {
	gorm.Model
	Timer      int    `json:"timer"`
	UserID     uint   `json:"user_id"`
	AuthType   string `gorm:"size:100" json:"auth_type"`
	WidgetType string `gorm:"size:100" json:"widget_type"`
	Fields     string `gorm:"size:100" json:"fields"`
}

func NewGithubWidget(userID uint, authType, widgetType string, fields string, timer int) *GithubWidget {
	return &GithubWidget{
		UserID:     userID,
		Timer:      timer,
		AuthType:   authType,
		WidgetType: widgetType,
		Fields:     fields,
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
