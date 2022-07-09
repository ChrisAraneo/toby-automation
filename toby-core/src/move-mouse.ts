import { Bezier } from "bezier-js";
import robot from "robotjs";

/**
 * Move mouse in straight line from current location to x, y
 * @param {number} x x coordinate
 * @param {number} y y coordinate
 * @param {number} speed speed of movement, number between 0 and 1
 */
export function moveMouse(x: number, y: number, speed: number): Promise<void> {
  const start = robot.getMousePos();
  const points = [
    { x: start.x, y: start.y },
    { x: x, y: y },
  ];
  const distance = Math.sqrt(Math.pow(points[0].x - points[1].x, 2) + Math.pow(points[0].y - points[1].y, 2));
  const normalizedSpeed = speed <= 0 ? 0 : speed >= 1 ? 1 : speed;
  const steps = new Bezier(points).getLUT(Math.floor(0.15 * distance * normalizedSpeed) + 2);

  return new Promise<void>((resolve, reject) => {
    try {
      steps.forEach((step) => {
        robot.moveMouse(step.x, step.y);
      });
      resolve();
    } catch (e: any) {
      reject(e);
    }
  });
}
