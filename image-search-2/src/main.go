package main

import (
	"encoding/json"
	"fmt"
	"image"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/mux"
	"github.com/vova616/screenshot"
)

type Request struct {
	Images []Image `json:"images"`
}

type Image struct {
	Width  int     `json:"width"`
	Height int     `json:"height"`
	Pixels []Pixel `json:"pixels"`
}

type Pixel struct {
	Red   int `json:"red"`
	Green int `json"green"`
	Blue  int `json"blue"`
}

type Response struct {
	Data []Coordinates `json:"data"`
}

type Coordinates struct {
	X int `json:"x"`
	Y int `json:"y"`
}

func SearchImage(screen *image.RGBA, img Image) []Coordinates {
	precision := int(15)

	bounds := screen.Bounds()
	width, height := bounds.Max.X, bounds.Max.Y

	pixels := img.Pixels
	width2 := img.Width
	height2 := img.Height

	var results = []Coordinates{}
	var ok = true

	wg := sync.WaitGroup{}
	wg.Add(height * width)

	for y := 0; y < height; y++ {
		for x := 0; x < width; x++ {
			i := (y*width + x) * 4
			r1 := int(screen.Pix[i])
			g1 := int(screen.Pix[i+1])
			b1 := int(screen.Pix[i+2])

			ok = true

			for y2 := 0; y2 < height2; y2++ {
				for x2 := 0; x2 < width2; x2++ {
					pixel := pixels[y2*width2+x2]
					r := pixel.Red
					g := pixel.Green
					b := pixel.Blue

					if r1 < r-precision || r1 > r+precision || g1 < g-precision || g1 > g+precision || b1 < b-precision || b1 > b+precision {
						ok = false
						x2 = width2
						y2 = height2
					}
				}
			}

			if ok == true {
				results = append(results, Coordinates{X: x, Y: y})
			}

			wg.Done()
		}
	}

	wg.Wait()

	return results
}

func handleRequest(w http.ResponseWriter, r *http.Request) {
	screen, err := screenshot.CaptureScreen()
	checkError(err)

	var request Request
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&request)

	results := SearchImage(screen, request.Images[0])

	response := Response{Data: results}

	json.NewEncoder(w).Encode(response)
}

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/", handleRequest).Methods("POST")

	fmt.Println("Server at 8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}

func checkError(e error) {
	if e != nil {
		panic(e)
	}
}
