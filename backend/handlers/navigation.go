package handlers

import (
	"encoding/json"
	"net/http"

	"campus_navigation/models"
)

func Navigate(w http.ResponseWriter, r *http.Request) {
	path := models.GetNavigationPath()

	response := models.NavigationResponse{Path: path}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
