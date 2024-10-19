package models

type Point struct {
	X int `json:"x"`
	Y int `json:"y"`
	Z int `json:"z"`
}

type NavigationResponse struct {
	Path []Point `json:"path"`
}

func GetNavigationPath() []Point {
	// hardcoded path
	return []Point{
		{X: 0, Y: 0, Z: 3},
		{X: 5, Y: 0, Z: 3},
		{X: 5, Y: 5, Z: 3},
		{X: 5, Y: 5, Z: 4},
		{X: 10, Y: 5, Z: 4},
	}
}