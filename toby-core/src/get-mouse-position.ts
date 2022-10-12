import robot from "robotjs";

export type MousePosition = {
    x: number;
    y: number;
}

/**
 * Returns a mouse position
 * @returns {MousePosition} Coordinates of mouse cursor
 */
export function getMousePosition(): Promise<MousePosition> {
  return new Promise<MousePosition>((resolve, reject) => {
    try {
      resolve(robot.getMousePos());
    } catch (e: any) {
      reject(e);
    }
  });
}
