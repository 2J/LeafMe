package api

import (
	"encoding/json"
	"github.com/2J/LeafMe/api/models"
	"net/http"
	"strconv"
)

func GetSchedulesByPlantIdHandler(w http.ResponseWriter, r *http.Request) {
	plantId, _ := strconv.Atoi(urlParamAsString(r, "plantId"))

	lightingSchedules, err := models.GetLightingSchedulesByPlantId(plantId)
	if err != nil {
		panic(err.Error())
	}
	wateringSchedules, err := models.GetWateringSchedulesByPlantId(plantId)
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

	responseJson, err := json.Marshal(response)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJson)
}
