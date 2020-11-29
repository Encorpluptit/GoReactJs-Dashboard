package models

import (
	"gorm.io/gorm"
)

type NewsWidget struct {
	gorm.Model
	UserID uint   `json:"user_id"`
	Timer  int    `json:"timer"`
	Type   string `gorm:"size:100" json:"type"`
	Lang   string `gorm:"size:100" json:"lang"`
	Topic  string `gorm:"size:100" json:"topic"`
	Fields string `gorm:"size:100" json:"fields"`
}

func NewNewsWidget(userID uint, newsType, lang, topic string, fields string, timer int) *NewsWidget {
	return &NewsWidget{
		UserID: userID,
		Type:   newsType,
		Timer:  timer,
		Lang:   lang,
		Topic:  topic,
		Fields: fields,
	}
}

func (cw *NewsWidget) Save(db *gorm.DB) error {
	err := db.Debug().Create(&cw).Error
	if err != nil {
		return err
	}
	return nil
}

func (cw *NewsWidget) FindByID(db *gorm.DB, uid uint) error {
	err := db.Debug().Model(NewsWidget{}).Where("id = ?", uid).Take(&cw).Error
	if err != nil {
		return err
	}
	return nil
}
