package models

import (
	"database/sql"
	"errors"
	database "github.com/2J/LeafMe/api/db"
	_ "github.com/go-sql-driver/mysql" // MySQL driver
)

// LightingSchedule TODO
type LightingSchedule struct {
	ID       int64    `json:"id" validate:"required"`
	PlantID  int64    `json:"plant_id" validate:"required"`
	Schedule Schedule `json:"schedule" validate:"required"`
	Length   int      `json:"length" validate:"required"`
	Active   bool     `json:"active" validate:"required"`
}

// Validate TODO
func (lightingSchedule *LightingSchedule) Validate() (err error) {
	return err
}

// Create TODO
func (lightingSchedule *LightingSchedule) Create() (int64, error) {
	db := database.Open()
	defer database.Close(db)

	insForm, err := db.Prepare("INSERT INTO lightingSchedules (`plantId`, `time`, `length`, `repeatDays`, `repeatEndDate`, `active`) VALUES (?,?,?,?,?,?)")
	if err != nil {
		return 0, err
	}

	res, err := insForm.Exec(
		lightingSchedule.PlantID,
		lightingSchedule.Schedule.Time,
		lightingSchedule.Length,
		lightingSchedule.Schedule.RepeatDays,
		lightingSchedule.Schedule.RepeatEndDate,
		true,
	)

	if err != nil {
		return 0, err
	}

	id, err := res.LastInsertId()

	lightingSchedule.ID = id
	err = lightingSchedule.CreateLightingEvent()

	return id, err
}

func (lightingSchedule *LightingSchedule) getRow(rows *sql.Rows) error {
	lightingSchedule.Schedule = Schedule{}

	err := rows.Scan(
		&lightingSchedule.ID,
		&lightingSchedule.PlantID,
		&lightingSchedule.Schedule.Time,
		&lightingSchedule.Length,
		&lightingSchedule.Schedule.RepeatDays,
		&lightingSchedule.Schedule.RepeatEndDate,
		&lightingSchedule.Active,
	)

	return err
}

// GetByID TODO
func (lightingSchedule *LightingSchedule) GetByID(id int64) error {
	db := database.Open()
	defer database.Close(db)
	rows, err := db.Query("SELECT * FROM lightingSchedules WHERE id = ?", id)
	if err != nil {
		return err
	}
	defer rows.Close()

	found := false
	for rows.Next() {
		found = true
		err = lightingSchedule.getRow(rows)

		if err != nil {
			return err
		}
	}

	if !found {
		return errors.New("Schedule not found")
	}

	return nil
}

// GetLightingSchedulesByPlantID TODO
func GetLightingSchedulesByPlantID(plantID int64, onlyActive bool) ([]LightingSchedule, error) {
	lightingSchedule := LightingSchedule{}
	res := []LightingSchedule{}

	db := database.Open()
	defer database.Close(db)

	query := "SELECT * FROM lightingSchedules WHERE plantId = ?"
	if onlyActive {
		query += " AND repeatEndDate >= CURRENT_TIMESTAMP"
	}

	rows, err := db.Query(query, plantID)
	if err != nil {
		return res, err
	}
	defer rows.Close()

	for rows.Next() {
		lightingSchedule.getRow(rows)

		if err != nil {
			return res, err
		}

		res = append(res, lightingSchedule)
	}

	return res, nil
}

// DeleteLightingSchedule TODO
func DeleteLightingSchedule(scheduleID int64) error {
	db := database.Open()
	defer database.Close(db)

	delForm, err := db.Prepare("DELETE FROM lightingSchedules WHERE id = ?")
	if err != nil {
		return err
	}

	_, err = delForm.Exec(
		scheduleID,
	)

	return err
}
