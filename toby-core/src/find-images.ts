import * as net from "net";
import { Image } from "./types";

type ImageSearchResponse = {
  data: ImageLocationOnScreen[];
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
    const client = net.createConnection({ port: 8080, host: "localhost" }, () => {
      const requestData = JSON.stringify({ images });
      const requestBuffer = Buffer.from(requestData);

      const lengthBuffer = Buffer.allocUnsafe(4);
      lengthBuffer.writeUInt32BE(requestBuffer.length, 0);

      client.write(lengthBuffer);
      client.write(requestBuffer);
    });

    let responseLength: number | null = null;
    let responseData = Buffer.alloc(0);

    client.on("data", (data) => {
      responseData = Buffer.concat([responseData, data]);

      if (responseLength === null && responseData.length >= 4) {
        responseLength = responseData.readUInt32BE(0);
        responseData = responseData.slice(4);
      }

      if (responseLength !== null && responseData.length >= responseLength) {
        const jsonData = responseData.slice(0, responseLength).toString();
        const response: ImageSearchResponse = JSON.parse(jsonData);

        const results = [];
        response.data.forEach((item) => {
          const result = {};
          Object.getOwnPropertyNames(item).forEach((key) => {
            result[key.toLocaleLowerCase()] = item[key];
          });
          results.push(result);
        });

        client.end();
        resolve(results);
      }
    });

    client.on("error", (err) => {
      reject(err);
    });

    client.on("close", () => {
      if (responseLength === null || responseData.length < responseLength) {
        reject(new Error("Connection closed before receiving complete response"));
      }
    });
  });
}
