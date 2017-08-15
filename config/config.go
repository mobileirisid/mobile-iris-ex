package config

import (
	"os"
)

// GetHTTPPort returns the port to listen to
func GetHTTPPort() string {
	port := os.Getenv("PORT")

	if port == "" {
		port = "9000"
	}
	return ":" + port
}
