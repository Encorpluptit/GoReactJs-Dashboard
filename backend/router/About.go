package router

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

func about(c *gin.Context) {
	c.JSON(http.StatusOK, dumpAboutJSON(c))
}

type aboutJson struct {
	Customer aboutCustomer `json:"customer"`
	Server   aboutServer   `json:"server"`
}

type aboutCustomer struct {
	Host string `json:"host"`
}

type aboutServer struct {
	Timestamp int64     `json:"current_time"`
	Services  []service `json:"services"`
}

func dumpAboutJSON(c *gin.Context) aboutJson {
	return aboutJson{
		Customer: aboutCustomer{Host: c.ClientIP()},
		//Customer: aboutCustomer{Host: c.ClientIP()},
		Server: aboutServer{
			Timestamp: time.Now().Unix(),
			Services:  getServices(),
		},
	}
}

func getServices() []service {
	return []service{
		{
			Name: "weather",
			Widgets: []widget{
				{
					Name:        "city_temperature",
					Description: "Display temperature for a city",
					Params: []param{
						{
							Name: "city",
							Type: "string",
						},
					},
				},
			},
		},
		{
			Name: "rss",
			Widgets: []widget{
				{
					Name:        "article_list",
					Description: "Displaying the list of the last articles",
					Params: []param{
						{
							Name: "link",
							Type: "string",
						},
						{
							Name: "number",
							Type: "integer",
						},
					},
				},
			},
		},
	}
}

type param struct {
	Name string `json:"name"`
	Type string `json:"type"`
}

type widget struct {
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Params      []param `json:"params"`
}

type service struct {
	Name    string   `json:"name"`
	Widgets []widget `json:"widgets"`
}
