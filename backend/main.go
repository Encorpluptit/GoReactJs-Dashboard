package main

import (
	"AppDev_DashBoard/router"
	"AppDev_DashBoard/server"
	"github.com/joho/godotenv"
	"log"
	"os"
)

func loadEnv() {
	if os.Getenv("API_STATE") != "RELEASE" {
		if godotenv.Load() != nil {
			log.Fatalf("Cannot Load .env file.")
		}
	}
}
func main() {
	loadEnv()
	api, stopApi := server.NewServer()
	router.ApplyRoutes(api.Router)
	defer stopApi()

	// Starts the api
	log.Println("Server runs on http://localhost:" + api.Port)
	if err := api.Router.Run(); err != nil {
		log.Fatalln(err)
	}
}
