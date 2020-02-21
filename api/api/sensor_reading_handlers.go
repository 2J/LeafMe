package api

import (
	"encoding/json"
	"github.com/2J/LeafMe/api/models"
	"io/ioutil"
	"net/http"
	"strconv"
	"time"
)

func GetLatestSensorReadingsHandler(w http.ResponseWriter, r *http.Request) {
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

	responseJSON, _ := json.Marshal(response)

	writeJsonResponse(w, 200, responseJSON)
}

func GetLatestSensorReadingsForTypeHandler(w http.ResponseWriter, r *http.Request) {
	plantId, _ := strconv.Atoi(urlParamAsString(r, "plantId"))
	sensorType := urlParamAsString(r, "type")

	sensorReadings, err := models.GetLatestSensorReadingsByType(plantId, sensorType)

	responseJSON, err := json.Marshal(sensorReadings)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJSON)
}

func CreateSensorReadingsHandler(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)
	plantID, _ := strconv.Atoi(urlParamAsString(r, "plantId"))

	type SensorReadingForm struct {
		SensorType string  `json:"type"`
		Value      float64 `json:"value"`
	}
	sensorValues := []SensorReadingForm{}
	json.Unmarshal(body, &sensorValues)

	if len(sensorValues) == 0 {
		writeErrorResponse(w, 400, "No sensor values")
		return
	}

	// Validate
	sensorReadings := []models.SensorReading{}
	for _, v := range sensorValues {
		sensorReading := models.SensorReading{}

		sensorReading.PlantID = plantID
		sensorReading.Time = time.Now()
		sensorReading.SensorType = v.SensorType
		sensorReading.Value = v.Value

		err := sensorReading.Validate()
		if err != nil {
			writeErrorResponse(w, 400, err.Error())
			return
		}

		sensorReadings = append(sensorReadings, sensorReading)
	}

	response := struct {
		Success bool `json:"success"`
	}{
		false,
	}
	responseJSON, _ := json.Marshal(response)

	var err error
	err = models.CreateSensorReadings(sensorReadings)

	if err != nil {
		writeJsonResponse(w, 500, responseJSON)
		return
	}

	response.Success = true
	responseJSON, err = json.Marshal(response)
	writeJsonResponse(w, 200, responseJSON)
}
