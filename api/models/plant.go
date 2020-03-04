package models

import (
	"database/sql"
	"errors"
	database "github.com/2J/LeafMe/api/db"
	_ "github.com/go-sql-driver/mysql" // MySQL driver
	"gopkg.in/guregu/null.v3"
	"strings"
	"time"
)

// Plant TODO
type Plant struct {
	ID                   int64     `json:"id" validate:"required"`
	DeviceID             int64     `json:"device_id" validate:"required"`
	Name                 string    `json:"name" validate:"required"`
	Description          string    `json:"-"`
	PushToken            string    `json:"-"`
	ManualMode           bool      `json:"manual_mode"`
	ManualLight          bool      `json:"manual_light"`
	ManualWater          int       `json:"manual_water"`
	LastTankNotification null.Time `json:"-"`
}

func (plant *Plant) getRow(rows *sql.Rows) error {
	err := rows.Scan(
		&plant.ID,
		&plant.DeviceID,
		&plant.Name,
		&plant.Description,
		&plant.PushToken,
		&plant.ManualMode,
		&plant.ManualLight,
		&plant.ManualWater,
		&plant.LastTankNotification,
	)

	return err
}

// GetByID TODO
func (plant *Plant) GetByID(id int64) error {
	db := database.Open()
	defer database.Close(db)
	rows, err := db.Query("SELECT * FROM plants WHERE id = ?", id)
	if err != nil {
		return err
	}
	defer rows.Close()

	found := false
	for rows.Next() {
		found = true
		err = plant.getRow(rows)

		if err != nil {
			return err
		}
	}

	if !found {
		return errors.New("Plant not found")
	}

	return nil
}

// GetAllPlants TODO
func GetAllPlants() ([]Plant, error) {
	plant := Plant{}
	res := []Plant{}

	db := database.Open()
	defer database.Close(db)
	rows, err := db.Query("SELECT * FROM plants")
	if err != nil {
		return res, err
	}
	defer rows.Close()

	for rows.Next() {
		plant.getRow(rows)

		if err != nil {
			return res, err
		}

		res = append(res, plant)
	}

	return res, nil
}

// UpdatePlantName TODO
func UpdatePlantName(plantID int64, name string) error {
	db := database.Open()
	defer database.Close(db)

	delForm, err := db.Prepare("UPDATE plants SET name = ? WHERE id = ?")
	if err != nil {
		return err
	}

	_, err = delForm.Exec(
		name,
		plantID,
	)

	return err
}

// UpdatePlantPushToken TODO
func UpdatePlantPushToken(plantID int64, pushToken string) error {
	db := database.Open()
	defer database.Close(db)

	delForm, err := db.Prepare("UPDATE plants SET pushToken = ? WHERE id = ?")
	if err != nil {
		return err
	}

	_, err = delForm.Exec(
		pushToken,
		plantID,
	)

	return err
}

// UpdatePlantMode TODO
func UpdatePlantMode(plantID int64, manual bool) error {
	db := database.Open()
	defer database.Close(db)

	delForm, err := db.Prepare("UPDATE plants SET manualMode = ? WHERE id = ?")
	if err != nil {
		return err
	}

	_, err = delForm.Exec(
		manual,
		plantID,
	)

	return err
}

// UpdatePlantManualLight TODO
func UpdatePlantManualLight(plantID int64, light bool) error {
	db := database.Open()
	defer database.Close(db)

	delForm, err := db.Prepare("UPDATE plants SET manualLight = ? WHERE id = ?")
	if err != nil {
		return err
	}

	_, err = delForm.Exec(
		light,
		plantID,
	)

	return err
}

// UpdatePlantManualWater TODO
func UpdatePlantManualWater(plantID int64, water int) error {
	db := database.Open()
	defer database.Close(db)

	delForm, err := db.Prepare("UPDATE plants SET manualWater = ? WHERE id = ?")
	if err != nil {
		return err
	}

	_, err = delForm.Exec(
		water,
		plantID,
	)

	return err
}

// UpdatePlantLastTankNotification TODO
func UpdatePlantLastTankNotification(plantID int64) error {
	db := database.Open()
	defer database.Close(db)

	delForm, err := db.Prepare("UPDATE plants SET lastTankNotification = ? WHERE id = ?")
	if err != nil {
		return err
	}

	_, err = delForm.Exec(
		time.Now(),
		plantID,
	)

	return err
}

// Validate TODO
func (plant *Plant) Validate() error {
	if strings.Trim(plant.Name, " ") == "" {
		return errors.New("Plant name is required")
	}
	return nil
}
