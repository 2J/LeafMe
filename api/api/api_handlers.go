package api

import (
	"encoding/json"
	"github.com/2J/LeafMe/api/models"
	"io/ioutil"
	"net/http"
	"time"
)

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

func TestPostHandler(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)
	response := "You have posted with the data:\n" + string(body)

	responseJson, err := json.Marshal(response)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJson)
}
