package api_errors

import "errors"

var UserNotFound = errors.New("user not found")
var WrongLogin = errors.New("wrong login")
var WrongPassword = errors.New("wrong password")
