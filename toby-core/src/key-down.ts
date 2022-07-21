import robot from "robotjs";
import { Key } from "./types";

/**
 * Presses down a single key
 * @param {Key} key name of a key
 */
export function keyDown(key: Key): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      robot.keyToggle(key, 'down')
      resolve();
    } catch (e: any) {
      reject(e);
    }
  });
}
