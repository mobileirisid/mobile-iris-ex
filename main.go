package main

import (
	"io/ioutil"
	"net/http"

	"log"

	"encoding/json"

	"strings"

	"fmt"

	"errors"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

var baseURL = "http://localhost:8000"

func main() {
	router := mux.NewRouter()
	router.Methods(http.MethodPost).Path("/api/registration").HandlerFunc(registerationHandler)
	router.Methods(http.MethodPost).Path("/api/login").HandlerFunc(sessionHandler)
	router.Methods(http.MethodGet).Path("/api/status/{id}").HandlerFunc(sessionHandler)
	router.Methods(http.MethodGet).Path("/api/subscriber").HandlerFunc(getSubscribersHandler)
	router.Methods(http.MethodGet).Path("/api/subscriber/{id}").HandlerFunc(getSubscriberHandler)

	fs := http.FileServer(http.Dir("./public"))
	router.PathPrefix("/").Handler(fs)

	// Alex L - To enable CORS
	handler := cors.Default().Handler(router)
	err := http.ListenAndServe(":9000", handler)
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
	url := fmt.Sprintf("%s/registration", baseURL)
	resp, err := http.Post(url, "application/json", strings.NewReader(string(val)))
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
	url := fmt.Sprintf("%s/session", baseURL)
	resp, err := http.Post(url, "application/json", strings.NewReader(string(val)))
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

func getSubscribersHandler(w http.ResponseWriter, r *http.Request) {
	apiKey := r.URL.Query().Get("apikey")
	if apiKey == "" {
		writeBadRequest(w, errors.New("Missing API Key in request"))
		return
	}

	url := fmt.Sprintf("%s/subscriber.json?apikey=%s", baseURL, apiKey)
	result, err := http.Get(url)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"error": "request failed"}`))
	} else {
		body, _ := ioutil.ReadAll(result.Body)
		w.Write(body)
	}
}

func getSubscriberHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	apiKey := r.URL.Query().Get("apikey")
	if apiKey == "" {
		writeBadRequest(w, errors.New("Missing API Key in request"))
		return
	}

	if id, err := strconv.ParseInt(vars["id"], 10, 0); err == nil {
		url := fmt.Sprintf("%s/subscriber/%d.json?apikey=%s", baseURL, id, apiKey)
		result, err := http.Get(url)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(`{"error": "request failed"}`))
		} else {
			body, _ := ioutil.ReadAll(result.Body)
			w.Write(body)
		}
	} else {
		writeBadRequest(w, errors.New("Invalid id paramater, are you sure this is an int?"))
	}
}

func checkScanStatus(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	apiKey := r.URL.Query().Get("apikey")
	if apiKey == "" {
		writeBadRequest(w, errors.New("Missing API Key in request"))
		return
	}

	if id, err := strconv.ParseInt(vars["id"], 10, 0); err == nil {
		url := fmt.Sprintf("%s/request/status/%d?apikey=%s", baseURL, id, apiKey)
		result, err := http.Get(url)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(`{"error": "request failed"}`))
		} else {
			body, _ := ioutil.ReadAll(result.Body)
			w.Write(body)
		}
	} else {
		writeBadRequest(w, errors.New("Invalid id paramater, are you sure this is an int?"))
	}
}
