package controllers

import (
	"AppDev_DashBoard/database"
	"AppDev_DashBoard/models"
)

func FindCovidByID(id uint) (*models.CovidWidget, error) {
	widg := &models.CovidWidget{}
	return widg.FindCovidWidgetByID(database.BackendDB.DB, id)
	//widg.SaveCovidWidget()
	//return nil, nil
}

func createCovid(widgType string, user *models.User) (*models.CovidWidget, error) {
	widg := &models.CovidWidget{
		Type: widgType,
	}
	return widg.SaveCovidWidget(database.BackendDB.DB)
	//widg.SaveCovidWidget()
	//return nil, nil
}
