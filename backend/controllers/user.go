package controllers

import (
	"AppDev_DashBoard/api_errors"
	"AppDev_DashBoard/database"
	"AppDev_DashBoard/models"
)

func Login(user *models.User) (*models.User, error) {
	userFound, err := user.FindUserByUsername(database.BackendDB.DB)
	if err != nil {
		return nil, err
	}
	if err = models.VerifyPassword(userFound.Password, user.Password); err != nil {
		return nil, api_errors.WrongPassword
	}
	return userFound, nil
}

func Register(requestedUser *models.User) (user *models.User, err error) {
	user, err = requestedUser.SaveUser(database.BackendDB.DB)
	if err != nil {
		return nil, err
	}
	return user, nil
}
