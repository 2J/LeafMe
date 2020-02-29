package api

import (
	"encoding/json"
	"github.com/2J/LeafMe/api/models"
	"net/http"
	"strconv"
)

func GetPresetsByTypeHandler(w http.ResponseWriter, r *http.Request) {
	presetType := urlParamAsString(r, "presetType")

	presets, err := models.GetPresetsByType(presetType)

	responseJSON, err := json.Marshal(presets)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJSON)
}

func GetPresetByIdHandler(w http.ResponseWriter, r *http.Request) {
	presetId, _ := strconv.Atoi(urlParamAsString(r, "presetId"))

	preset := models.Preset{}

	err := preset.GetByID(int64(presetId))

	if err != nil {
		writeErrorResponse(w, 500, "Preset not found")
		return
	}

	responseJSON, err := json.Marshal(preset)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJSON)
}
