package models

import (
	"time"
)

// LightingEvent TODO
type LightingEvent struct {
	ID                 int       `json:"id" validate:"required"`
	PlantID            int       `json:"plant_id" validate:"required"`
	LightingScheduleID int       `json:"lighting_schedule_id" validate:"required"`
	StartTime          time.Time `json:"start_time"`
	Length             int       `json:"length" validate:"required"`
	Finished           bool      `json:"finished"`
}
