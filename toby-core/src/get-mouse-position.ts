import { MouseGetPos } from "@ahmic/autoit-js";

export type MousePosition = {
  x: number;
  y: number;
};

/**
 * Returns a mouse position
 * @returns {MousePosition} Coordinates of mouse cursor
 */
export function getMousePosition(): Promise<MousePosition> {
  return new Promise<MousePosition>(async (resolve, reject) => {
    try {
      const { x, y } = await MouseGetPos();
      resolve({ x, y });
    } catch (e: any) {
      reject(e);
    }
  });
}
