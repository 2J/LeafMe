package models

import (
	"database/sql"
	"errors"
	database "github.com/2J/LeafMe/api/db"
	_ "github.com/go-sql-driver/mysql" // MySQL driver
)

/*
 * Preset Types
 * - PEPPER
 * - FRUIT_VEG
 * - ROOT_VEG
 * - HERB
 * - LEGUME
 */

// Preset TODO
type Preset struct {
	ID             int64  `json:"id" validate:"required"`
	PresetType     string `json:"type" validate:"required"`
	Name           string `json:"name" validate:"required"`
	LightingLength int    `json:"light_length" validate:"required"`
	LightingRepeat int    `json:"light_repeat" validate:"required"`
	WateringAmount int    `json:"water_amount" validate:"required"`
	WateringRepeat int    `json:"water_repeat" validate:"required"`
	TemperatureMin int    `json:"temp_min" validate:"required"`
	TemperatureMax int    `json:"temp_max" validate:"required"`
	HumidityMin    int    `json:"humidity_min" validate:"required"`
	HumidityMax    int    `json:"humidity_max" validate:"required"`
	PictureURL     string `json:"url" validate:"required"`
}

// Validate TODO
func (preset *Preset) Validate() (err error) {
	return err
}

// Create TODO
func (preset *Preset) Create() (int64, error) {
	db := database.Open()
	defer database.Close(db)

	insForm, err := db.Prepare("INSERT INTO presets (`type`, `name`, `lightingLength`, `lightingRepeat`, `wateringAmount`, `wateringRepeat`, `temperatureMin`, `temperatureMax`, `humidityMin`, `humidityMax`, `pictureUrl`) VALUES (?,?,?,?,?,?,?,?,?,?,?)")
	if err != nil {
		return 0, err
	}

	res, err := insForm.Exec(
		preset.PresetType,
		preset.Name,
		preset.LightingLength,
		preset.LightingRepeat,
		preset.WateringAmount,
		preset.WateringRepeat,
		preset.TemperatureMin,
		preset.TemperatureMax,
		preset.HumidityMin,
		preset.HumidityMax,
		preset.PictureURL,
	)

	if err != nil {
		return 0, err
	}

	id, err := res.LastInsertId()

	return id, err
}

func (preset *Preset) getRow(rows *sql.Rows) error {
	err := rows.Scan(
		&preset.ID,
		&preset.PresetType,
		&preset.Name,
		&preset.LightingLength,
		&preset.LightingRepeat,
		&preset.WateringAmount,
		&preset.WateringRepeat,
		&preset.TemperatureMin,
		&preset.TemperatureMax,
		&preset.HumidityMin,
		&preset.HumidityMax,
		&preset.PictureURL,
	)

	return err
}

// GetByID TODO
func (preset *Preset) GetByID(id int64) error {
	db := database.Open()
	defer database.Close(db)
	rows, err := db.Query("SELECT * FROM presets WHERE id = ?", id)
	if err != nil {
		return err
	}

	found := false
	for rows.Next() {
		found = true
		err = preset.getRow(rows)

		if err != nil {
			return err
		}
	}

	if !found {
		return errors.New("Preset not found")
	}

	return nil
}

// GetPresetsByType TODO
func GetPresetsByType(presetType string) ([]Preset, error) {
	preset := Preset{}
	res := []Preset{}

	db := database.Open()
	defer database.Close(db)

	rows, err := db.Query("SELECT * FROM presets WHERE type LIKE ? ORDER BY name ASC", presetType)
	if err != nil {
		return res, err
	}

	for rows.Next() {
		preset.getRow(rows)

		if err != nil {
			return res, err
		}

		res = append(res, preset)
	}

	return res, nil
}

// DeletePreset TODO
func DeletePreset(presetID int64) error {
	db := database.Open()
	defer database.Close(db)

	delForm, err := db.Prepare("DELETE FROM presets WHERE id = ?")
	if err != nil {
		return err
	}

	_, err = delForm.Exec(
		presetID,
	)

	return err
}
