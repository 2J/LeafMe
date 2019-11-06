package api

import "fmt"
import "strconv"
import "net/http"
import "github.com/gorilla/mux"

// Common validation filter for all bulk requests.
func validateBulkRequest(w http.ResponseWriter, r *http.Request) (isValid bool) {
	cl, err := strconv.ParseInt(r.Header.Get("Content-Length"), 10, 64)
	if err != nil {
		// if Content-Length wasn't a valid integer, then this definitely isn't a valid request
		return false
	}

	// magic number of max request size by Content-Length header
	var maxContentLength int64 = 20000000
	if cl > maxContentLength {
		writeErrorResponse(w, 400, fmt.Sprintf("Cannot fulfill bulk request: Content-Length exceeds maximum of %d", maxContentLength))
		return false
	}

	return true
}

// Helper to that a URL param (by its name in the defined route) to an int. ok == false
// if the parameter is undefined.
func urlParamAsInt(r *http.Request, paramName string) (parsedVal int, ok bool) {
	vars := mux.Vars(r)

	// TODO if paramName isn't defined, throw an internal error, because it's a bug in the route?
	paramVal := vars[paramName]
	convertedVal, err := strconv.ParseInt(paramVal, 10, 32)
	if err != nil {
		return 0, false
	}
	return int(convertedVal), true
}

func urlParamAsString(r *http.Request, paramName string) (val string) {
	vars := mux.Vars(r)
	val = vars[paramName]
	return val
}

// Check if a given querystring paramName is set in the request r.
func queryParamIsSet(r *http.Request, paramName string) (paramIsSet bool) {
	vals := r.URL.Query()
	_, paramIsSet = vals[paramName]
	return paramIsSet
}

// Helper for getting int values of keys in the URL querystring. Returns ok=false
// if key is not present or if value cannot be converted to int.
func queryStringParamAsInt(r *http.Request, paramName string) (parsedVal int, ok bool) {
	vals := r.URL.Query()
	paramVal, ok := vals[paramName]
	if !ok {
		return 0, false
	}

	// Just take the first value for these; if we need to do something more sophisticated
	// where you can have more than one value set, then this isn't the helper function
	// we're looking for.
	convertedVal, err := strconv.ParseInt(paramVal[0], 10, 32)
	if err != nil {
		return 0, false
	}
	return int(convertedVal), true
}

// Helper for getting uint values of keys in the URL querystring. Returns ok=false
// if key is not present or if value cannot be converted to uint.
func queryStringParamAsUInt(r *http.Request, paramName string) (parsedVal uint, ok bool) {
	vals := r.URL.Query()
	paramVal, ok := vals[paramName]
	if !ok {
		return 0, false
	}

	// Just take the first value for these; if we need to do something more sophisticated
	// where you can have more than one value set, then this isn't the helper function
	// we're looking for.
	convertedVal, err := strconv.ParseUint(paramVal[0], 10, 32)
	if err != nil {
		return 0, false
	}
	return uint(convertedVal), true
}
