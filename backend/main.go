package main

import (
	"AppDev_DashBoard/router"
	"AppDev_DashBoard/server"
	"log"
)

func main() {
	// Setup the api for CLI's needs & gets ready to properly close it
	api, stopApi := server.NewServer()
	router.ApplyRoutes(api.Router)
	defer stopApi()

	// Starts the api
	log.Println("Server runs on http://localhost:" + api.Port)
	if err := api.Router.Run(); err != nil {
		log.Fatalln(err)
	}
}
