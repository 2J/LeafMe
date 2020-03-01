package main

import (
	api "github.com/2J/LeafMe/api/api"
	pusher "github.com/2J/LeafMe/api/pusher"
	log "github.com/sirupsen/logrus"
	"os"
)

func main() {
	log.SetOutput(os.Stdout)

	apiServer, err := api.NewServer("0.0.0.0:8000", os.Stdout)
	if err != nil {
		panic(err)
	}

	log.Info("Starting notification checker...")
	go pusher.NotificationChecker()

	log.Info("Starting HTTP server..")
	apiServer.ListenAndServe()
}
