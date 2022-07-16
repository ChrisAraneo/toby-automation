import robot from "robotjs";

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

function _mouseClick(button: "left" | "right"): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      robot.mouseClick(button);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
