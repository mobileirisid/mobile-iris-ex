package main

import (
	"context"
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

type key string

const (
	apiKey key = "apikey"
	// baseURL     = "http://localhost:8000"
	baseURL = "https://service.mobileirisid.com"
)

type subscriberPhonePayload struct {
	SubscriberID int `json:"subscriber_id"`
	PhoneID      int `json:"phone_id"`
}

func main() {
	router := mux.NewRouter()
	router.Methods(http.MethodPost).Path("/registration").HandlerFunc(registerationHandler)
	router.Methods(http.MethodPost).Path("/register_with_subscriber").HandlerFunc(registerationHandler)
	router.Methods(http.MethodPost).Path("/session").HandlerFunc(sessionHandler)
	router.Methods(http.MethodGet).Path("/subscriber").HandlerFunc(retrieveAPIKey(getSubscribersHandler))
	router.Methods(http.MethodGet).Path("/subscriber/{id}").HandlerFunc(retrieveAPIKey(getSubscriberHandler))
	router.Methods(http.MethodPost).Path("/subscriber/add").HandlerFunc(retrieveAPIKey(addSubscriberHandler))
	router.Methods(http.MethodPost).Path("/request/check").HandlerFunc(retrieveAPIKey(requestCheck))
	router.Methods(http.MethodPost).Path("/request/register").HandlerFunc(retrieveAPIKey(requestRegister))
	router.Methods(http.MethodPost).Path("/request/cancel").HandlerFunc(retrieveAPIKey(requestCancel))
	router.Methods(http.MethodGet).Path("/request/status/{id}").HandlerFunc(retrieveAPIKey(requestStatusHandler))

	fs := http.FileServer(http.Dir("./public"))
	router.PathPrefix("/").Handler(fs)

	// Alex L - To enable CORS
	handler := cors.Default().Handler(router)
	err := http.ListenAndServe(":9000", handler)
	if err != nil {
		log.Fatal("ListendAndServe:", err)
	}
}

func retrieveAPIKey(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		key := r.URL.Query().Get("apikey")
		if key == "" {
			writeBadRequest(w, errors.New("Missing API Key in request"))
		} else {
			ctx := context.WithValue(r.Context(), apiKey, key)
			next.ServeHTTP(w, r.WithContext(ctx))
		}
	})
}

func writeBadRequest(w http.ResponseWriter, e error) {
	w.WriteHeader(http.StatusBadRequest)
	w.Write([]byte(e.Error()))
}

func mobileIrisIDPostRequest(w http.ResponseWriter, url string, data []byte) {
	resp, err := http.Post(url, "application/json", strings.NewReader(string(data)))
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
	url := fmt.Sprintf("%s/register_with_subscriber", baseURL)

	mobileIrisIDPostRequest(w, url, val)
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

	mobileIrisIDPostRequest(w, url, val)
}

func getSubscribersHandler(w http.ResponseWriter, r *http.Request) {
	key := r.Context().Value(apiKey)

	url := fmt.Sprintf("%s/subscriber.json?apikey=%s", baseURL, key)
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
	key := r.Context().Value(apiKey)

	if id, err := strconv.ParseInt(vars["id"], 10, 0); err == nil {
		url := fmt.Sprintf("%s/subscriber/%d.json?apikey=%s", baseURL, id, key)
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

func addSubscriberHandler(w http.ResponseWriter, r *http.Request) {
	type AddSubscriber struct {
		FirstName      string `json:"first_name"`
		LastName       string `json:"last_name"`
		PhoneValue     string `json:"phone_value"`
		PhoneCountryID int    `json:"phone_country_id"`
	}

	var sub AddSubscriber
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&sub)

	if err != nil {
		writeBadRequest(w, err)
		return
	}

	val, _ := json.Marshal(sub)

	key := r.Context().Value(apiKey)
	url := fmt.Sprintf("%s/subscriber/add?apikey=%s", baseURL, key)

	mobileIrisIDPostRequest(w, url, val)
}

func checkScanStatus(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	key := r.Context().Value(apiKey)

	if id, err := strconv.ParseInt(vars["id"], 10, 0); err == nil {
		url := fmt.Sprintf("%s/request/status/%d?apikey=%s", baseURL, id, key)
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

func requestCheck(w http.ResponseWriter, r *http.Request) {
	var c subscriberPhonePayload
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&c)

	if err != nil {
		writeBadRequest(w, err)
		return
	}

	val, _ := json.Marshal(c)

	key := r.Context().Value(apiKey)
	url := fmt.Sprintf("%s/request/check.json?apikey=%s", baseURL, key)

	mobileIrisIDPostRequest(w, url, val)
}

func requestRegister(w http.ResponseWriter, r *http.Request) {
	var c subscriberPhonePayload
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&c)

	if err != nil {
		writeBadRequest(w, err)
		return
	}

	val, _ := json.Marshal(c)

	key := r.Context().Value(apiKey)
	url := fmt.Sprintf("%s/request/reqister.json?apikey=%s", baseURL, key)

	mobileIrisIDPostRequest(w, url, val)
}

func requestCancel(w http.ResponseWriter, r *http.Request) {
	var c subscriberPhonePayload
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&c)

	if err != nil {
		writeBadRequest(w, err)
		return
	}

	val, _ := json.Marshal(c)

	key := r.Context().Value(apiKey)
	url := fmt.Sprintf("%s/request/cancel.json?apikey=%s", baseURL, key)

	mobileIrisIDPostRequest(w, url, val)
}

func requestStatusHandler(w http.ResponseWriter, r *http.Request) {
	key := r.Context().Value(apiKey)
	vars := mux.Vars(r)
	if id, err := strconv.ParseInt(vars["id"], 10, 0); err == nil {
		url := fmt.Sprintf("%s/request/status/%d?apikey=%s", baseURL, id, key)
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
