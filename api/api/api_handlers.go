package api

import (
	"encoding/json"
	"net/http"
)

func IndexGetHandler(w http.ResponseWriter, r *http.Request) {
	response := "Just LeafMe alone!"

	responseJson, err := json.Marshal(response)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJson)
}
