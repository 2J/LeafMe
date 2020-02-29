package api

import (
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"io"
	"net/http"
	"time"
)

// NewServer TODO
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

// NewRouter TODO
func NewRouter() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/", addDefaultHeaders(IndexGetHandler)).Methods("GET", "OPTIONS")

	// Plant handlers
	router.HandleFunc("/plant/{plantID}", addDefaultHeaders(GetPlantByIDHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/plant/{plantID}/manual/mode", addDefaultHeaders(UpdatePlantModeHandler)).Methods("POST", "OPTIONS")
	router.HandleFunc("/plant/{plantID}/manual/light", addDefaultHeaders(TogglePlantManualLightHandler)).Methods("POST", "OPTIONS")
	router.HandleFunc("/plant/{plantID}/manual/water", addDefaultHeaders(UpdatePlantManualWaterHandler)).Methods("POST", "OPTIONS")
	router.HandleFunc("/plant/{plantID}", addDefaultHeaders(UpdatePlantNameHandler)).Methods("POST", "OPTIONS")

	// Schedule handlers
	router.HandleFunc("/plant/{plantID}/schedules", addDefaultHeaders(GetSchedulesByPlantIDHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/plant/{plantID}/schedules/light/{scheduleID}", addDefaultHeaders(GetLightingScheduleByIDHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/plant/{plantID}/schedules/water/{scheduleID}", addDefaultHeaders(GetWateringScheduleByIDHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/plant/{plantID}/schedules/light/create", addDefaultHeaders(CreateLightingScheduleHandler)).Methods("POST", "OPTIONS")
	router.HandleFunc("/plant/{plantID}/schedules/water/create", addDefaultHeaders(CreateWateringScheduleHandler)).Methods("POST", "OPTIONS")
	router.HandleFunc("/plant/{plantID}/schedules/light/delete/{scheduleID}", addDefaultHeaders(DeleteLightingScheduleHandler)).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/plant/{plantID}/schedules/water/delete/{scheduleID}", addDefaultHeaders(DeleteWateringScheduleHandler)).Methods("DELETE", "OPTIONS")

	// Event handlers
	router.HandleFunc("/plant/{plantID}/events/light", addDefaultHeaders(CreateLightingEventHandler)).Methods("POST", "OPTIONS")
	router.HandleFunc("/plant/{plantID}/events/light/{eventID}", addDefaultHeaders(DeleteLightingEventHandler)).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/plant/{plantID}/schedules/light/{scheduleID}/events", addDefaultHeaders(GetLightingEventsByScheduleIDHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/plant/{plantID}/events/light/{eventID}", addDefaultHeaders(GetLightingEventByIDHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/plant/{plantID}/events/light", addDefaultHeaders(GetLightingEventsByPlantIDHandler)).Methods("GET", "OPTIONS")

	router.HandleFunc("/plant/{plantID}/events/water", addDefaultHeaders(CreateWateringEventHandler)).Methods("POST", "OPTIONS")
	router.HandleFunc("/plant/{plantID}/events/water/{eventID}", addDefaultHeaders(DeleteWateringEventHandler)).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/plant/{plantID}/schedules/water/{scheduleID}/events", addDefaultHeaders(GetWateringEventsByScheduleIDHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/plant/{plantID}/events/water/{eventID}", addDefaultHeaders(GetWateringEventByIDHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/plant/{plantID}/events/water", addDefaultHeaders(GetWateringEventsByPlantIDHandler)).Methods("GET", "OPTIONS")

	router.HandleFunc("/plant/{plantID}/events", addDefaultHeaders(GetEventsByPlantIDHandler)).Methods("GET", "OPTIONS")

	router.HandleFunc("/plant/{plantID}/events/light/{eventID}", addDefaultHeaders(SetLightingEventFinishedHandler)).Methods("POST", "OPTIONS")
	router.HandleFunc("/plant/{plantID}/events/water/{eventID}", addDefaultHeaders(SetWateringEventFinishedHandler)).Methods("POST", "OPTIONS")

	// Sensor handlers
	router.HandleFunc("/plant/{plantID}/sensors", addDefaultHeaders(GetLatestSensorReadingsHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/plant/{plantID}/sensors/history/{type}", addDefaultHeaders(GetLatestSensorReadingsForTypeHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/plant/{plantID}/sensors", addDefaultHeaders(CreateSensorReadingsHandler)).Methods("POST", "OPTIONS")

	// Preset handlers
	router.HandleFunc("/presets/type/{presetType}", addDefaultHeaders(GetPresetsByTypeHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/presets/{presetId}", addDefaultHeaders(GetPresetByIDHandler)).Methods("GET", "OPTIONS")

	// Notification handlers
	router.HandleFunc("/notification/pushtoken", addDefaultHeaders(UpdatePushTokenHandler)).Methods("POST", "OPTIONS")
	router.HandleFunc("/notification/plant/{plantID}", addDefaultHeaders(SendPushNotificationHandler)).Methods("POST", "OPTIONS")

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
