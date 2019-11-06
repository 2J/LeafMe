package api

import "encoding/json"
import "net/http"
import "strings"
import "math/rand"
import "time"

func init() {
	rand.Seed(time.Now().UnixNano())
}

// Helper for sending a non-error response
func writeJsonResponse(w http.ResponseWriter, statusCode int, jsonBody []byte) {
	w.Header().Set("Content-Type", "application/json")

	w.WriteHeader(statusCode)
	w.Write(jsonBody)
}

type jsonProblem struct {
	Status int    `json:"status"`
	Title  string `json:"title"`
	Detail string `json:"detail"`
}

// Helper for writing an error message to a response
func writeErrorResponse(w http.ResponseWriter, statusCode int, errorDetail string) {
	w.Header().Set("Content-Type", "application/problem+json")

	w.WriteHeader(statusCode)

	bodyStruct := &jsonProblem{Status: statusCode, Title: http.StatusText(statusCode), Detail: errorDetail}
	jsonBody, err := json.Marshal(bodyStruct)
	if err != nil {
		// let's hope this never happens, because that would be ironic
		w.WriteHeader(500)
		return
	}

	w.Write(jsonBody)

	return
}

func writeFileResponse(w http.ResponseWriter, statusCode int, file []byte) {
	w.WriteHeader(statusCode)
	w.Write(file)
}

// Helper for writing an HTTP JSON error with the correct HTTP semantics based on errors returned from
// Business Layer Client.
func httpErrorIfError(w http.ResponseWriter, err error) (responseWasWritten bool) {
	if err == nil {
		return false
	}

	errText := err.Error()

	// presence of this magic string in the error text should mean a 404
	if strings.Index(errText, "sql: no rows in result set") >= 0 {
		writeErrorResponse(w, 404, "Requested resource ID not found.")
		return true
	}

	// TODO actually implement a type switch etc. to do the correct handling
	writeErrorResponse(w, 500, "An error occurred while processing the request: "+errText)
	return true
}

func httpErrorHandler(statusCode int, message string) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		writeErrorResponse(w, statusCode, message)
	}
}

func RandomString(n int) string {
	letterRunes := []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}
