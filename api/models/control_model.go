package models

import (
	"time"
)

// Schedule TODO
type Schedule struct {
	Time          time.Time `json:"time" validate:"required"`
	RepeatDays    int       `json:"repeat_days"`
	RepeatEndDate time.Time `json:"repeat_end_date"`
}

// LightingSchedule TODO
type LightingSchedule struct {
	ID       int      `json:"id" validate:"required"`
	PlantID  int      `json:"plant_id" validate:"required"`
	Schedule Schedule `json:"schedule" validate:"required"`
	Length   int      `json:"length" validate:"required"`
	Active   bool     `json:"active" validate:"required"`
}

// WateringSchedule TODO
type WateringSchedule struct {
	ID       int      `json:"id" validate:"required"`
	PlantID  int      `json:"plant_id" validate:"required"`
	Schedule Schedule `json:"schedule" validate:"required"`
	Amount   int      `json:"amount" validate:"required"`
	Active   bool     `json:"active" validate:"required"`
}

// LightingEvent TODO
type LightingEvent struct {
	ID                 int       `json:"id" validate:"required"`
	PlantID            int       `json:"plant_id" validate:"required"`
	LightingScheduleID int       `json:"lighting_schedule_id" validate:"required"`
	StartTime          time.Time `json:"start_time"`
	Length             int       `json:"length" validate:"required"`
	Finished           bool      `json:"finished"`
}

// WateringEvent TODO
type WateringEvent struct {
	ID                 int       `json:"id" validate:"required"`
	PlantID            int       `json:"plant_id" validate:"required"`
	WateringScheduleID int       `json:"watering_schedule_id" validate:"required"`
	StartTime          time.Time `json:"start_time"`
	Amount             int       `json:"amount" validate:"required"`
	Finished           bool      `json:"finished"`
}
