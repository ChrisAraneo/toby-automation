import robot from "robotjs";
import { Key } from "./types";

/**
 * Press a single key and then release it
 * @param {Key} key name of a key
 */
export function pressKey(key: Key): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      robot.keyTap(key);
      resolve();
    } catch (e: any) {
      reject(e);
    }
  });
}
