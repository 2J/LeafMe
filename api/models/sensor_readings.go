package models

import (
	"database/sql"
	database "github.com/2J/LeafMe/api/db"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

/*
	Sensor Types:
	- SOIL_MOISTURE
	- BRIGHTNESS
	- AMBIENT_TEMPERATURE
	- AMBIENT_HUMIDITY
*/

// SensorReading TODO
type SensorReading struct {
	ID         int       `json:"-" validate:"required"`
	PlantID    int       `json:"-" validate:"required"`
	Time       time.Time `json:"time" validate:"required"`
	SensorType string    `json:"-" validate:"required"`
	Value      float64   `json:"value" validate:"required"`
}

func (sensorReading *SensorReading) Validate() (err error) {
	return err
}

func (sensorReading *SensorReading) Create() (int, error) {
	db := database.Open()
	defer database.Close(db)

	insForm, err := db.Prepare("INSERT INTO sensorReadings (`plantId`, `time`, `type`, `value`) VALUES (?,?,?,?)")
	if err != nil {
		return 0, err
	}

	res, err := insForm.Exec(
		sensorReading.PlantID,
		sensorReading.Time,
		sensorReading.SensorType,
		sensorReading.Value,
	)

	if err != nil {
		return 0, err
	}

	id, err := res.LastInsertId()

	return int(id), err
}

func (sensorReading *SensorReading) getRow(rows *sql.Rows) error {
	err := rows.Scan(
		&sensorReading.ID,
		&sensorReading.PlantID,
		&sensorReading.Time,
		&sensorReading.SensorType,
		&sensorReading.Value,
	)

	return err
}

func (sensorReading *SensorReading) GetById(id int) error {
	db := database.Open()
	defer database.Close(db)
	rows, err := db.Query("SELECT * FROM sensorReadings WHERE id = ? ORDER BY id DESC", id)
	if err != nil {
		return err
	}

	for rows.Next() {
		err = sensorReading.getRow(rows)

		if err != nil {
			return err
		}
	}

	return nil
}

func GetLatestSensorReadingsByType(plantId int, sensorType string) ([]SensorReading, error) {
	sensorReading := SensorReading{}
	res := []SensorReading{}

	db := database.Open()
	defer database.Close(db)
	rows, err := db.Query("SELECT * FROM sensorReadings WHERE type LIKE ? AND plantId = ? ORDER BY id DESC", sensorType, plantId)
	if err != nil {
		return res, err
	}

	for rows.Next() {
		sensorReading.getRow(rows)

		if err != nil {
			return res, err
		}

		res = append(res, sensorReading)
	}

	return res, nil
}

func GetLatestSensorReadingByType(plantId int, sensorType string) (SensorReading, error) {
	sensorReading := SensorReading{}

	db := database.Open()
	defer database.Close(db)
	rows, err := db.Query("SELECT * FROM sensorReadings WHERE type LIKE ? AND plantId = ? ORDER BY id DESC LIMIT 1", sensorType, plantId)
	if err != nil {
		return sensorReading, err
	}

	rows.Next()
	sensorReading.getRow(rows)

	return sensorReading, nil
}

func DeleteSensorReading(scheduleId int) error {
	db := database.Open()
	defer database.Close(db)

	delForm, err := db.Prepare("DELETE FROM sensorReadings WHERE id = ?")
	if err != nil {
		return err
	}

	_, err = delForm.Exec(
		scheduleId,
	)

	return err
}
