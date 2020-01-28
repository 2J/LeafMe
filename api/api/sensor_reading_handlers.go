package api

import (
	"encoding/json"
	"github.com/2J/LeafMe/api/models"
	"net/http"
	"strconv"
)

func GetLatestSensorReadings(w http.ResponseWriter, r *http.Request) {
	plantId, _ := strconv.Atoi(urlParamAsString(r, "plantId"))

	response := struct {
		SoilMoisture       models.SensorReading `json:"soil_moisture"`
		Brightness         models.SensorReading `json:"brightness"`
		AmbientTemperature models.SensorReading `json:"ambient_temperature"`
		AmbientHumidity    models.SensorReading `json:"ambient_humidity"`
	}{}

	var err error

	response.SoilMoisture, err = models.GetLatestSensorReadingByType(plantId, "SOIL_MOISTURE")
	if err != nil {
		writeErrorResponse(w, 500, "Failed getting soil moisture: "+err.Error())
		return
	}

	response.Brightness, err = models.GetLatestSensorReadingByType(plantId, "BRIGHTNESS")
	if err != nil {
		writeErrorResponse(w, 500, "Failed getting brightness: "+err.Error())
		return
	}

	response.AmbientTemperature, err = models.GetLatestSensorReadingByType(plantId, "AMBIENT_TEMPERATURE")
	if err != nil {
		writeErrorResponse(w, 500, "Failed getting temperature: "+err.Error())
		return
	}

	response.AmbientHumidity, err = models.GetLatestSensorReadingByType(plantId, "AMBIENT_HUMIDITY")
	if err != nil {
		writeErrorResponse(w, 500, "Failed getting humidity: "+err.Error())
		return
	}

	responseJson, _ := json.Marshal(response)

	writeJsonResponse(w, 200, responseJson)
}

func GetLatestSensorReadingsForType(w http.ResponseWriter, r *http.Request) {
	plantId, _ := strconv.Atoi(urlParamAsString(r, "plantId"))
	sensorType := urlParamAsString(r, "type")

	sensorReadings, err := models.GetLatestSensorReadingsByType(plantId, sensorType)

	responseJson, err := json.Marshal(sensorReadings)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJson)
}
