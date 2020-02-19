package models

import (
	"database/sql"
	database "github.com/2J/LeafMe/api/db"
	_ "github.com/go-sql-driver/mysql"
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

func (wateringSchedule *WateringSchedule) CreateWateringEvents() (err error) {
	// Create list of watering events
	wateringEvents := []WateringEvent{}

	// Create watering events until repeat ends
	t := *wateringSchedule.Schedule.Time
	for t.Before(*wateringSchedule.Schedule.RepeatEndDate) {
		wateringEvent := WateringEvent{}
		wateringEvent.PlantID = wateringSchedule.PlantID
		wateringEvent.WateringScheduleID = wateringSchedule.ID
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

func GetWateringEventsByScheduleId(scheduleId int) ([]WateringEvent, error) {
	wateringEvent := WateringEvent{}
	res := []WateringEvent{}

	db := database.Open()
	defer database.Close(db)
	rows, err := db.Query("SELECT * FROM wateringEvents WHERE wateringScheduleId = ? ORDER BY startTime ASC", scheduleId)
	if err != nil {
		return res, err
	}

	for rows.Next() {
		wateringEvent.getRow(rows)

		if err != nil {
			return res, err
		}

		res = append(res, wateringEvent)
	}

	return res, nil
}

func GetWateringEventsByPlantId(plantId int) ([]WateringEvent, error) {
	wateringEvent := WateringEvent{}
	res := []WateringEvent{}

	db := database.Open()
	defer database.Close(db)
	rows, err := db.Query("SELECT * FROM wateringEvents WHERE plantId = ? ORDER BY startTime ASC", plantId)
	if err != nil {
		return res, err
	}

	for rows.Next() {
		wateringEvent.getRow(rows)

		if err != nil {
			return res, err
		}

		res = append(res, wateringEvent)
	}

	return res, nil
}

func (wateringEvent *WateringEvent) GetById(id int) error {
	db := database.Open()
	defer database.Close(db)
	rows, err := db.Query("SELECT * FROM wateringEvents WHERE id = ?", id)
	if err != nil {
		return err
	}

	for rows.Next() {
		err = wateringEvent.getRow(rows)

		if err != nil {
			return err
		}
	}

	return nil
}

func DeleteWateringEvents(scheduleId int) error {
	db := database.Open()
	defer database.Close(db)

	delForm, err := db.Prepare("DELETE FROM wateringEvents WHERE wateringScheduleId = ?")
	if err != nil {
		return err
	}

	_, err = delForm.Exec(
		scheduleId,
	)

	return err
}
