package models

import (
	"time"
)

type Test struct {
	ID         int       `son:"id" validate:"required"`
	SomeNumber int       `json:"some_number" validate:"required"`
	SomeString string    `json:"some_string" validate:"required"`
	SomeDate   time.Time `json:"some_date"`
	SomeFloat  float64   `json:"some_float" validate:"required"`
	SomeBool   bool      `json:"some_bool"`
	SomeArray  []int     `json:"some_array"`
}
