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
			Name: "news",
			Widgets: []widget{
				{
					Name:        "Trending",
					Description: "Displaying the list of the last trending articles",
					Params: []param{
						{
							Name: "type",
							Type: "string",
						},
						{
							Name: "timer",
							Type: "integer",
						},
						{
							Name: "fields",
							Type: "string",
						},
					},
				},
				{
					Name:        "Search",
					Description: "Displaying the list of articles given specific Topic",
					Params: []param{
						{
							Name: "type",
							Type: "string",
						},
						{
							Name: "timer",
							Type: "integer",
						},
						{
							Name: "Topic",
							Type: "string",
						},
						{
							Name: "fields",
							Type: "string",
						},
					},
				},
			},
		},
		{
			Name: "Weather",
			Widgets: []widget{
				{
					Name:        "Weather",
					Description: "Give information about Weather given a city",
					Params: []param{
						{
							Name: "type",
							Type: "string",
						},
						{
							Name: "timer",
							Type: "integer",
						},
						{
							Name: "City",
							Type: "string",
						},
						{
							Name: "fields",
							Type: "string",
						},
					},
				},
			},
		},
		{
			Name: "Github",
			Widgets: []widget{
				{
					Name:        "UserInfos",
					Description: "Give information about User currently logged with Github Oauth",
					Params: []param{
						{
							Name: "authType",
							Type: "string",
						},
						{
							Name: "widgetType",
							Type: "string",
						},
						{
							Name: "timer",
							Type: "integer",
						},
						{
							Name: "fields",
							Type: "string",
						},
					},
				},
			},
		},
		{
			Name: "Covid",
			Widgets: []widget{
				{
					Name:        "Total",
					Description: "Give computed stats (World or specified country)",
					Params: []param{
						{
							Name: "type",
							Type: "string",
						},
						{
							Name: "timer",
							Type: "integer",
						},
						{
							Name: "Country",
							Type: "string",
						},
					},
				},
				{
					Name:        "Stats",
					Description: "Give complete stats (World or specified country)",
					Params: []param{
						{
							Name: "type",
							Type: "string",
						},
						{
							Name: "timer",
							Type: "integer",
						},
						{
							Name: "Country",
							Type: "string",
						},
						{
							Name: "fields",
							Type: "string",
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
