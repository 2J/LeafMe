# Models

## Control Models

### Schedule

```
type Schedule struct {
	Time          time.Time `json:"time" validate:"required"`
	RepeatDays    int       `json:"repeat_days"`
	RepeatEndDate time.Time `json:"repeat_end_date"`
}
```

`Time`: The start time of the schedule
`RepeatDays`: It should repeat every X days
`RepeatEndDate`: It should stop repeating at this date

### LightingSchedule

```
type LightingSchedule struct {
	ID       int      `json:"id" validate:"required"`
	PlantID  int      `json:"plant_id" validate:"required"`
	Schedule Schedule `json:"schedule" validate:"required"`
	Length   int      `json:"length" validate:"required"`
	Active   bool     `json:"active" validate:"required"`
}
```

`ID`: ID
`PlantID`: Plant ID
`Schedule`: Schedule
`Length`: How long to power the lights in minutes
`Active`: Whether this schedule is active

### WateringSchedule

```
type WateringSchedule struct {
	ID       int      `json:"id" validate:"required"`
	PlantID  int      `json:"plant_id" validate:"required"`
	Schedule Schedule `json:"schedule" validate:"required"`
	Amount   int      `json:"amount" validate:"required"`
	Active   bool     `json:"active" validate:"required"`
}
```

`ID`: ID
`PlantID`: Plant ID
`Schedule`: Schedule
`Amount`: How much water should be supplied in mL
`Active`: Whether this schedule is active


### LightingEvent

```
type LightingEvent struct {
	ID                 int       `json:"id" validate:"required"`
	PlantID            int       `json:"plant_id" validate:"required"`
	LightingScheduleID int       `json:"lighting_schedule_id" validate:"required"`
	StartTime          time.Time `json:"start_time"`
	Length             int       `json:"length" validate:"required"`
	Finished           bool      `json:"finished"`
}
```

`ID`: ID
`PlantID`: Plant ID
`LightingScheduleID`: Which lighting schedule this event was generated from
`StartTime`: When this event starts
`Length`: How long lights should be powered in minutes
`Finished`: Whether this event has been processed

### WateringEvent

```
type WateringEvent struct {
	ID                 int       `json:"id" validate:"required"`
	PlantID            int       `json:"plant_id" validate:"required"`
	WateringScheduleID int       `json:"watering_schedule_id" validate:"required"`
	StartTime          time.Time `json:"start_time"`
	Amount             int       `json:"amount" validate:"required"`
	Finished           bool      `json:"finished"`
}
```

`ID`: ID
`PlantID`: Plant ID
`WateringScheduleID`: Which watering schedule this event was generated from
`StartTime`: When this event starts
`Amount`: How much water should be supplied in mL
`Finished`: Whether this event has been processed