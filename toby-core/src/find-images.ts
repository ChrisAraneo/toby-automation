import axios from "axios";
import { Image } from "./read-image";

type ImageSearchResponse = {
  data: {
    data: ImageLocationOnScreen[];
  };
};

type ImageLocationOnScreen = {
  path: string;
  x: number;
  y: number;
};

/**
 * Sends request to ImageSearch service and returns the coordinates
 */
export function findImages(images: Image[]): Promise<ImageLocationOnScreen[]> {
  return new Promise<ImageLocationOnScreen[]>((resolve, reject) => {
    axios
      .post("http://localhost:8080/", { images })
      .then((response: ImageSearchResponse) => resolve(response.data.data))
      .catch((e) => reject(e));
  });
}
