package api

import (
	"encoding/json"
	"fmt"
	"github.com/2J/LeafMe/api/models"
	"io/ioutil"
	"net/http"
	"strconv"
)

func GetLightingEventByIdHandler(w http.ResponseWriter, r *http.Request) {
	//plantId, _ := strconv.Atoi(urlParamAsString(r, "plantId"))
	eventId, _ := strconv.Atoi(urlParamAsString(r, "eventId"))

	lightingEvent := models.LightingEvent{}
	err := lightingEvent.GetByID(int64(eventId))

	if err != nil {
		writeErrorResponse(w, 500, "Failed to get: "+err.Error())
		return
	}

	responseJSON, err := json.Marshal(lightingEvent)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJSON)
}

func GetLightingEventsByScheduleIdHandler(w http.ResponseWriter, r *http.Request) {
	scheduleId, _ := strconv.Atoi(urlParamAsString(r, "scheduleId"))

	lightingEvents, err := models.GetLightingEventsByScheduleID(int64(scheduleId))
	if err != nil {
		panic(err.Error())
	}

	response := struct {
		LightingEvents []models.LightingEvent `json:"lighting_events"`
	}{
		lightingEvents,
	}

	responseJSON, err := json.Marshal(response)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJSON)
}

func GetLightingEventsByPlantIdHandler(w http.ResponseWriter, r *http.Request) {
	plantId, _ := strconv.Atoi(urlParamAsString(r, "plantId"))

	lightingEvents, err := models.GetLightingEventsByPlantID(int64(plantId))
	if err != nil {
		panic(err.Error())
	}

	response := struct {
		LightingEvents []models.LightingEvent `json:"lighting_events"`
	}{
		lightingEvents,
	}

	responseJSON, err := json.Marshal(response)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJSON)
}

func GetWateringEventByIdHandler(w http.ResponseWriter, r *http.Request) {
	//plantId, _ := strconv.Atoi(urlParamAsString(r, "plantId"))
	eventId, _ := strconv.Atoi(urlParamAsString(r, "eventId"))

	wateringEvent := models.WateringEvent{}
	err := wateringEvent.GetByID(int64(eventId))

	if err != nil {
		writeErrorResponse(w, 500, "Failed to get: "+err.Error())
		return
	}

	responseJSON, err := json.Marshal(wateringEvent)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJSON)
}

func GetWateringEventsByScheduleIdHandler(w http.ResponseWriter, r *http.Request) {
	scheduleId, _ := strconv.Atoi(urlParamAsString(r, "scheduleId"))

	wateringEvents, err := models.GetWateringEventsByScheduleID(int64(scheduleId))
	if err != nil {
		panic(err.Error())
	}

	response := struct {
		WateringEvents []models.WateringEvent `json:"watering_events"`
	}{
		wateringEvents,
	}

	responseJSON, err := json.Marshal(response)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJSON)
}

func GetWateringEventsByPlantIdHandler(w http.ResponseWriter, r *http.Request) {
	plantId, _ := strconv.Atoi(urlParamAsString(r, "plantId"))

	wateringEvents, err := models.GetWateringEventsByPlantID(int64(plantId))
	if err != nil {
		panic(err.Error())
	}

	response := struct {
		WateringEvents []models.WateringEvent `json:"watering_events"`
	}{
		wateringEvents,
	}

	responseJSON, err := json.Marshal(response)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJSON)
}

func GetEventsByPlantIdHandler(w http.ResponseWriter, r *http.Request) {
	plantId, _ := strconv.Atoi(urlParamAsString(r, "plantId"))

	lightingEvents, err := models.GetLightingEventsByPlantID(int64(plantId))
	if err != nil {
		panic(err.Error())
	}
	wateringEvents, err := models.GetWateringEventsByPlantID(int64(plantId))
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

	responseJSON, err := json.Marshal(response)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJSON)
}

func SetLightingEventFinishedHandler(w http.ResponseWriter, r *http.Request) {
	eventId, _ := strconv.Atoi(urlParamAsString(r, "eventId"))

	response := struct {
		Success bool `json:"success"`
	}{
		false,
	}
	responseJSON, _ := json.Marshal(response)

	err := models.SetLightingEventFinished(int64(eventId), true)

	if err != nil {
		writeJsonResponse(w, 500, responseJSON)
		return
	}

	response.Success = true
	responseJSON, err = json.Marshal(response)
	writeJsonResponse(w, 200, responseJSON)
}

func SetWateringEventFinishedHandler(w http.ResponseWriter, r *http.Request) {
	eventId, _ := strconv.Atoi(urlParamAsString(r, "eventId"))

	response := struct {
		Success bool `json:"success"`
	}{
		false,
	}
	responseJSON, _ := json.Marshal(response)

	err := models.SetWateringEventFinished(int64(eventId), true)

	if err != nil {
		writeJsonResponse(w, 500, responseJSON)
		return
	}

	response.Success = true
	responseJSON, err = json.Marshal(response)
	writeJsonResponse(w, 200, responseJSON)
}

// CreateLightingEventHandler creates lighting event
func CreateLightingEventHandler(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)
	plantID, _ := strconv.Atoi(urlParamAsString(r, "plantId"))

	lightingEvent := models.LightingEvent{}
	json.Unmarshal(body, &lightingEvent)
	fmt.Println(lightingEvent)

	lightingEvent.PlantID = int64(plantID)
	lightingEvent.Finished = false

	// TODO: Validate

	response := struct {
		Success bool  `json:"success"`
		ID      int64 `json:"id"`
	}{
		false,
		0,
	}
	responseJSON, _ := json.Marshal(response)

	fmt.Println("@@@1")
	var err error
	response.ID, err = lightingEvent.Create()
	fmt.Println("@@@2")

	if err != nil {
		fmt.Println(err.Error())
		writeJsonResponse(w, 500, responseJSON)
		return
	}

	response.Success = true
	responseJSON, err = json.Marshal(response)
	writeJsonResponse(w, 200, responseJSON)
}

// DeleteLightingEventHandler deletes lighting devent
func DeleteLightingEventHandler(w http.ResponseWriter, r *http.Request) {
	eventID, _ := strconv.Atoi(urlParamAsString(r, "eventId"))

	err := models.DeleteLightingEventByID(int64(eventID))

	statusCode := 500
	response := struct {
		Success bool `json:"success"`
	}{
		false,
	}

	if err == nil {
		response.Success = true
		statusCode = 200
	}
	responseJSON, _ := json.Marshal(response)

	writeJsonResponse(w, statusCode, responseJSON)
}

// CreateWateringEventHandler creates watering event
func CreateWateringEventHandler(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)
	plantID, _ := strconv.Atoi(urlParamAsString(r, "plantId"))

	wateringEvent := models.WateringEvent{}
	json.Unmarshal(body, &wateringEvent)

	wateringEvent.PlantID = int64(plantID)
	wateringEvent.Finished = false

	// TODO: Validate

	response := struct {
		Success bool  `json:"success"`
		ID      int64 `json:"id"`
	}{
		false,
		0,
	}
	responseJSON, _ := json.Marshal(response)

	var err error
	response.ID, err = wateringEvent.Create()

	if err != nil {
		writeJsonResponse(w, 500, responseJSON)
		return
	}

	response.Success = true
	responseJSON, err = json.Marshal(response)
	writeJsonResponse(w, 200, responseJSON)
}

// DeleteWateringEventHandler deletes watering devent
func DeleteWateringEventHandler(w http.ResponseWriter, r *http.Request) {
	eventID, _ := strconv.Atoi(urlParamAsString(r, "eventId"))

	err := models.DeleteWateringEventByID(int64(eventID))

	statusCode := 500
	response := struct {
		Success bool `json:"success"`
	}{
		false,
	}

	if err == nil {
		response.Success = true
		statusCode = 200
	}
	responseJSON, _ := json.Marshal(response)

	writeJsonResponse(w, statusCode, responseJSON)
}
