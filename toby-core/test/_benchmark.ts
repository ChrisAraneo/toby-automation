import axios from "axios";
import bench from "nanobench";
import { findImage } from "../src/find-image";

function main() {
  fetchSimpleResponseBenchmark();
  fetchImageSearchBenchmark();
}

function fetchImageSearchBenchmark() {
  bench("Find Image", function (b: any) {
    b.start();
    findImage("example.png")
      .then(() => b.end())
      .catch(() => b.end());
  });
}

function fetchSimpleResponseBenchmark() {
  bench("Test connection", function (b: any) {
    b.start();
    test()
      .then(() => b.end())
      .catch(() => b.end());
  });
}

function test(): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await axios.post("http://localhost:5000/hi", {});
      resolve();
    } catch (e: any) {
      reject(e);
    }
  });
}

main();
