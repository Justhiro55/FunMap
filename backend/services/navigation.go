package services

import (
	"math"

	"campus_navigation/models"
)

type NavigationService struct {
	UniversityMap *models.UniversityMap
}

func NewNavigationService() *NavigationService {
	return &NavigationService{
		UniversityMap: initializeMap(),
	}
}

func initializeMap() *models.UniversityMap {
	m := &models.UniversityMap{
		Nodes: make(map[string]models.Node),
		Edges: make(map[string][]models.Edge),
	}

	// Add nodes
	m.Nodes["entrance"] = models.Node{ID: "entrance", Name: "3階入り口", Position: models.Point{X: 0, Y: 0, Z: 3}, Type: "room"}
	m.Nodes["hallway3"] = models.Node{ID: "hallway3", Name: "3階廊下", Position: models.Point{X: 5, Y: 0, Z: 3}, Type: "hallway"}
	m.Nodes["stairs3"] = models.Node{ID: "stairs3", Name: "3階階段", Position: models.Point{X: 10, Y: 0, Z: 3}, Type: "stairs"}
	m.Nodes["stairs4"] = models.Node{ID: "stairs4", Name: "4階階段", Position: models.Point{X: 10, Y: 0, Z: 4}, Type: "stairs"}
	m.Nodes["hallway4"] = models.Node{ID: "hallway4", Name: "4階廊下", Position: models.Point{X: 15, Y: 0, Z: 4}, Type: "hallway"}
	m.Nodes["office"] = models.Node{ID: "office", Name: "4階事務局", Position: models.Point{X: 20, Y: 5, Z: 4}, Type: "room"}

	// Add edges
	addEdge(m, "entrance", "hallway3", 5, "walk")
	addEdge(m, "hallway3", "stairs3", 5, "walk")
	addEdge(m, "stairs3", "stairs4", 10, "stairs")
	addEdge(m, "stairs4", "hallway4", 5, "walk")
	addEdge(m, "hallway4", "office", 7, "walk")

	return m
}

func addEdge(m *models.UniversityMap, from, to string, weight float64, edgeType string) {
	edge := models.Edge{From: from, To: to, Weight: weight, Type: edgeType}
	m.Edges[from] = append(m.Edges[from], edge)
	if edgeType != "stairs" {
		reverseEdge := models.Edge{From: to, To: from, Weight: weight, Type: edgeType}
		m.Edges[to] = append(m.Edges[to], reverseEdge)
	} else {
		reverseEdge := models.Edge{From: to, To: from, Weight: weight * 0.8, Type: edgeType}
		m.Edges[to] = append(m.Edges[to], reverseEdge)
	}
}

func (s *NavigationService) GetNavigationPath(start, end string) []models.Point {
	rawPath := s.aStarSearch(start, end)
	return s.optimizePath(rawPath)
}

func (s *NavigationService) aStarSearch(start, goal string) []models.Point {
	openSet := make(map[string]bool)
	openSet[start] = true
	cameFrom := make(map[string]string)
	gScore := make(map[string]float64)
	fScore := make(map[string]float64)

	gScore[start] = 0
	fScore[start] = heuristic(s.UniversityMap.Nodes[start].Position, s.UniversityMap.Nodes[goal].Position)

	for len(openSet) > 0 {
		var current string
		minF := math.Inf(1)
		for node := range openSet {
			if f, ok := fScore[node]; ok && f < minF {
				minF = f
				current = node
			}
		}

		if current == goal {
			return s.reconstructPath(cameFrom, current)
		}

		delete(openSet, current)

		for _, edge := range s.UniversityMap.Edges[current] {
			tentativeGScore := gScore[current] + edge.Weight
			if _, ok := gScore[edge.To]; !ok || tentativeGScore < gScore[edge.To] {
				cameFrom[edge.To] = current
				gScore[edge.To] = tentativeGScore
				fScore[edge.To] = gScore[edge.To] + heuristic(s.UniversityMap.Nodes[edge.To].Position, s.UniversityMap.Nodes[goal].Position)
				openSet[edge.To] = true
			}
		}
	}

	return nil
}

func (s *NavigationService) reconstructPath(cameFrom map[string]string, current string) []models.Point {
	path := []models.Point{s.UniversityMap.Nodes[current].Position}
	for cameFrom[current] != "" {
		current = cameFrom[current]
		path = append([]models.Point{s.UniversityMap.Nodes[current].Position}, path...)
	}
	return path
}

func (s *NavigationService) optimizePath(path []models.Point) []models.Point {
	if len(path) < 2 {
		return path
	}

	optimizedPath := []models.Point{path[0]}
	current := path[0]

	for i := 1; i < len(path); i++ {
		next := path[i]

		if next.X != current.X {
			optimizedPath = append(optimizedPath, models.Point{X: next.X, Y: current.Y, Z: current.Z})
			current.X = next.X
		}

		if next.Y != current.Y {
			optimizedPath = append(optimizedPath, models.Point{X: current.X, Y: next.Y, Z: current.Z})
			current.Y = next.Y
		}

		if next.Z != current.Z {
			steps := int(math.Abs(float64(next.Z - current.Z)))
			step := 1
			if next.Z < current.Z {
				step = -1
			}
			for j := 0; j < steps; j++ {
				current.Z += step
				optimizedPath = append(optimizedPath, models.Point{X: current.X, Y: current.Y, Z: current.Z})
			}
		}
	}

	return optimizedPath
}

func isStraightLine(a, b, c models.Point) bool {
	xSame := (a.X == b.X && b.X == c.X)
	ySame := (a.Y == b.Y && b.Y == c.Y)
	zSame := (a.Z == b.Z && b.Z == c.Z)

	return (xSame && ySame) || (xSame && zSame) || (ySame && zSame)
}

func heuristic(a, b models.Point) float64 {
	return math.Abs(float64(a.X-b.X)) + math.Abs(float64(a.Y-b.Y)) + math.Abs(float64(a.Z-b.Z))*5
}
