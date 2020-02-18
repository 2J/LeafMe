package api

import (
	"encoding/json"
	"github.com/2J/LeafMe/api/models"
	"net/http"
	"strconv"
)

func GetLightingEventByIdHandler(w http.ResponseWriter, r *http.Request) {
	//plantId, _ := strconv.Atoi(urlParamAsString(r, "plantId"))
	eventId, _ := strconv.Atoi(urlParamAsString(r, "eventId"))

	lightingEvent := models.LightingEvent{}
	err := lightingEvent.GetById(eventId)

	if err != nil {
		writeErrorResponse(w, 500, "Failed to get: "+err.Error())
		return
	}

	responseJson, err := json.Marshal(lightingEvent)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJson)
}

func GetLightingEventsByScheduleIdHandler(w http.ResponseWriter, r *http.Request) {
	scheduleId, _ := strconv.Atoi(urlParamAsString(r, "scheduleId"))

	lightingEvents, err := models.GetLightingEventsByScheduleId(scheduleId)
	if err != nil {
		panic(err.Error())
	}

	response := struct {
		LightingEvents []models.LightingEvent `json:"lighting_events"`
	}{
		lightingEvents,
	}

	responseJson, err := json.Marshal(response)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJson)
}

func GetLightingEventsByPlantIdHandler(w http.ResponseWriter, r *http.Request) {
	plantId, _ := strconv.Atoi(urlParamAsString(r, "plantId"))

	lightingEvents, err := models.GetLightingEventsByPlantId(plantId)
	if err != nil {
		panic(err.Error())
	}

	response := struct {
		LightingEvents []models.LightingEvent `json:"lighting_events"`
	}{
		lightingEvents,
	}

	responseJson, err := json.Marshal(response)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJson)
}

func GetWateringEventByIdHandler(w http.ResponseWriter, r *http.Request) {
	//plantId, _ := strconv.Atoi(urlParamAsString(r, "plantId"))
	eventId, _ := strconv.Atoi(urlParamAsString(r, "eventId"))

	wateringEvent := models.WateringEvent{}
	err := wateringEvent.GetById(eventId)

	if err != nil {
		writeErrorResponse(w, 500, "Failed to get: "+err.Error())
		return
	}

	responseJson, err := json.Marshal(wateringEvent)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJson)
}

func GetWateringEventsByScheduleIdHandler(w http.ResponseWriter, r *http.Request) {
	scheduleId, _ := strconv.Atoi(urlParamAsString(r, "scheduleId"))

	wateringEvents, err := models.GetWateringEventsByScheduleId(scheduleId)
	if err != nil {
		panic(err.Error())
	}

	response := struct {
		WateringEvents []models.WateringEvent `json:"watering_events"`
	}{
		wateringEvents,
	}

	responseJson, err := json.Marshal(response)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJson)
}

func GetWateringEventsByPlantIdHandler(w http.ResponseWriter, r *http.Request) {
	plantId, _ := strconv.Atoi(urlParamAsString(r, "plantId"))

	wateringEvents, err := models.GetWateringEventsByPlantId(plantId)
	if err != nil {
		panic(err.Error())
	}

	response := struct {
		WateringEvents []models.WateringEvent `json:"watering_events"`
	}{
		wateringEvents,
	}

	responseJson, err := json.Marshal(response)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJson)
}

func GetEventsByPlantIdHandler(w http.ResponseWriter, r *http.Request) {
	plantId, _ := strconv.Atoi(urlParamAsString(r, "plantId"))

	lightingEvents, err := models.GetLightingEventsByPlantId(plantId)
	if err != nil {
		panic(err.Error())
	}
	wateringEvents, err := models.GetWateringEventsByPlantId(plantId)
	if err != nil {
		panic(err.Error())
	}

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
