import robot from "robotjs";
import { Key } from "./types";

/**
 * Releases up a single key
 * @param {Key} key name of a key
 */
export function keyUp(key: Key): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      robot.keyToggle(key, 'up')
      resolve();
    } catch (e: any) {
      reject(e);
    }
  });
}
