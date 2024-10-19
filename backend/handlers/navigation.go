package handlers

import (
	"encoding/json"
	"net/http"

	"campus_navigation/models"
	"campus_navigation/services"
)

type NavigationHandler struct {
	NavService *services.NavigationService
}

func NewNavigationHandler() *NavigationHandler {
	return &NavigationHandler{
		NavService: services.NewNavigationService(),
	}
}

func (h *NavigationHandler) Navigate(w http.ResponseWriter, r *http.Request) {
	start := r.URL.Query().Get("start")
	end := r.URL.Query().Get("end")

	if start == "" || end == "" {
		http.Error(w, "Start and end parameters are required", http.StatusBadRequest)
		return
	}

	path := h.NavService.GetNavigationPath(start, end)

	if path == nil {
		http.Error(w, "No path found", http.StatusNotFound)
		return
	}

	response := models.NavigationResponse{Path: path}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
