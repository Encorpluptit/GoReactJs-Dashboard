package main

import (
	"AppDev_DashBoard/router"
	"AppDev_DashBoard/server"
	"fmt"
	"github.com/joho/godotenv"
	"log"
	"net"
	"os"
	"strings"
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
	name, err := os.Hostname()
	if err != nil {
		fmt.Printf("Oops: %v\n", err)
		return
	}

	addrs, err := net.LookupHost(name)
	if err != nil {
		fmt.Printf("Oops: %v\n", err)
		return
	}

	log.Printf("Server runs on http://%s:%s\n", strings.Join(addrs, ""), api.Port)
	if err := api.Router.Run(); err != nil {
		log.Fatalln(err)
	}
}
