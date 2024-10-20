package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/redis/go-redis/v9"

	"campus_navigation/handlers"
)

func main() {
	r := chi.NewRouter()

	redisHost := os.Getenv("REDIS_HOST")
	redisPort := os.Getenv("REDIS_PORT")
	redisAddr := fmt.Sprintf("%s:%s", redisHost, redisPort)

	rdb := redis.NewClient(&redis.Options{
		Addr:     redisAddr,
		Password: "",
		DB:       0,
	})
	ctx := context.Background()
	err := rdb.Ping(ctx).Err()
	if err != nil {
		fmt.Println("err: ", rdb)
	}

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// navigate handler
	r.Get("/navigate", handlers.NewNavigationHandler().Navigate)

	log.Println("Server is running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
