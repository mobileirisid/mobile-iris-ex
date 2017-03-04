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
	apiKey  key = "apikey"
	baseURL     = "http://localhost:8000"
)

func main() {
	router := mux.NewRouter()
	router.Methods(http.MethodPost).Path("/registration").HandlerFunc(registerationHandler)
	router.Methods(http.MethodPost).Path("/login").HandlerFunc(sessionHandler)
	router.Methods(http.MethodGet).Path("/status/{id}").HandlerFunc(sessionHandler)
	router.Methods(http.MethodGet).Path("/subscriber").HandlerFunc(retrieveAPIKey(getSubscribersHandler))
	router.Methods(http.MethodGet).Path("/subscriber/{id}").HandlerFunc(retrieveAPIKey(getSubscriberHandler))
	router.Methods(http.MethodPost).Path("/v2/subscriber/add").HandlerFunc(retrieveAPIKey(addSubscriberHandler))
	router.Methods(http.MethodPost).Path("/check").HandlerFunc(retrieveAPIKey(requestValidation))

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
	url := fmt.Sprintf("%s/v2/subscriber/add?apikey=%s", baseURL, key)

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

func requestValidation(w http.ResponseWriter, r *http.Request) {
	key := r.Context().Value(apiKey)
	url := fmt.Sprintf("%s/request/check.json?apikey=%s", baseURL, key)

	err := r.ParseForm()
	if err != nil {
		writeBadRequest(w, errors.New("Make sure to send in subscriber_id and phone_id"))
	} else {
		req, err := http.NewRequest(http.MethodPost, url, strings.NewReader(r.Form.Encode()))
		req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
		req.Header.Set("Accept", "application/json")

		client := &http.Client{}
		res, err := client.Do(req)

		if err != nil {
			log.Println("Failed to get resp for mobile iris id server due to: ", err)
		}
		body, _ := ioutil.ReadAll(res.Body)
		res.Body.Close()
		w.Write(body)
	}
}
