package models

import (
	"database/sql"
	database "github.com/2J/LeafMe/api/db"

	_ "github.com/go-sql-driver/mysql"
)

var dbfields = "`id`, `plantId`, `time`, `length`, `repeatDays`, `repeatEndDate`, `active`"

// LightingSchedule TODO
type LightingSchedule struct {
	ID       int      `json:"id" validate:"required"`
	PlantID  int      `json:"plant_id" validate:"required"`
	Schedule Schedule `json:"schedule" validate:"required"`
	Length   int      `json:"length" validate:"required"`
	Active   bool     `json:"active" validate:"required"`
}

func (lightingSchedule *LightingSchedule) Validate() error {
	var err error
	// TODO
	return err
}

func (lightingSchedule *LightingSchedule) Create() (int, error) {
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

	return int(id), err
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

func (lightingSchedule *LightingSchedule) GetById(id int) error {
	db := database.Open()
	defer database.Close(db)
	rows, err := db.Query("SELECT * FROM lightingSchedules WHERE id = ?", id)
	if err != nil {
		return err
	}

	for rows.Next() {
		err = lightingSchedule.getRow(rows)

		if err != nil {
			return err
		}
	}

	return nil
}

func GetLightingSchedulesByPlantId(plantId int) ([]LightingSchedule, error) {
	lightingSchedule := LightingSchedule{}
	res := []LightingSchedule{}

	db := database.Open()
	defer database.Close(db)
	rows, err := db.Query("SELECT * FROM lightingSchedules WHERE plantId = ?", plantId)
	if err != nil {
		return res, err
	}

	for rows.Next() {
		lightingSchedule.getRow(rows)

		if err != nil {
			return res, err
		}

		res = append(res, lightingSchedule)
	}

	return res, nil
}

func DeleteLightingSchedule(scheduleId int) error {
	db := database.Open()
	defer database.Close(db)

	delForm, err := db.Prepare("DELETE FROM lightingSchedules WHERE id = ?")
	if err != nil {
		return err
	}

	_, err = delForm.Exec(
		scheduleId,
	)

	return err
}
