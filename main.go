package main

import (
	"io/ioutil"
	"net/http"

	"log"

	"encoding/json"

	"strings"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()
	router.Methods(http.MethodPost).Path("/api/registration").HandlerFunc(registerationHandler)
	router.Methods(http.MethodPost).Path("/api/login").HandlerFunc(sessionHandler)

	fs := http.FileServer(http.Dir("./public"))
	router.PathPrefix("/").Handler(fs)

	err := http.ListenAndServe(":9000", router)
	if err != nil {
		log.Fatal("ListendAndServe:", err)
	}
}

func writeBadRequest(w http.ResponseWriter, e error) {
	w.WriteHeader(http.StatusBadRequest)
	w.Write([]byte(e.Error()))
}

func registerationHandler(w http.ResponseWriter, r *http.Request) {
	type Registration struct {
		FirstName      string `json:"first_name"`
		LastName       string `json:"last_name"`
		Email          string `json:"email"`
		Password       string `json:"password"`
		PhoneValue     string `json:"phone_value"`
		PhoneCountryID int    `json:"phone_country_id"`
	}

	var registration Registration
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&registration)

	if err != nil {
		writeBadRequest(w, err)
		return
	}

	val, _ := json.Marshal(registration)
	resp, err := http.Post("http://localhost:8000/registration", "application/json", strings.NewReader(string(val)))
	defer resp.Body.Close()

	if err != nil {
		writeBadRequest(w, err)
		return
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		writeBadRequest(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(body)
}

func sessionHandler(w http.ResponseWriter, r *http.Request) {
	type LoginCredentials struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var credentials LoginCredentials
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&credentials)

	if err != nil {
		writeBadRequest(w, err)
		return
	}

	val, _ := json.Marshal(credentials)
	resp, err := http.Post("http://localhost:8000/session", "application/json", strings.NewReader(string(val)))
	defer resp.Body.Close()

	if err != nil {
		writeBadRequest(w, err)
		return
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		writeBadRequest(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(body)
}
