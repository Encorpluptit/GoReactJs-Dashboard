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

func FindGithubByID(id uint) (*models.GithubWidget, error) {
	widget := &models.GithubWidget{}
	widget.ID = id
	if err := widget.FindByID(database.BackendDB.DB, id); err != nil {
		return nil, err
	}
	return widget, nil
}

func CreateGithub(userID uint, covType, country string, fields string, timer int) (*models.GithubWidget, error) {
	widget := models.NewGithubWidget(userID, covType, country, fields, timer)

	if err := widget.Save(database.BackendDB.DB); err != nil {
		return nil, err
	}
	return widget, nil
}

func FindWeatherByID(id uint) (*models.WeatherWidget, error) {
	widget := &models.WeatherWidget{}
	widget.ID = id
	if err := widget.FindByID(database.BackendDB.DB, id); err != nil {
		return nil, err
	}
	return widget, nil
}

func CreateWeather(userID uint, covType, country string, fields string, timer int) (*models.WeatherWidget, error) {
	widget := models.NewWeatherWidget(userID, covType, country, fields, timer)

	if err := widget.Save(database.BackendDB.DB); err != nil {
		return nil, err
	}
	return widget, nil
}

func FindCoinByID(id uint) (*models.CoinWidget, error) {
	widget := &models.CoinWidget{}
	widget.ID = id
	if err := widget.FindByID(database.BackendDB.DB, id); err != nil {
		return nil, err
	}
	return widget, nil
}

func CreateCoin(userID uint, covType, country string, fields string, timer int) (*models.CoinWidget, error) {
	widget := models.NewCoinWidget(userID, covType, country, fields, timer)

	if err := widget.Save(database.BackendDB.DB); err != nil {
		return nil, err
	}
	return widget, nil
}
