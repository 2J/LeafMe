package api

import (
	"encoding/json"
	"github.com/2J/LeafMe/api/models"
	"net/http"
	"strconv"
)

func GetPresetsByType(w http.ResponseWriter, r *http.Request) {
	presetType := urlParamAsString(r, "presetType")

	presets, err := models.GetPresetsByType(presetType)

	responseJson, err := json.Marshal(presets)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJson)
}

func GetPresetById(w http.ResponseWriter, r *http.Request) {
	presetId, _ := strconv.Atoi(urlParamAsString(r, "presetId"))

	preset := models.Preset{}

	err := preset.GetById(presetId)

	if err != nil {
		writeErrorResponse(w, 500, "Preset not found")
		return
	}

	responseJson, err := json.Marshal(preset)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJson)
}
