package api

import (
	"encoding/json"
	"github.com/2J/LeafMe/api/models"
	"io/ioutil"
	"net/http"
	"sort"
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

func getTestSchedules() ([]models.LightingSchedule, []models.WateringSchedule) {
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

	return lightingSchedules, wateringSchedules
}

func TestGetSchedulesHandler(w http.ResponseWriter, r *http.Request) {
	lightingSchedules, wateringSchedules := getTestSchedules()
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

func TestGetEventsHandler(w http.ResponseWriter, r *http.Request) {
	startTime := time.Date(2019, 11, 18, 20, 0, 0, 0, time.UTC)
	endTime := time.Date(2020, 5, 18, 20, 0, 0, 0, time.UTC)
	lightingSchedules, wateringSchedules := getTestSchedules()

	// Generate events based on schedule
	eventIndex := 1
	lightingEvents := []models.LightingEvent{}
	for _, lightingSchedule := range lightingSchedules {
		currTime := lightingSchedule.Schedule.Time
		for currTime.Before(endTime) && currTime.Before(lightingSchedule.Schedule.RepeatEndDate) {
			if currTime.After(startTime) {
				// Add to slice
				lightingEvent := models.LightingEvent{
					ID:                 eventIndex,
					PlantID:            lightingSchedule.PlantID,
					LightingScheduleID: lightingSchedule.ID,
					StartTime:          currTime,
					Length:             lightingSchedule.Length,
					Finished:           currTime.Before(time.Now()),
				}
				lightingEvents = append(lightingEvents, lightingEvent)
				eventIndex++
			}
			currTime = currTime.Add(time.Hour * 24 * time.Duration(lightingSchedule.Schedule.RepeatDays))
		}
	}

	eventIndex = 1
	wateringEvents := []models.WateringEvent{}
	for _, wateringSchedule := range wateringSchedules {
		currTime := wateringSchedule.Schedule.Time
		for currTime.Before(endTime) && currTime.Before(wateringSchedule.Schedule.RepeatEndDate) {
			if currTime.After(startTime) {
				// Add to slice
				wateringEvent := models.WateringEvent{
					ID:                 eventIndex,
					PlantID:            wateringSchedule.PlantID,
					WateringScheduleID: wateringSchedule.ID,
					StartTime:          currTime,
					Amount:             wateringSchedule.Amount,
					Finished:           currTime.Before(time.Now()),
				}
				wateringEvents = append(wateringEvents, wateringEvent)
				eventIndex++
			}
			currTime = currTime.Add(time.Hour * 24 * time.Duration(wateringSchedule.Schedule.RepeatDays))
		}
	}

	// Sort events
	sort.Slice(lightingEvents, func(i, j int) bool {
		return lightingEvents[i].StartTime.Before(lightingEvents[j].StartTime)
	})

	sort.Slice(wateringEvents, func(i, j int) bool {
		return wateringEvents[i].StartTime.Before(wateringEvents[j].StartTime)
	})

	response := struct {
		LightingEvents []models.LightingEvent `json:"lighting_events"`
		WateringEvents []models.WateringEvent `json:"watering_events"`
	}{
		lightingEvents,
		wateringEvents,
	}

	responseJson, err := json.Marshal(response)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJson)
}
