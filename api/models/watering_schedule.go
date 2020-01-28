package models

import (
	"database/sql"
	database "github.com/2J/LeafMe/api/db"

	_ "github.com/go-sql-driver/mysql"
)

// WateringSchedule TODO
type WateringSchedule struct {
	ID       int      `json:"id" validate:"required"`
	PlantID  int      `json:"plant_id" validate:"required"`
	Schedule Schedule `json:"schedule" validate:"required"`
	Amount   int      `json:"amount" validate:"required"`
	Active   bool     `json:"active" validate:"required"`
}

func (wateringSchedule *WateringSchedule) Validate() (err error) {
	return err
}

func (wateringSchedule *WateringSchedule) Create() (int, error) {
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

	return int(id), err
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

func (wateringSchedule *WateringSchedule) GetById(id int) error {
	db := database.Open()
	defer db.Close()
	rows, err := db.Query("SELECT * FROM wateringSchedules WHERE id = ?", id)
	if err != nil {
		return err
	}

	for rows.Next() {
		err = wateringSchedule.getRow(rows)

		if err != nil {
			return err
		}
	}

	return nil
}

func GetWateringSchedulesByPlantId(plantId int) ([]WateringSchedule, error) {
	wateringSchedule := WateringSchedule{}
	res := []WateringSchedule{}

	db := database.Open()
	defer db.Close()
	rows, err := db.Query("SELECT * FROM wateringSchedules WHERE plantId = ?", plantId)
	if err != nil {
		return res, err
	}

	for rows.Next() {
		wateringSchedule.getRow(rows)

		if err != nil {
			return res, err
		}

		res = append(res, wateringSchedule)
	}

	return res, nil
}

func DeleteWateringSchedule(scheduleId int) error {
	db := database.Open()
	defer database.Close(db)

	delForm, err := db.Prepare("DELETE FROM wateringSchedules WHERE id = ?")
	if err != nil {
		return err
	}

	_, err = delForm.Exec(
		scheduleId,
	)

	return err
}
