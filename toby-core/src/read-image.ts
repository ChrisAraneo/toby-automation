import fs from "fs";
import pngjs from "pngjs";

export type Image = {
  path: string;
  width: number;
  height: number;
  pixels: {
    red: number;
    green: number;
    blue: number;
  }[];
};

/**
 * Reads png image file and converts it
 * @param {string} path path to png image location
 */
export function readImage(path: string): Promise<Image> {
  return new Promise<Image>((resolve, reject) => {
    try {
      fs.createReadStream(path)
        .pipe(
          new pngjs.PNG({
            filterType: 4,
          })
        )
        .on("parsed", function () {
          const result: Image = {
            path,
            width: this.width,
            height: this.height,
            pixels: [],
          };

          for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
              const idx = (this.width * y + x) << 2;

              const red = this.data[idx];
              const green = this.data[idx + 1];
              const blue = this.data[idx + 2];

              result.pixels.push({ red, green, blue });
            }
          }

          resolve(result);
        });
    } catch (e) {
      reject(e);
    }
  });
}
