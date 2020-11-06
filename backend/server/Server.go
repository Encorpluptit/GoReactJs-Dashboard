package server

import (
	"AppDev_DashBoard/database"
	"github.com/gin-gonic/gin"
	"log"
	"os"
)

type Server struct {
	Port   string
	Router *gin.Engine
	Db     *database.Database
}

func NewServer() (*Server, func()) {
	server := &Server{}
	server.Init()
	return server, server.Destroy
}

func (s *Server) Init() {
	s.Port = os.Getenv("PORT")
	if s.Port == "" {
		s.Port = "8081"
		log.Printf("Defaulting to port %s", s.Port)
	}

	var err error
	if s.Db, err = database.Init(); err != nil {
		log.Fatalf("Database Initialisation Failed: %v", err)
	}
	//model.MigrateModels()

	s.Router = gin.Default()
}

func (s *Server) Destroy() {
	//s.Db.Destroy()
}

//
//func (s *Server) initialiseRoutes() {
//
//	// Home Route
//	s.Router.HandleFunc("/", middlewares.SetMiddlewareJSON(Home)).Methods("GET")
//	s.Router.HandleFunc("/hello", middlewares.SetMiddlewareJSON(Hello)).Methods("GET")
//
//	// Login Route
//	s.Router.HandleFunc("/login", middlewares.SetMiddlewareJSON(s.Login)).Methods("POST")
//
//	//Users routes
//	s.Router.HandleFunc("/users", middlewares.SetMiddlewareJSON(s.CreateUser)).Methods("POST")
//	s.Router.HandleFunc("/users", middlewares.SetMiddlewareJSON(s.GetUsers)).Methods("GET")
//	s.Router.HandleFunc("/users/{id}", middlewares.SetMiddlewareJSON(s.GetUser)).Methods("GET")
//	s.Router.HandleFunc("/users/{id}", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.UpdateUser))).Methods("PUT")
//	s.Router.HandleFunc("/users/{id}", middlewares.SetMiddlewareAuthentication(s.DeleteUser)).Methods("DELETE")
//
//}
