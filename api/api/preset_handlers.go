package api

import (
	"encoding/json"
	"github.com/2J/LeafMe/api/models"
	"net/http"
	"strconv"
)

// GetPresetsByTypeHandler TODO
func GetPresetsByTypeHandler(w http.ResponseWriter, r *http.Request) {
	presetType := urlParamAsString(r, "presetType")

	presets, err := models.GetPresetsByType(presetType)

	responseJSON, err := json.Marshal(presets)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJSONResponse(w, 200, responseJSON)
}

// GetPresetByIDHandler TODO
func GetPresetByIDHandler(w http.ResponseWriter, r *http.Request) {
	presetID, _ := strconv.Atoi(urlParamAsString(r, "presetID"))

	preset := models.Preset{}

	err := preset.GetByID(int64(presetID))

	if err != nil {
		writeErrorResponse(w, 500, "Preset not found")
		return
	}

	responseJSON, err := json.Marshal(preset)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJSONResponse(w, 200, responseJSON)
}
