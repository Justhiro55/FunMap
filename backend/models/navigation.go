package models

type Point struct {
	X int `json:"x"`
	Y int `json:"y"`
	Z int `json:"z"`
}

type NavigationResponse struct {
	Path []Point `json:"path"`
}

type Node struct {
	ID       string
	Name     string
	Position Point
	Type     string
}

type Edge struct {
	From   string
	To     string
	Weight float64
	Type   string
}

type UniversityMap struct {
	Nodes map[string]Node
	Edges map[string][]Edge
}
