package controllers

import (
	"AppDev_DashBoard/database"
	"AppDev_DashBoard/models"
)

func FindCovidByID(id uint) (*models.CovidWidget, error) {
	widget := &models.CovidWidget{}
	widget.ID = id
	if err := widget.FindByID(database.BackendDB.DB, id); err != nil {
		return nil, err
	}
	return widget, nil
}

func CreateCovid(userID uint, covType, country string, fields string, timer int) (*models.CovidWidget, error) {
	widget := models.NewCovidWidget(userID, covType, country, fields, timer)

	if err := widget.Save(database.BackendDB.DB); err != nil {
		return nil, err
	}
	return widget, nil
}
