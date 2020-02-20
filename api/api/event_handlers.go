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
	err := lightingEvent.GetByID(eventId)

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

	lightingEvents, err := models.GetLightingEventsByScheduleID(scheduleId)
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

	lightingEvents, err := models.GetLightingEventsByPlantID(plantId)
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
	err := wateringEvent.GetByID(eventId)

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

	wateringEvents, err := models.GetWateringEventsByScheduleID(scheduleId)
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

	wateringEvents, err := models.GetWateringEventsByPlantID(plantId)
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

	lightingEvents, err := models.GetLightingEventsByPlantID(plantId)
	if err != nil {
		panic(err.Error())
	}
	wateringEvents, err := models.GetWateringEventsByPlantID(plantId)
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

func SetLightingEventFinishedHandler(w http.ResponseWriter, r *http.Request) {
	eventId, _ := strconv.Atoi(urlParamAsString(r, "eventId"))

	response := struct {
		Success bool `json:"success"`
	}{
		false,
	}
	responseJson, _ := json.Marshal(response)

	err := models.SetLightingEventFinished(eventId, true)

	if err != nil {
		writeJsonResponse(w, 500, responseJson)
		return
	}

	response.Success = true
	responseJson, err = json.Marshal(response)
	writeJsonResponse(w, 200, responseJson)
}

func SetWateringEventFinishedHandler(w http.ResponseWriter, r *http.Request) {
	eventId, _ := strconv.Atoi(urlParamAsString(r, "eventId"))

	response := struct {
		Success bool `json:"success"`
	}{
		false,
	}
	responseJson, _ := json.Marshal(response)

	err := models.SetWateringEventFinished(eventId, true)

	if err != nil {
		writeJsonResponse(w, 500, responseJson)
		return
	}

	response.Success = true
	responseJson, err = json.Marshal(response)
	writeJsonResponse(w, 200, responseJson)
}
