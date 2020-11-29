package database

import (
	"AppDev_DashBoard/models"
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/driver/postgres"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"log"
	"os"
)

// Database: type for holding generic database, DB is the database pointer
type Database struct {
	DB       *gorm.DB
	Driver   string
	Url      string
	Name     string
	Host     string
	Port     string
	User     string
	Password string
}

// BackendDB: package variable of type Database for easy access across backend
var BackendDB = &Database{}

// Init : open database stream in BackendDB variable (create database if not present)
func Init() (db *Database, err error) {
	BackendDB.prepareEnv()
	if os.Getenv("API_STATE") == "RELEASE" {
		//BackendDB.DB, err = gorm.Open(sqlite.Open("prod.db"), &gorm.Config{})
		err = BackendDB.initPostGreSql()
	} else {
		log.Print("Database in Debug mode")
		err = BackendDB.initSqlite()
	}
	if err != nil {
		return nil, err
	}
	return BackendDB, err
}

// Load env from .env file (production) or deployment env
func (db *Database) prepareEnv() {
	db.Driver = os.Getenv("DB_DRIVER")
	db.Url = os.Getenv("DATABASE_URL")
	db.Host = os.Getenv("DB_HOST")
	db.Port = os.Getenv("DB_PORT")
	db.Name = os.Getenv("DB_NAME")
	db.User = os.Getenv("DB_USER")
	db.Password = os.Getenv("DB_PASSWORD")
}

// Initialise sqlite Db
func (db *Database) initSqlite() (err error) {
	db.DB, err = gorm.Open(sqlite.Open("/database_dev/dev.db"), &gorm.Config{})
	if err != nil {
		fmt.Printf("Cannot connect to %s database", db.Driver)
		log.Fatal("This is the error:", err)
	} else {
		fmt.Printf("We are connected to the %s database", db.Driver)
	}
	return db.autoMigrate()
}

// Initialise mysql Db
func (db *Database) initMySql() (err error) {
	url := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", db.User, db.Password, db.Host, db.Port, db.Name)
	db.DB, err = gorm.Open(mysql.Open(url), &gorm.Config{})
	if err != nil {
		fmt.Printf("Cannot connect to %s database", db.Driver)
		log.Fatal("This is the error:", err)
	} else {
		fmt.Printf("We are connected to the %s database", db.Driver)
	}
	return db.autoMigrate()
}

// Initialise Postgresql Db
func (db *Database) initPostGreSql() (err error) {
	//url := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable password=%s", db.Host, db.Port, db.User, db.Name, db.Password)
	db.DB, err = gorm.Open(postgres.Open(db.Url), &gorm.Config{})
	if err != nil {
		fmt.Printf("Cannot connect to %s database", db.Driver)
		log.Fatal("This is the error:", err)
	} else {
		fmt.Printf("We are connected to the %s database", db.Driver)
	}
	return db.autoMigrate()
}

// Auto migrate models
func (db *Database) autoMigrate() (err error) {
	err = db.DB.Debug().AutoMigrate(&models.User{})          //database migration
	err = db.DB.Debug().AutoMigrate(&models.CovidWidget{})   //database migration
	err = db.DB.Debug().AutoMigrate(&models.WeatherWidget{}) //database migration
	err = db.DB.Debug().AutoMigrate(&models.CoinWidget{})    //database migration
	err = db.DB.Debug().AutoMigrate(&models.GithubWidget{})  //database migration
	err = db.DB.Debug().AutoMigrate(&models.NewsWidget{})    //database migration
	return nil
}

// Destroy : Close the Database
func (db *Database) Destroy() {
	//err := db.DB.Close()
	//err := db.DB.
	//if err != nil {
	//	log.Fatal(err)
	//}
}
