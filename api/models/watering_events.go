package models

import (
	"time"
)

// WateringEvent TODO
type WateringEvent struct {
	ID                 int       `json:"id" validate:"required"`
	PlantID            int       `json:"plant_id" validate:"required"`
	WateringScheduleID int       `json:"watering_schedule_id" validate:"required"`
	StartTime          time.Time `json:"start_time"`
	Amount             int       `json:"amount" validate:"required"`
	Finished           bool      `json:"finished"`
}
