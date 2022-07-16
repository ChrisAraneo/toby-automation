import axios from "axios";
import bench from "nanobench";
import robot from "robotjs";
import { findImage } from "../src/find-image";

function main() {
  captureScreenBenchmark();
  fetchSimpleResponseBenchmark();
  fetchImageSearchBenchmark();
}

function fetchImageSearchBenchmark() {
  bench("Find Image (Python)", function (b: any) {
    b.start();
    findImage("example.png")
      .then(() => {
        b.end();
      })
      .catch(() => b.end());
  });
}

type Request = {
  images: {
    width: number;
    height: number;
    pixels: {
      red: number;
      green: number;
      blue: number;
    }[];
  }[];
};

const body: Request = {
  images: [
    {
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
  ],
};

function fetchSimpleResponseBenchmark() {
  bench("Find Image (Go)", function (b: any) {
    b.start();
    test()
      .then(() => b.end())
      .catch(() => b.end());
  });
}

function test(): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await axios.post("http://localhost:8080/", { ...body });
      resolve();
    } catch (e: any) {
      reject(e);
    }
  });
}

function captureScreenBenchmark() {
  bench("Capture screen", function (b: any) {
    b.start();
    const screen = robot.screen.capture();
    console.log(screen.image);
    b.end();
  });
}

main();
