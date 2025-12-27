package main

import (
	"encoding/json"
	"fmt"
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
	Path   string  `json:"path"`
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
	Path string `json:string`
	X    int    `json:"x"`
	Y    int    `json:"y"`
}

func SearchImage(img Image) []Coordinates {
	screen, err := screenshot.CaptureScreen()
	checkError(err)

	precision := int(15)

	bounds := screen.Bounds()
	width, height := bounds.Max.X, bounds.Max.Y

	pixels := img.Pixels
	width2 := img.Width
	height2 := img.Height

	var results = []Coordinates{}

	wg := sync.WaitGroup{}
	wg.Add(height * width)

	for y := 0; y < height; y++ {
		for x := 0; x < width; x++ {

			var ok = true

			for y2 := 0; y2 < height2; y2++ {
				for x2 := 0; x2 < width2; x2++ {
					i := ((y+y2)*width + x + x2) * 4
					r1 := int(screen.Pix[i])
					g1 := int(screen.Pix[i+1])
					b1 := int(screen.Pix[i+2])

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

			if ok {
				results = append(results, Coordinates{Path: img.Path, X: x, Y: y})
			}

			wg.Done()
		}
	}

	wg.Wait()

	return results
}

func handleRequest(w http.ResponseWriter, r *http.Request) {
	var request Request
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&request)

	var data = []Coordinates{}

	for i := 0; i < len(request.Images); i++ {

		result := SearchImage(request.Images[i])

		for j := 0; j < len(result); j++ {
			data = append(data, result[j])
		}
	}

	response := Response{Data: data}

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
