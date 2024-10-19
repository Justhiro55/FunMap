package handlers

import (
	"fmt"
	"strconv"
	"encoding/json"
	"net/http"

	"campus_navigation/models"
)

func Navigate(w http.ResponseWriter, r *http.Request) {
	path := models.GetNavigationPath()

	// Get start and end parameters
	startStr := r.URL.Query().Get("start")
	endStr := r.URL.Query().Get("end")

	start, _ := strconv.Atoi(startStr)
	end, _ := strconv.Atoi(endStr)

	fmt.Println("Start: ", start, "End: ", end)

	response := models.NavigationResponse{Path: path}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
