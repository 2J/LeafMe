package models

import (
	"database/sql"
	"errors"
	database "github.com/2J/LeafMe/api/db"
	_ "github.com/go-sql-driver/mysql" // MySQL driver
)

// WateringSchedule TODO
type WateringSchedule struct {
	ID       int64    `json:"id" validate:"required"`
	PlantID  int64    `json:"plant_id" validate:"required"`
	Schedule Schedule `json:"schedule" validate:"required"`
	Amount   int      `json:"amount" validate:"required"`
	Active   bool     `json:"active" validate:"required"`
}

// Validate TODO
func (wateringSchedule *WateringSchedule) Validate() (err error) {
	return err
}

// Create TODO
func (wateringSchedule *WateringSchedule) Create() (int64, error) {
	db := database.Open()
	defer database.Close(db)

	insForm, err := db.Prepare("INSERT INTO wateringSchedules (`plantId`, `time`, `amount`, `repeatDays`, `repeatEndDate`, `active`) VALUES (?,?,?,?,?,?)")
	if err != nil {
		return 0, err
	}

	res, err := insForm.Exec(
		wateringSchedule.PlantID,
		wateringSchedule.Schedule.Time,
		wateringSchedule.Amount,
		wateringSchedule.Schedule.RepeatDays,
		wateringSchedule.Schedule.RepeatEndDate,
		true,
	)

	if err != nil {
		return 0, err
	}

	id, err := res.LastInsertId()

	wateringSchedule.ID = id
	err = wateringSchedule.CreateWateringEvent()

	return id, err
}

func (wateringSchedule *WateringSchedule) getRow(rows *sql.Rows) error {
	err := rows.Scan(&wateringSchedule.ID,
		&wateringSchedule.PlantID,
		&wateringSchedule.Schedule.Time,
		&wateringSchedule.Amount,
		&wateringSchedule.Schedule.RepeatDays,
		&wateringSchedule.Schedule.RepeatEndDate,
		&wateringSchedule.Active,
	)
	return err
}

// GetByID TODO
func (wateringSchedule *WateringSchedule) GetByID(id int64) error {
	db := database.Open()
	defer db.Close()
	rows, err := db.Query("SELECT * FROM wateringSchedules WHERE id = ?", id)
	if err != nil {
		return err
	}
	defer rows.Close()

	found := false
	for rows.Next() {
		found = true
		err = wateringSchedule.getRow(rows)

		if err != nil {
			return err
		}
	}

	if !found {
		return errors.New("Schedule not found")
	}

	return nil
}

// GetWateringSchedulesByPlantID TODO
func GetWateringSchedulesByPlantID(plantID int64) ([]WateringSchedule, error) {
	wateringSchedule := WateringSchedule{}
	res := []WateringSchedule{}

	db := database.Open()
	defer db.Close()
	rows, err := db.Query("SELECT * FROM wateringSchedules WHERE plantId = ?", plantID)
	if err != nil {
		return res, err
	}
	defer rows.Close()

	for rows.Next() {
		wateringSchedule.getRow(rows)

		if err != nil {
			return res, err
		}

		res = append(res, wateringSchedule)
	}

	return res, nil
}

// DeleteWateringSchedule TODO
func DeleteWateringSchedule(scheduleID int64) error {
	db := database.Open()
	defer database.Close(db)

	delForm, err := db.Prepare("DELETE FROM wateringSchedules WHERE id = ?")
	if err != nil {
		return err
	}

	_, err = delForm.Exec(
		scheduleID,
	)

	return err
}
