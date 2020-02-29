package api

import (
	"encoding/json"
	"github.com/2J/LeafMe/api/models"
	"io/ioutil"
	"net/http"
	"strconv"
)

// GetLightingScheduleByIDHandler TODO
func GetLightingScheduleByIDHandler(w http.ResponseWriter, r *http.Request) {
	//plantID, _ := strconv.Atoi(urlParamAsString(r, "plantID"))
	scheduleID, _ := strconv.Atoi(urlParamAsString(r, "scheduleID"))

	lightingSchedule := models.LightingSchedule{}
	err := lightingSchedule.GetByID(int64(scheduleID))

	if err != nil {
		writeErrorResponse(w, 500, "Failed to get: "+err.Error())
		return
	}

	responseJSON, err := json.Marshal(lightingSchedule)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJSONResponse(w, 200, responseJSON)
}

// GetWateringScheduleByIDHandler TODO
func GetWateringScheduleByIDHandler(w http.ResponseWriter, r *http.Request) {
	//plantID, _ := strconv.Atoi(urlParamAsString(r, "plantID"))
	scheduleID, _ := strconv.Atoi(urlParamAsString(r, "scheduleID"))

	wateringSchedule := models.WateringSchedule{}
	err := wateringSchedule.GetByID(int64(scheduleID))

	if err != nil {
		writeErrorResponse(w, 500, "Failed to get: "+err.Error())
		return
	}

	responseJSON, err := json.Marshal(wateringSchedule)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJSONResponse(w, 200, responseJSON)
}

// GetSchedulesByPlantIDHandler TODO
func GetSchedulesByPlantIDHandler(w http.ResponseWriter, r *http.Request) {
	plantID, _ := strconv.Atoi(urlParamAsString(r, "plantID"))

	lightingSchedules, err := models.GetLightingSchedulesByPlantID(int64(plantID))
	if err != nil {
		panic(err.Error())
	}
	wateringSchedules, err := models.GetWateringSchedulesByPlantID(int64(plantID))
	if err != nil {
		panic(err.Error())
	}

	response := struct {
		LightingSchedules []models.LightingSchedule `json:"lighting_schedules"`
		WateringSchedules []models.WateringSchedule `json:"watering_schedules"`
	}{
		lightingSchedules,
		wateringSchedules,
	}

	responseJSON, err := json.Marshal(response)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJSONResponse(w, 200, responseJSON)
}

// CreateLightingScheduleHandler TODO
func CreateLightingScheduleHandler(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)
	plantID, _ := strconv.Atoi(urlParamAsString(r, "plantID"))

	lightingSchedule := models.LightingSchedule{}
	json.Unmarshal(body, &lightingSchedule)

	lightingSchedule.PlantID = int64(plantID)

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
	response.ID, err = lightingSchedule.Create()

	if err != nil {
		writeJSONResponse(w, 500, responseJSON)
		return
	}

	response.Success = true
	responseJSON, err = json.Marshal(response)
	writeJSONResponse(w, 200, responseJSON)
}

// DeleteLightingScheduleHandler TODO
func DeleteLightingScheduleHandler(w http.ResponseWriter, r *http.Request) {
	scheduleID, _ := strconv.Atoi(urlParamAsString(r, "scheduleID"))

	err := models.DeleteLightingSchedule(int64(scheduleID))

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

// CreateWateringScheduleHandler TODO
func CreateWateringScheduleHandler(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)
	plantID, _ := strconv.Atoi(urlParamAsString(r, "plantID"))

	wateringSchedule := models.WateringSchedule{}
	json.Unmarshal(body, &wateringSchedule)

	wateringSchedule.PlantID = int64(plantID)

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
	response.ID, err = wateringSchedule.Create()

	if err != nil {
		writeJSONResponse(w, 500, responseJSON)
		return
	}

	response.Success = true
	responseJSON, err = json.Marshal(response)
	writeJSONResponse(w, 200, responseJSON)
}

// DeleteWateringScheduleHandler TODO
func DeleteWateringScheduleHandler(w http.ResponseWriter, r *http.Request) {
	scheduleID, _ := strconv.Atoi(urlParamAsString(r, "scheduleID"))

	err := models.DeleteWateringSchedule(int64(scheduleID))

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
