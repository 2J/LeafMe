package models

import (
	"database/sql"
	"errors"
	database "github.com/2J/LeafMe/api/db"
	_ "github.com/go-sql-driver/mysql" // MySQL driver
	"gopkg.in/guregu/null.v3"
	"time"
)

// WateringEvent TODO
type WateringEvent struct {
	ID                 int64     `json:"id" validate:"required"`
	PlantID            int64     `json:"plant_id" validate:"required"`
	WateringScheduleID null.Int  `json:"watering_schedule_id" validate:"required"`
	StartTime          time.Time `json:"start_time"`
	Amount             int       `json:"amount" validate:"required"`
	Finished           bool      `json:"finished"`
}

// Create TODO
func (wateringEvent *WateringEvent) Create() (int64, error) {
	db := database.Open()
	defer database.Close(db)

	insForm, err := db.Prepare("INSERT INTO wateringEvents (`plantId`, `startTime`, `amount`, `finished`) VALUES (?,?,?,?)")
	if err != nil {
		return 0, err
	}

	res, err := insForm.Exec(
		wateringEvent.PlantID,
		wateringEvent.StartTime,
		wateringEvent.Amount,
		wateringEvent.Finished,
	)

	if err != nil {
		return 0, err
	}

	id, err := res.LastInsertId()

	wateringEvent.ID = id

	return id, err
}

// CreateWateringEvents creates batch of watering events
func CreateWateringEvents(wateringEvents []WateringEvent) (err error) {
	db := database.Open()
	defer database.Close(db)

	query := "INSERT INTO wateringEvents (`plantId`, `wateringScheduleId`, `startTime`, `amount`, `finished`) VALUES "
	vals := []interface{}{}
	for i, v := range wateringEvents {
		if i > 0 {
			query += ","
		}
		query += "(?,?,?,?,?)"

		vals = append(vals, v.PlantID, v.WateringScheduleID, v.StartTime, v.Amount, v.Finished)
	}

	insForm, err := db.Prepare(query)
	if err != nil {
		return err
	}

	_, err = insForm.Exec(vals...)

	return err
}

// CreateWateringEvent creates a watering event
func (wateringSchedule *WateringSchedule) CreateWateringEvent() (err error) {
	// Create list of watering events
	wateringEvents := []WateringEvent{}

	// Create watering events until repeat ends
	t := *wateringSchedule.Schedule.Time
	for t.Equal(*wateringSchedule.Schedule.RepeatEndDate) || t.Before(*wateringSchedule.Schedule.RepeatEndDate) {
		wateringEvent := WateringEvent{}
		wateringEvent.PlantID = wateringSchedule.PlantID
		wateringEvent.WateringScheduleID = null.IntFrom(wateringSchedule.ID)
		wateringEvent.StartTime = t
		wateringEvent.Amount = wateringSchedule.Amount
		wateringEvent.Finished = false

		wateringEvents = append(wateringEvents, wateringEvent)

		t = t.AddDate(0, 0, wateringSchedule.Schedule.RepeatDays)
	}

	// Chunk watering events by 100 events each
	for i := 0; i < len(wateringEvents); i += 100 {
		chunk := wateringEvents[i:min(i+100, len(wateringEvents))]

		// Create events in database
		err = CreateWateringEvents(chunk)
		if err != nil {
			break
		}
	}

	return err
}

func (wateringEvent *WateringEvent) getRow(rows *sql.Rows) error {
	err := rows.Scan(
		&wateringEvent.ID,
		&wateringEvent.PlantID,
		&wateringEvent.WateringScheduleID,
		&wateringEvent.StartTime,
		&wateringEvent.Amount,
		&wateringEvent.Finished,
	)

	return err
}

// GetWateringEventsByScheduleID gets all watering events for schedule
func GetWateringEventsByScheduleID(scheduleID int64) ([]WateringEvent, error) {
	wateringEvent := WateringEvent{}
	res := []WateringEvent{}

	db := database.Open()
	defer database.Close(db)
	rows, err := db.Query("SELECT * FROM wateringEvents WHERE wateringScheduleId = ? ORDER BY startTime ASC", scheduleID)
	if err != nil {
		return res, err
	}
	defer rows.Close()

	for rows.Next() {
		wateringEvent.getRow(rows)

		if err != nil {
			return res, err
		}

		res = append(res, wateringEvent)
	}

	return res, nil
}

// GetWateringEventsByPlantID gets all events for plant
func GetWateringEventsByPlantID(plantID int64) ([]WateringEvent, error) {
	wateringEvent := WateringEvent{}
	res := []WateringEvent{}

	db := database.Open()
	defer database.Close(db)
	rows, err := db.Query("SELECT * FROM wateringEvents WHERE plantId = ? ORDER BY startTime ASC", plantID)
	if err != nil {
		return res, err
	}
	defer rows.Close()

	for rows.Next() {
		wateringEvent.getRow(rows)

		if err != nil {
			return res, err
		}

		res = append(res, wateringEvent)
	}

	return res, nil
}

// GetByID gets watering event by ID
func (wateringEvent *WateringEvent) GetByID(id int64) error {
	db := database.Open()
	defer database.Close(db)
	rows, err := db.Query("SELECT * FROM wateringEvents WHERE id = ?", id)
	if err != nil {
		return err
	}
	defer rows.Close()

	found := false
	for rows.Next() {
		found = true
		err = wateringEvent.getRow(rows)

		if err != nil {
			return err
		}
	}

	if !found {
		return errors.New("Event not found")
	}

	return nil
}

// DeleteWateringEventsByScheduleID deletes watering events by schedule ID
func DeleteWateringEventsByScheduleID(scheduleID int64) error {
	db := database.Open()
	defer database.Close(db)

	delForm, err := db.Prepare("DELETE FROM wateringEvents WHERE wateringScheduleId = ?")
	if err != nil {
		return err
	}

	_, err = delForm.Exec(
		scheduleID,
	)

	return err
}

// DeleteWateringEventByID deletes watering events by ID
func DeleteWateringEventByID(eventID int64) error {
	db := database.Open()
	defer database.Close(db)

	delForm, err := db.Prepare("DELETE FROM wateringEvents WHERE id = ?")
	if err != nil {
		return err
	}

	_, err = delForm.Exec(
		eventID,
	)

	return err
}

// SetWateringEventFinished sets watering event to finished
func SetWateringEventFinished(eventID int64, finished bool) error {
	db := database.Open()
	defer database.Close(db)

	delForm, err := db.Prepare("UPDATE wateringEvents SET finished = ? WHERE id = ?")
	if err != nil {
		return err
	}

	_, err = delForm.Exec(
		finished,
		eventID,
	)

	return err
}
