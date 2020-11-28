package controllers

import (
	"AppDev_DashBoard/api_errors"
	"AppDev_DashBoard/database"
	"AppDev_DashBoard/models"
	"log"
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

//TODO: DO
func RegisterGithubUser(requestedUser *models.User) (user *models.User, err error) {
	log.Printf("Register Github User: %v\n", requestedUser)
	user, err = requestedUser.SaveUser(database.BackendDB.DB)
	if err != nil {
		return nil, err
	}
	return user, nil
}

//TODO: DO
func RegisterGoogleUser(requestedUser *models.User) (user *models.User, err error) {
	log.Printf("Register Google User: %v\n", requestedUser)
	user, err = requestedUser.SaveUser(database.BackendDB.DB)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func FindUser(id uint) (user *models.User, err error) {
	user = &models.User{}
	if user, err = user.FindUserByID(database.BackendDB.DB, id); err != nil {
		log.Println("User Not found with github ID in controllers.FindUserByGithubID", err)
	}
	return user, err
}

func FindGithubUser(id int) (user *models.User, err error) {
	user = &models.User{
		GithubId: id,
	}
	if user, err = user.FindUserByGithubID(database.BackendDB.DB); err != nil {
		log.Println("User Not found with github ID in controllers.FindUserByGithubID", err)
	}
	return user, err
}

func FindGoogleUser(email string) (user *models.User, err error) {
	user = &models.User{
		GoogleEmail: email,
	}
	if user, err = user.FindUserByGoogleEmail(database.BackendDB.DB); err != nil {
		log.Println("User Not found with Google email in controllers.FindUserByGithubID", err)
	}
	return user, err
}
