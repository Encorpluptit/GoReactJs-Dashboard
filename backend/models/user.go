package models

import (
	"AppDev_DashBoard/api_errors"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"log"
)

type User struct {
	gorm.Model
	Username    string `gorm:"size:255;not null;unique" json:"nickname"`
	Email       string `gorm:"size:100;not null;unique" json:"email"`
	GithubId    int    `gorm:"size:100" json:"github_id"`
	GoogleEmail string `gorm:"size:100" json:"google_email"`
	//TODO: manage Unique ?
	//GithubId    int    `gorm:"size:100;unique" json:"github_id"`
	//GoogleEmail string `gorm:"size:100;unique" json:"google_email"`
	Password string `gorm:"size:100;not null;" json:"password"`
}

func Hash(password string) ([]byte, error) {
	return bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
}

func VerifyPassword(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func (u *User) BeforeSave(*gorm.DB) error {
	hashedPassword, err := Hash(u.Password)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return nil
}

//func (u *User) Prepare() {
//	u.ID = 0
//	u.Username = html.EscapeString(strings.TrimSpace(u.Username))
//	u.Email = html.EscapeString(strings.TrimSpace(u.Email))
//	u.CreatedAt = time.Now()
//	u.UpdatedAt = time.Now()
//}

//func (u *User) Validate(action string) error {
//	switch strings.ToLower(action) {
//	case "update":
//		if u.Username == "" {
//			return errors.New("required nickname")
//		}
//		if u.Password == "" {
//			return errors.New("required password")
//		}
//		if u.Email == "" {
//			return errors.New("required email")
//		}
//		if err := checkmail.ValidateFormat(u.Email); err != nil {
//			return errors.New("invalid email")
//		}
//
//		return nil
//	case "login":
//		if u.Password == "" {
//			return errors.New("required password")
//		}
//		if u.Email == "" {
//			return errors.New("required email")
//		}
//		if err := checkmail.ValidateFormat(u.Email); err != nil {
//			return errors.New("invalid email")
//		}
//		return nil
//
//	default:
//		if u.Username == "" {
//			return errors.New("required nickname")
//		}
//		if u.Password == "" {
//			return errors.New("required password")
//		}
//		if u.Email == "" {
//			return errors.New("required email")
//		}
//		if err := checkmail.ValidateFormat(u.Email); err != nil {
//			return errors.New("invalid email")
//		}
//		return nil
//	}
//}
//
func (u *User) SaveUser(db *gorm.DB) (*User, error) {
	var err error
	err = db.Debug().Create(&u).Error
	if err != nil {
		return &User{}, err
	}
	return u, nil
}

func (u *User) FindAllUsers(db *gorm.DB) (*[]User, error) {
	var err error
	var users []User
	err = db.Debug().Model(&User{}).Limit(100).Find(&users).Error
	if err != nil {
		return &[]User{}, err
	}
	return &users, err
}

func (u *User) FindUserByID(db *gorm.DB, uid uint32) (*User, error) {
	var err error
	err = db.Debug().Model(User{}).Where("id = ?", uid).Take(&u).Error
	if err != nil {
		return &User{}, err
	}
	return u, err
}

func (u *User) FindUserByGithubID(db *gorm.DB) (*User, error) {
	if err := db.Debug().Model(User{}).Where("github_id = ?", u.GithubId).Take(&u).Error; err != nil {
		return u, err
	}
	return u, nil
}

func (u *User) FindUserByGoogleEmail(db *gorm.DB) (*User, error) {
	//user := &User{}
	//err := db.Debug().Model(&User{}).First(user, "username = ?", u.Username).Error
	if err := db.Debug().Model(User{}).Where("google_email = ?", u.GoogleEmail).Take(&u).Error; err != nil {
		return u, err
	}
	return u, nil
}

func (u User) FindUserByUsername(db *gorm.DB) (*User, error) {
	log.Println(u)
	user := &User{}
	err := db.Debug().Model(&User{}).First(user, "username = ?", u.Username).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, api_errors.UserNotFound
		}
		return nil, err
	}
	return user, err
}

//
//func (u *User) UpdateAUser(db *gorm.DB, uid uint32) (*User, error) {
//
//	// To hash the password
//	err := u.BeforeSave(db)
//	if err != nil {
//		log.Fatal(err)
//	}
//	db = db.Debug().Model(&User{}).Where("id = ?", uid).Take(&User{}).UpdateColumns(
//		map[string]interface{}{
//			"password": u.Password,
//			"nickname": u.Username,
//			"email":    u.Email,
//		},
//	)
//	if db.Error != nil {
//		return &User{}, db.Error
//	}
//	// This is the display the updated user
//	err = db.Debug().Model(&User{}).Where("id = ?", uid).Take(&u).Error
//	if err != nil {
//		return &User{}, err
//	}
//	return u, nil
//}

func (u *User) DeleteAUser(db *gorm.DB, uid uint32) (int64, error) {

	db = db.Debug().Model(&User{}).Where("id = ?", uid).Take(&User{}).Delete(&User{})

	if db.Error != nil {
		return 0, db.Error
	}
	return db.RowsAffected, nil
}
