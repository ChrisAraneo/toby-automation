import bench from "nanobench";
import robot from "robotjs";
import { findImages } from "../src/find-images";
import { Image } from "../src/read-image";

function main() {
  captureScreenBenchmark();
  fetchImageSearchBenchmark();
}

const images: Image[] = [
  {
    path: "(none)",
    width: 1,
    height: 1,
    pixels: [
      {
        red: 230,
        green: 74,
        blue: 25,
      },
    ],
  },
];

function fetchImageSearchBenchmark() {
  bench("Find Image", function (b: any) {
    b.start();
    findImages(images)
      .then(() => b.end())
      .catch(() => b.end());
  });
}

function captureScreenBenchmark() {
  bench("Capture screen", function (b: any) {
    b.start();
    robot.screen.capture();
    b.end();
  });
}

main();
