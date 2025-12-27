import {} from "@ahmic/autoit-js";
import bench from "nanobench";
import { findImages } from "../src/find-images";

function main() {
  fetchImageSearchBenchmark();
}

const images = [
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

main();
