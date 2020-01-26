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

/*

func (wateringSchedule *WateringSchedule) Validate() error {
	err := nil
	// TODO
	return err
}

func (wateringSchedule *WateringSchedule) Create() error {
	// TODO
	return nil
}


func (wateringSchedule *WateringSchedule) Get(filter string) error {

	query += " " + filter
	rows, err := db.Query(queryd)
	return nil
}
*/

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
