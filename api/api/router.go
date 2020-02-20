package api

import (
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"io"
	"net/http"
	"time"
)

func NewServer(listenAddress string, httpLogger io.Writer) (server *http.Server, err error) {
	router := NewRouter()

	server = &http.Server{
		Handler:      handlers.LoggingHandler(httpLogger, router),
		Addr:         listenAddress,
		WriteTimeout: 60 * time.Minute,
		ReadTimeout:  60 * time.Minute,
	}

	return server, nil
}

func NewRouter() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/", addDefaultHeaders(IndexGetHandler)).Methods("GET", "OPTIONS")

	// Plant handlers
	router.HandleFunc("/plant/{plantId}", addDefaultHeaders(GetPlantByIdHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/plant/{plantId}", addDefaultHeaders(UpdatePlantHandler)).Methods("POST", "OPTIONS")

	// Schedule handlers
	router.HandleFunc("/plant/{plantId}/schedules", addDefaultHeaders(GetSchedulesByPlantIdHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/plant/{plantId}/schedules/light/{scheduleId}", addDefaultHeaders(GetLightingScheduleByIdHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/plant/{plantId}/schedules/water/{scheduleId}", addDefaultHeaders(GetWateringScheduleByIdHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/plant/{plantId}/schedules/light/create", addDefaultHeaders(CreateLightingScheduleHandler)).Methods("POST", "OPTIONS")
	router.HandleFunc("/plant/{plantId}/schedules/water/create", addDefaultHeaders(CreateWateringScheduleHandler)).Methods("POST", "OPTIONS")
	router.HandleFunc("/plant/{plantId}/schedules/light/delete/{scheduleId}", addDefaultHeaders(DeleteLightingScheduleHandler)).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/plant/{plantId}/schedules/water/delete/{scheduleId}", addDefaultHeaders(DeleteWateringScheduleHandler)).Methods("DELETE", "OPTIONS")

	// Event handlers
	router.HandleFunc("/plant/{plantId}/schedules/light/{scheduleId}/events", addDefaultHeaders(GetLightingEventsByScheduleIdHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/plant/{plantId}/events/light/{eventId}", addDefaultHeaders(GetLightingEventByIdHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/plant/{plantId}/events/light", addDefaultHeaders(GetLightingEventsByPlantIdHandler)).Methods("GET", "OPTIONS")

	router.HandleFunc("/plant/{plantId}/schedules/water/{scheduleId}/events", addDefaultHeaders(GetWateringEventsByScheduleIdHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/plant/{plantId}/events/water/{eventId}", addDefaultHeaders(GetWateringEventByIdHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/plant/{plantId}/events/water", addDefaultHeaders(GetWateringEventsByPlantIdHandler)).Methods("GET", "OPTIONS")

	router.HandleFunc("/plant/{plantId}/events", addDefaultHeaders(GetEventsByPlantIdHandler)).Methods("GET", "OPTIONS")

	router.HandleFunc("/plant/{plantId}/events/light/{eventId}", addDefaultHeaders(SetLightingEventFinishedHandler)).Methods("POST", "OPTIONS")
	router.HandleFunc("/plant/{plantId}/events/water/{eventId}", addDefaultHeaders(SetWateringEventFinishedHandler)).Methods("POST", "OPTIONS")

	// Sensor handlers
	router.HandleFunc("/plant/{plantId}/sensors", addDefaultHeaders(GetLatestSensorReadingsHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/plant/{plantId}/sensors/history/{type}", addDefaultHeaders(GetLatestSensorReadingsForTypeHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/plant/{plantId}/sensors", addDefaultHeaders(CreateSensorReadingsHandler)).Methods("POST", "OPTIONS")

	// Preset handlers
	router.HandleFunc("/presets/type/{presetType}", addDefaultHeaders(GetPresetsByTypeHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/presets/{presetId}", addDefaultHeaders(GetPresetByIdHandler)).Methods("GET", "OPTIONS")

	return router
}

func addDefaultHeaders(fn http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if origin := r.Header.Get("Origin"); origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.Header().Set("Access-Control-Allow-Headers",
				"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		}
		// Stop here if its Preflighted OPTIONS request
		if r.Method == "OPTIONS" {
			return
		}

		fn(w, r)
	}
}
