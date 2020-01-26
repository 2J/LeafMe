package models

import (
	"time"
)

// Schedule : Common schedule for lighting and watering
type Schedule struct {
	Time          *time.Time `json:"time" validate:"required"`
	RepeatDays    int        `json:"repeat_days"`
	RepeatEndDate *time.Time `json:"repeat_end_date"`
}
