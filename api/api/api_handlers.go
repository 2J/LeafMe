package api

import (
	//"encoding/base64"
	"encoding/json"
	//log "github.com/sirupsen/logrus"
	//"io/ioutil"
	"net/http"
)

var tokenKey string

func init() {
	tokenKey = "ASDGOIASNHDGLKAHBWLHa2y3y23y2lYASDOysaeylWYLKWJ"
}

func TestGetHandler(w http.ResponseWriter, r *http.Request) {
	responseString := "This is a test endpoint!!!"

	responseJson, err := json.Marshal(responseString)
	if err != nil {
		writeErrorResponse(w, 500, "125")
		return
	}
	writeJsonResponse(w, 200, responseJson)
}
