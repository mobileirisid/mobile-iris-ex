package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()
	fs := http.FileServer(http.Dir("./public"))
	router.PathPrefix("/").Handler(fs)
}
