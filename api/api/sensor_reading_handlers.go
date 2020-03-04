package api

import (
	"encoding/json"
	"github.com/2J/LeafMe/api/models"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	"net/http"
	"strconv"
	"time"
)

// GetLatestSensorReadingsHandler TODO
func GetLatestSensorReadingsHandler(w http.ResponseWriter, r *http.Request) {
	plantID, _ := strconv.Atoi(urlParamAsString(r, "plantID"))

	response := struct {
		SoilMoisture       models.SensorReading `json:"soil_moisture"`
		Brightness         models.SensorReading `json:"brightness"`
		AmbientTemperature models.SensorReading `json:"ambient_temperature"`
		AmbientHumidity    models.SensorReading `json:"ambient_humidity"`
		PumpStatus         models.SensorReading `json:"pump_status"`
		LightStatus        models.SensorReading `json:"light_status"`
		TankLevel          models.SensorReading `json:"tank_level"`
	}{}

	var err error

	response.SoilMoisture, err = models.GetLatestSensorReadingByType(int64(plantID), "SOIL_MOISTURE")
	if err != nil {
		writeErrorResponse(w, 500, "Failed getting soil moisture: "+err.Error())
		return
	}

	response.Brightness, err = models.GetLatestSensorReadingByType(int64(plantID), "BRIGHTNESS")
	if err != nil {
		writeErrorResponse(w, 500, "Failed getting brightness: "+err.Error())
		return
	}

	response.AmbientTemperature, err = models.GetLatestSensorReadingByType(int64(plantID), "AMBIENT_TEMPERATURE")
	if err != nil {
		writeErrorResponse(w, 500, "Failed getting temperature: "+err.Error())
		return
	}

	response.AmbientHumidity, err = models.GetLatestSensorReadingByType(int64(plantID), "AMBIENT_HUMIDITY")
	if err != nil {
		writeErrorResponse(w, 500, "Failed getting humidity: "+err.Error())
		return
	}

	response.PumpStatus, err = models.GetLatestSensorReadingByType(int64(plantID), "PUMP_STATUS")
	if err != nil {
		writeErrorResponse(w, 500, "Failed getting humidity: "+err.Error())
		return
	}

	response.LightStatus, err = models.GetLatestSensorReadingByType(int64(plantID), "LIGHT_STATUS")
	if err != nil {
		writeErrorResponse(w, 500, "Failed getting humidity: "+err.Error())
		return
	}

	response.TankLevel, err = models.GetLatestSensorReadingByType(int64(plantID), "TANK_LEVEL")
	if err != nil {
		writeErrorResponse(w, 500, "Failed getting humidity: "+err.Error())
		return
	}

	responseJSON, _ := json.Marshal(response)

	writeJSONResponse(w, 200, responseJSON)
}

// GetLatestSensorReadingsForTypeHandler TODO
func GetLatestSensorReadingsForTypeHandler(w http.ResponseWriter, r *http.Request) {
	plantID, _ := strconv.Atoi(urlParamAsString(r, "plantID"))
	sensorType := urlParamAsString(r, "type")

	// Group into X hours
	groupInterval := 240 // Interval in mins
	numGroups := 6       // Number of groups

	minTime := time.Now().Add(-time.Duration(groupInterval*numGroups) * time.Minute)
	sensorReadings, err := models.GetLatestSensorReadingsByType(int64(plantID), sensorType, minTime)
	if err != nil {
		writeErrorResponse(w, 500, "582")
		return
	}

	latestTime := time.Now().Round(time.Minute)
	sensorIndex := 0

	res := []models.SensorReading{}

	for i := 0; i < numGroups; i++ {
		sensorGroup := []models.SensorReading{}
		for ; sensorIndex < len(sensorReadings); sensorIndex++ {
			if sensorReadings[sensorIndex].Time.Unix() < latestTime.Add(-time.Duration(groupInterval*(i+1))*time.Minute).Unix() {
				// Sensor reading is out of scope
				break
			}

			sensorGroup = append(sensorGroup, sensorReadings[sensorIndex])
		}

		// Get average of group
		var avg float64
		if len(sensorGroup) == 0 {
			avg = 0
		} else {
			for j := 0; j < len(sensorGroup); j++ {
				avg += sensorGroup[j].Value
			}
			avg = avg / float64(len(sensorGroup))
		}

		// Get time
		t := latestTime.Add(-time.Duration(groupInterval*i) * time.Minute)
		sensorReading := models.SensorReading{
			Time:  t,
			Value: avg,
		}

		// Add to response
		res = append(res, sensorReading)
	}

	responseJSON, err := json.Marshal(res)
	if err != nil {
		log.Error(err)
		writeErrorResponse(w, 500, "125")
		return
	}

	writeJSONResponse(w, 200, responseJSON)
}

// CreateSensorReadingsHandler TODO
func CreateSensorReadingsHandler(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)
	plantID, _ := strconv.Atoi(urlParamAsString(r, "plantID"))

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

		sensorReading.PlantID = int64(plantID)
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
		writeJSONResponse(w, 500, responseJSON)
		return
	}

	response.Success = true
	responseJSON, err = json.Marshal(response)
	writeJSONResponse(w, 200, responseJSON)
}
