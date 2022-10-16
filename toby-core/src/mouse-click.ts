import robot from "robotjs";
import { sleep } from "./sleep";

const DELAY = 45;

/**
 * Clicks left mouse button in current mouse position
 */
export function mouseClick(): Promise<void> {
  return mouseLeftClick();
}

/**
 * Clicks left mouse button in current mouse position
 */
export function mouseLeftClick(): Promise<void> {
  return _mouseClick("left");
}

/**
 * Clicks right mouse button in current mouse position
 */
export function mouseRightClick(): Promise<void> {
  return _mouseClick("right");
}

/**
 * Holds left mouse button in current mouse position and releases it after short delay
 */
export function mouseLeftClickLong(): Promise<void> {
  return _mouseClick("left", DELAY);
}

/**
 * Holds right mouse button in current mouse position and releases it after short delay
 */
export function mouseRightClickLong(): Promise<void> {
  return _mouseClick("right", DELAY);
}

function _mouseClick(
  button: "left" | "right",
  delay: number = 0
): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      robot.mouseToggle("down", button);
      await sleep(Math.floor(Math.random() * 2) + delay);
      robot.mouseToggle("up", button);
      await sleep(Math.floor(Math.random() * 2) + delay);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
