package api

import (
	"encoding/json"
	"github.com/2J/LeafMe/api/models"
	"io/ioutil"
	"net/http"
	"strconv"
)

func GetPlantByIdHandler(w http.ResponseWriter, r *http.Request) {
	plantId, _ := strconv.Atoi(urlParamAsString(r, "plantId"))

	plant := models.Plant{}

	err := plant.GetByID(int64(plantId))

	if err != nil {
		writeErrorResponse(w, 404, "Plant not found")
		return
	}

	responseJSON, err := json.Marshal(plant)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJSON)
}

func UpdatePlantNameHandler(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)
	plantID, _ := strconv.Atoi(urlParamAsString(r, "plantId"))

	type PlantUpdateForm struct {
		Name string `json:"name"`
	}
	plantUpdateForm := PlantUpdateForm{}
	json.Unmarshal(body, &plantUpdateForm)

	var plant models.Plant

	err := plant.GetByID(int64(plantID))
	if err != nil {
		writeErrorResponse(w, 404, err.Error())
		return
	}

	plant.Name = plantUpdateForm.Name

	// Validate
	err = plant.Validate()
	if err != nil {
		writeErrorResponse(w, 400, err.Error())
		return
	}

	response := struct {
		Success bool `json:"success"`
	}{
		false,
	}
	responseJSON, _ := json.Marshal(response)

	err = models.UpdatePlantName(int64(plantID), plant.Name)

	if err != nil {
		writeJsonResponse(w, 500, responseJSON)
		return
	}

	response.Success = true
	responseJSON, err = json.Marshal(response)
	writeJsonResponse(w, 200, responseJSON)
}

func UpdatePlantModeHandler(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)
	plantID, _ := strconv.Atoi(urlParamAsString(r, "plantId"))

	type PlantUpdateForm struct {
		Manual bool `json:"manual"`
	}
	plantUpdateForm := PlantUpdateForm{}
	json.Unmarshal(body, &plantUpdateForm)

	response := struct {
		Success bool `json:"success"`
	}{
		false,
	}
	responseJSON, _ := json.Marshal(response)

	err := models.UpdatePlantMode(int64(plantID), plantUpdateForm.Manual)

	if err != nil {
		writeJsonResponse(w, 500, responseJSON)
		return
	}

	response.Success = true
	responseJSON, err = json.Marshal(response)
	writeJsonResponse(w, 200, responseJSON)
}

func TogglePlantManualLightHandler(w http.ResponseWriter, r *http.Request) {
	plantID, _ := strconv.Atoi(urlParamAsString(r, "plantId"))

	plant := models.Plant{}
	err := plant.GetByID(int64(plantID))

	if err != nil {
		writeErrorResponse(w, 404, "Plant not found")
		return
	}

	response := struct {
		Success bool `json:"success"`
	}{
		false,
	}
	responseJSON, _ := json.Marshal(response)

	err = models.UpdatePlantManualLight(int64(plantID), !plant.ManualLight)

	if err != nil {
		writeJsonResponse(w, 500, responseJSON)
		return
	}

	response.Success = true
	responseJSON, err = json.Marshal(response)
	writeJsonResponse(w, 200, responseJSON)
}

func UpdatePlantManualWaterHandler(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)
	plantID, _ := strconv.Atoi(urlParamAsString(r, "plantId"))

	type PlantUpdateForm struct {
		Amount int `json:"amount"`
	}
	plantUpdateForm := PlantUpdateForm{}
	json.Unmarshal(body, &plantUpdateForm)

	var plant models.Plant
	err := plant.GetByID(int64(plantID))
	if err != nil {
		writeErrorResponse(w, 404, err.Error())
		return
	}

	response := struct {
		Success bool `json:"success"`
	}{
		false,
	}
	responseJSON, _ := json.Marshal(response)

	err = models.UpdatePlantManualWater(int64(plantID), plant.ManualWater+plantUpdateForm.Amount)

	if err != nil {
		writeJsonResponse(w, 500, responseJSON)
		return
	}

	response.Success = true
	responseJSON, err = json.Marshal(response)
	writeJsonResponse(w, 200, responseJSON)
}
