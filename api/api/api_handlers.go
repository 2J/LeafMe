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

func TestGetSchedulesHandler(w http.ResponseWriter, r *http.Request) {
	sometime := time.Date(2019, 11, 19, 20, 0, 0, 0, time.UTC)

	lightingSchedules := []models.LightingSchedule{
		models.LightingSchedule{
			ID:      1,
			PlantID: 1,
			Schedule: models.Schedule{
				Time:          sometime,
				RepeatDays:    7,
				RepeatEndDate: sometime.Add(time.Hour * 24 * 50),
			},
			Length: 480,
			Active: true,
		},
		models.LightingSchedule{
			ID:      2,
			PlantID: 1,
			Schedule: models.Schedule{
				Time:          sometime.Add(time.Hour * (24*2 - 5)),
				RepeatDays:    5,
				RepeatEndDate: sometime.Add(time.Hour * 24 * 30),
			},
			Length: 120,
			Active: true,
		},
	}

	wateringSchedules := []models.WateringSchedule{
		models.WateringSchedule{
			ID:      1,
			PlantID: 1,
			Schedule: models.Schedule{
				Time:          sometime.Add(time.Hour * (24*3 - 4)),
				RepeatDays:    7,
				RepeatEndDate: sometime.Add(time.Hour * 24 * 50),
			},
			Amount: 50,
			Active: true,
		},
		models.WateringSchedule{
			ID:      2,
			PlantID: 1,
			Schedule: models.Schedule{
				Time:          sometime.Add(time.Hour * (24*5 - 8)),
				RepeatDays:    5,
				RepeatEndDate: sometime.Add(time.Hour * 24 * 30),
			},
			Amount: 35,
			Active: true,
		},
	}

	response := struct {
		LightingSchedules []models.LightingSchedule `json:"lighting_schedules"`
		WateringSchedules []models.WateringSchedule `json:"watering_schedules"`
	}{
		lightingSchedules,
		wateringSchedules,
	}

	responseJson, err := json.Marshal(response)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJson)
}
