package models

import (
	"database/sql"
	"errors"
	database "github.com/2J/LeafMe/api/db"
	_ "github.com/go-sql-driver/mysql" // MySQL driver
	"strings"
)

// Plant TODO
type Plant struct {
	ID          int    `json:"id" validate:"required"`
	DeviceID    int    `json:"device_id" validate:"required"`
	Name        string `json:"name" validate:"required"`
	Description string `json:"-"`
}

func (plant *Plant) getRow(rows *sql.Rows) error {
	err := rows.Scan(
		&plant.ID,
		&plant.DeviceID,
		&plant.Name,
		&plant.Description,
	)

	return err
}

// GetByID TODO
func (plant *Plant) GetByID(id int) error {
	db := database.Open()
	defer database.Close(db)
	rows, err := db.Query("SELECT * FROM plants WHERE id = ?", id)
	if err != nil {
		return err
	}

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

// UpdatePlantName TODO
func UpdatePlantName(plantID int, name string) error {
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

// Validate TODO
func (plant *Plant) Validate() error {
	if strings.Trim(plant.Name, " ") == "" {
		return errors.New("Plant name is required")
	}
	return nil
}
