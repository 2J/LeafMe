package pusher

import (
	"github.com/2J/LeafMe/api/models"
	log "github.com/sirupsen/logrus"
	"time"
)

// Number of seconds between checking for notification
const checkNotificationInterval = 5

// Block same notification for X number of seconds since last notification
const notificationInterval = 600

// NotificationChecker checks if notifications need to be sent and sends them
func NotificationChecker() {
	for {
		// Run every 10 seconds
		<-time.After(checkNotificationInterval * time.Second)

		// Tank level notification
		plantIDs := CheckTankNotification()
		for _, plantID := range plantIDs {
			SendTankNotification(plantID)
		}
	}
}

// CheckTankNotification checks if tank notification needs to be sent
func CheckTankNotification() []int64 {
	plantIDs := []int64{}

	plants, err := models.GetAllPlants()

	if err != nil {
		log.Error("Error getting all plants")
		return plantIDs
	}

	for _, plant := range plants {
		if plant.PushToken == "" {
			continue
		}

		// Check if needs to be sent
		sensorReading, err := models.GetLatestSensorReadingByType(plant.ID, "TANK_LEVEL")
		if err != nil {
			log.Warn("Error reading sensor value for plant: " + string(plant.ID))
			continue
		}

		if sensorReading.Value == 0 {
			// Send a notification every X seconds
			plantIDs = append(plantIDs, plant.ID)
		}

	}

	return plantIDs
}

// SendTankNotification sends tank notification to ID
func SendTankNotification(plantID int64) error {
	plant := models.Plant{}
	err := plant.GetByID(plantID)
	if err != nil {
		log.Info("Failed to get Plant ID: ", plantID)
	}

	// Only send notification every X seconds since last notification
	if plant.LastTankNotification.Valid && !time.Now().After(plant.LastTankNotification.Time.Add(notificationInterval*time.Second)) {
		log.Info("Not sending notification because last notification too recent...")
		return nil
	}

	notification := Notification{}
	notification.Title = "Water level low for " + plant.Name
	notification.Body = "Water tank needs to be refilled"

	err = PushNotification(plantID, notification)

	if err != nil {
		log.Error("Error sending notification...")
		log.Error(err)
		return err
	}

	models.UpdatePlantLastTankNotification(plantID)

	return nil
}
