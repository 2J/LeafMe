package api

import (
	"encoding/json"
	"github.com/2J/LeafMe/api/models"
	"github.com/2J/LeafMe/api/pusher"
	"io/ioutil"
	"net/http"
	"strconv"
)

// UpdatePushTokenHandler TODO
func UpdatePushTokenHandler(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)

	type PushTokenUpdateForm struct {
		PlantID   int    `json:"plant_id"`
		PushToken string `json:"push_token"`
	}
	pushTokenUpdateForm := PushTokenUpdateForm{}
	json.Unmarshal(body, &pushTokenUpdateForm)

	// Make sure plant exists
	var plant models.Plant
	err := plant.GetByID(pushTokenUpdateForm.PlantID)
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

	err = models.UpdatePlantPushToken(pushTokenUpdateForm.PlantID, pushTokenUpdateForm.PushToken)

	if err != nil {
		writeJsonResponse(w, 500, responseJSON)
		return
	}

	response.Success = true
	responseJSON, err = json.Marshal(response)
	writeJsonResponse(w, 200, responseJSON)
}

// SendPushNotificationHandler TODO
func SendPushNotificationHandler(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)
	plantID, _ := strconv.Atoi(urlParamAsString(r, "plantId"))

	type PushNotificationForm struct {
		Title string            `json:"title"`
		Body  string            `json:"body"`
		Data  map[string]string `json:"data"`
	}
	pushNotificationForm := PushNotificationForm{}
	json.Unmarshal(body, &pushNotificationForm)

	// Make sure plant exists
	var plant models.Plant
	err := plant.GetByID(plantID)
	if err != nil {
		writeErrorResponse(w, 404, err.Error())
		return
	}

	response := struct {
		Success      bool   `json:"success"`
		ErrorMessage string `json:"error"`
	}{
		false,
		"",
	}

	notification := pusher.Notification{
		Title: pushNotificationForm.Title,
		Body:  pushNotificationForm.Body,
		Data:  pushNotificationForm.Data,
	}
	err = pusher.PushNotification(plantID, notification)

	if err != nil {
		response.ErrorMessage = err.Error()
		responseJSON, _ := json.Marshal(response)
		writeJsonResponse(w, 500, responseJSON)
		return
	}

	response.Success = true
	responseJSON, err := json.Marshal(response)
	writeJsonResponse(w, 200, responseJSON)
}
