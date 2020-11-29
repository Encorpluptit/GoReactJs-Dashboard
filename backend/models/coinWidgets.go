package models

import "gorm.io/gorm"

type CoinWidget struct {
	gorm.Model
	UserID uint `json:"user_id"`
	Timer  int  `json:"timer"`
}

//"recovered":12543
//"deaths":1726
//"confirmed":37658
//"lastChecked":"2020-04-21T18:54:05+00:00"
//"lastReported":"2020-04-20T23:44:34+00:00"
func NewCoinWidget(userID uint, covType, country string, fields string, timer int) *CoinWidget {
	return &CoinWidget{
		UserID: userID,
		Timer:  timer,
	}
}

func (cw *CoinWidget) Save(db *gorm.DB) error {
	err := db.Debug().Create(&cw).Error
	if err != nil {
		return err
	}
	return nil
}

func (cw *CoinWidget) FindByID(db *gorm.DB, uid uint) error {
	err := db.Debug().Model(CoinWidget{}).Where("id = ?", uid).Take(&cw).Error
	if err != nil {
		return err
	}
	return nil
}
