package api

import (
	"encoding/json"
	"github.com/2J/LeafMe/api/models"
	"net/http"
	"time"
)

var tokenKey string

func init() {
	tokenKey = "ASDGOIASNHDGLKAHBWLHa2y3y23y2lYASDOysaeylWYLKWJ"
}

func IndexGetHandler(w http.ResponseWriter, r *http.Request) {
	response := "Just LeafMe alone!"

	responseJson, err := json.Marshal(response)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJson)
}

func TestGetHandler(w http.ResponseWriter, r *http.Request) {
	test := models.Test{
		ID:         123,
		SomeNumber: 2454,
		SomeString: "Some string!\\?.vjsadf><asfdafasf\"asdfasdf",
		SomeDate:   time.Now(),
		SomeFloat:  324.2352362,
		SomeBool:   true,
		SomeArray:  []int{5, 3, 745, 53, 2, 215, 2, 2},
	}

	responseJson, err := json.Marshal(test)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJson)
}
