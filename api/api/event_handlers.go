package api

import (
	"encoding/json"
	"github.com/2J/LeafMe/api/models"
	"io/ioutil"
	"net/http"
	"strconv"
)

// GetLightingEventByIDHandler TODO
func GetLightingEventByIDHandler(w http.ResponseWriter, r *http.Request) {
	//plantID, _ := strconv.Atoi(urlParamAsString(r, "plantID"))
	eventID, _ := strconv.Atoi(urlParamAsString(r, "eventID"))

	lightingEvent := models.LightingEvent{}
	err := lightingEvent.GetByID(int64(eventID))

	if err != nil {
		writeErrorResponse(w, 500, "Failed to get: "+err.Error())
		return
	}

	responseJSON, err := json.Marshal(lightingEvent)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJSONResponse(w, 200, responseJSON)
}

// GetLightingEventsByScheduleIDHandler TODO
func GetLightingEventsByScheduleIDHandler(w http.ResponseWriter, r *http.Request) {
	scheduleID, _ := strconv.Atoi(urlParamAsString(r, "scheduleID"))

	lightingEvents, err := models.GetLightingEventsByScheduleID(int64(scheduleID))
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
	writeJSONResponse(w, 200, responseJSON)
}

// GetLightingEventsByPlantIDHandler TODO
func GetLightingEventsByPlantIDHandler(w http.ResponseWriter, r *http.Request) {
	plantID, _ := strconv.Atoi(urlParamAsString(r, "plantID"))

	lightingEvents, err := models.GetLightingEventsByPlantID(int64(plantID))
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
	writeJSONResponse(w, 200, responseJSON)
}

// GetWateringEventByIDHandler TODO
func GetWateringEventByIDHandler(w http.ResponseWriter, r *http.Request) {
	//plantID, _ := strconv.Atoi(urlParamAsString(r, "plantID"))
	eventID, _ := strconv.Atoi(urlParamAsString(r, "eventID"))

	wateringEvent := models.WateringEvent{}
	err := wateringEvent.GetByID(int64(eventID))

	if err != nil {
		writeErrorResponse(w, 500, "Failed to get: "+err.Error())
		return
	}

	responseJSON, err := json.Marshal(wateringEvent)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJSONResponse(w, 200, responseJSON)
}

// GetWateringEventsByScheduleIDHandler TODO
func GetWateringEventsByScheduleIDHandler(w http.ResponseWriter, r *http.Request) {
	scheduleID, _ := strconv.Atoi(urlParamAsString(r, "scheduleID"))

	wateringEvents, err := models.GetWateringEventsByScheduleID(int64(scheduleID))
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
	writeJSONResponse(w, 200, responseJSON)
}

// GetWateringEventsByPlantIDHandler TODO
func GetWateringEventsByPlantIDHandler(w http.ResponseWriter, r *http.Request) {
	plantID, _ := strconv.Atoi(urlParamAsString(r, "plantID"))

	wateringEvents, err := models.GetWateringEventsByPlantID(int64(plantID))
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
	writeJSONResponse(w, 200, responseJSON)
}

// GetEventsByPlantIDHandler TODO
func GetEventsByPlantIDHandler(w http.ResponseWriter, r *http.Request) {
	plantID, _ := strconv.Atoi(urlParamAsString(r, "plantID"))

	lightingEvents, err := models.GetLightingEventsByPlantID(int64(plantID))
	if err != nil {
		panic(err.Error())
	}
	wateringEvents, err := models.GetWateringEventsByPlantID(int64(plantID))
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
	writeJSONResponse(w, 200, responseJSON)
}

// SetLightingEventFinishedHandler TODO
func SetLightingEventFinishedHandler(w http.ResponseWriter, r *http.Request) {
	eventID, _ := strconv.Atoi(urlParamAsString(r, "eventID"))

	response := struct {
		Success bool `json:"success"`
	}{
		false,
	}
	responseJSON, _ := json.Marshal(response)

	err := models.SetLightingEventFinished(int64(eventID), true)

	if err != nil {
		writeJSONResponse(w, 500, responseJSON)
		return
	}

	response.Success = true
	responseJSON, err = json.Marshal(response)
	writeJSONResponse(w, 200, responseJSON)
}

// SetWateringEventFinishedHandler TODO
func SetWateringEventFinishedHandler(w http.ResponseWriter, r *http.Request) {
	eventID, _ := strconv.Atoi(urlParamAsString(r, "eventID"))

	response := struct {
		Success bool `json:"success"`
	}{
		false,
	}
	responseJSON, _ := json.Marshal(response)

	err := models.SetWateringEventFinished(int64(eventID), true)

	if err != nil {
		writeJSONResponse(w, 500, responseJSON)
		return
	}

	response.Success = true
	responseJSON, err = json.Marshal(response)
	writeJSONResponse(w, 200, responseJSON)
}

// CreateLightingEventHandler creates lighting event
func CreateLightingEventHandler(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)
	plantID, _ := strconv.Atoi(urlParamAsString(r, "plantID"))

	lightingEvent := models.LightingEvent{}
	json.Unmarshal(body, &lightingEvent)

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

	var err error
	response.ID, err = lightingEvent.Create()

	if err != nil {
		writeJSONResponse(w, 500, responseJSON)
		return
	}

	response.Success = true
	responseJSON, err = json.Marshal(response)
	writeJSONResponse(w, 200, responseJSON)
}

// DeleteLightingEventHandler deletes lighting devent
func DeleteLightingEventHandler(w http.ResponseWriter, r *http.Request) {
	eventID, _ := strconv.Atoi(urlParamAsString(r, "eventID"))

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

	writeJSONResponse(w, statusCode, responseJSON)
}

// CreateWateringEventHandler creates watering event
func CreateWateringEventHandler(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)
	plantID, _ := strconv.Atoi(urlParamAsString(r, "plantID"))

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
		writeJSONResponse(w, 500, responseJSON)
		return
	}

	response.Success = true
	responseJSON, err = json.Marshal(response)
	writeJSONResponse(w, 200, responseJSON)
}

// DeleteWateringEventHandler deletes watering devent
func DeleteWateringEventHandler(w http.ResponseWriter, r *http.Request) {
	eventID, _ := strconv.Atoi(urlParamAsString(r, "eventID"))

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

	writeJSONResponse(w, statusCode, responseJSON)
}
