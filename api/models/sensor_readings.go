package models

import (
	"database/sql"
	"errors"
	database "github.com/2J/LeafMe/api/db"
	_ "github.com/go-sql-driver/mysql" // MySQL driver
	"time"
)

// SensorTypes is the list of sensor types
var SensorTypes = map[string]string{
	"SOIL_MOISTURE":       "SOIL_MOISTURE",
	"BRIGHTNESS":          "BRIGHTNESS",
	"AMBIENT_TEMPERATURE": "AMBIENT_TEMPERATURE",
	"AMBIENT_HUMIDITY":    "AMBIENT_HUMIDITY",
	"PUMP_STATUS":         "PUMP_STATUS",
	"LIGHT_STATUS":        "LIGHT_STATUS",
	"TANK_LEVEL":          "TANK_LEVEL",
}

// SensorReading TODO
type SensorReading struct {
	ID         int64     `json:"-" validate:"required"`
	PlantID    int64     `json:"-" validate:"required"`
	Time       time.Time `json:"time" validate:"required"`
	SensorType string    `json:"-" validate:"required"`
	Value      float64   `json:"value" validate:"required"`
}

// Validate TODO
func (sensorReading *SensorReading) Validate() error {
	if SensorTypes[sensorReading.SensorType] == "" {
		return errors.New("Invalid sensor type: " + sensorReading.SensorType)
	}
	return nil
}

// Create TODO
func (sensorReading *SensorReading) Create() (int, error) {
	db := database.Open()
	defer database.Close(db)

	err := sensorReading.Validate()
	if err != nil {
		return 0, err
	}

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

// CreateSensorReadings TODO
func CreateSensorReadings(sensorReadings []SensorReading) error {
	db := database.Open()
	defer database.Close(db)

	query := "INSERT INTO sensorReadings (`plantId`, `time`, `type`, `value`) VALUES "
	vals := []interface{}{}

	for i, v := range sensorReadings {
		err := v.Validate()
		if err != nil {
			return err
		}

		if i > 0 {
			query += ","
		}
		query += "(?,?,?,?)"

		vals = append(vals, v.PlantID, v.Time, v.SensorType, v.Value)
	}

	insForm, err := db.Prepare(query)
	if err != nil {
		return err
	}

	_, err = insForm.Exec(vals...)

	return err
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

// GetByID TODO
func (sensorReading *SensorReading) GetByID(id int64) error {
	db := database.Open()
	defer database.Close(db)
	rows, err := db.Query("SELECT * FROM sensorReadings WHERE id = ?", id)
	if err != nil {
		return err
	}
	defer rows.Close()

	found := false
	for rows.Next() {
		found = true
		err = sensorReading.getRow(rows)

		if err != nil {
			return err
		}
	}

	if !found {
		return errors.New("Sensor reading not found")
	}

	return nil
}

// GetLatestSensorReadingsByType TODO
func GetLatestSensorReadingsByType(plantID int64, sensorType string, minTime time.Time) ([]SensorReading, error) {
	sensorReading := SensorReading{}
	res := []SensorReading{}

	db := database.Open()
	defer database.Close(db)
	rows, err := db.Query("SELECT * FROM sensorReadings WHERE type LIKE ? AND plantId = ? AND time >= ? ORDER BY id DESC", sensorType, plantID, minTime)
	if err != nil {
		return res, err
	}
	defer rows.Close()

	for rows.Next() {
		sensorReading.getRow(rows)

		if err != nil {
			return res, err
		}

		res = append(res, sensorReading)
	}

	return res, nil
}

// GetLatestSensorReadingByType TODO
func GetLatestSensorReadingByType(plantID int64, sensorType string) (SensorReading, error) {
	sensorReading := SensorReading{}

	db := database.Open()
	defer database.Close(db)
	rows, err := db.Query("SELECT * FROM sensorReadings WHERE type LIKE ? AND plantId = ? ORDER BY id DESC LIMIT 1", sensorType, plantID)
	if err != nil {
		return sensorReading, err
	}
	defer rows.Close()

	rows.Next()
	sensorReading.getRow(rows)

	return sensorReading, nil
}

// DeleteSensorReading TODO
func DeleteSensorReading(scheduleID int64) error {
	db := database.Open()
	defer database.Close(db)

	delForm, err := db.Prepare("DELETE FROM sensorReadings WHERE id = ?")
	if err != nil {
		return err
	}

	_, err = delForm.Exec(
		scheduleID,
	)

	return err
}
