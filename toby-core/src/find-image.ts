import axios from "axios";
import { Point } from "bezier-js";

type ImageSearchResponse = {
  data: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

/**
 * Sends request to ImageSearch service and returns the coordinates
 */
export function findImage(filename: string): Promise<Point[]> {
  return new Promise<Point[]>(async (resolve, reject) => {
    const path = "../../toby-core/assets/" + filename;
    try {
      const response = await axios.post("http://localhost:5000/", { path });
      const data: ImageSearchResponse = response.data;

      resolve([{ x: data.data.x, y: data.data.y }]);
    } catch (e: any) {
      reject(e);
    }
  });
}
