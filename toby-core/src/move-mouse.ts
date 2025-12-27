import { MouseMove } from "@ahmic/autoit-js";
import { getMousePosition } from "./get-mouse-position";

/**
 * Ease in function
 * @param i Progress ratio (0 to 1)
 * @param sm Smoothness factor
 */
function easingIn(i: number, sm: number): number {
  return Math.pow(i, sm);
}

/**
 * Ease out function
 * @param i Progress ratio (0 to 1)
 * @param sm Smoothness factor
 */
function easingOut(i: number, sm: number): number {
  return 1 - Math.pow(1 - i, sm);
}

/**
 * Ease in-out function
 * @param i Progress ratio (0 to 1)
 * @param sm Smoothness factor
 */
function easingInOut(i: number, sm: number): number {
  if (i < 0.5) {
    return easingIn(i * 2, sm) / 2;
  } else {
    return easingOut((i - 0.5) * 2, sm) / 2 + 0.5;
  }
}

/**
 * Ease backward function (creates arc motion)
 * @param i Progress ratio (0 to 1)
 * @param sm Smoothness factor
 */
function easingBackward(i: number, sm: number): number {
  if (i < 0.5) {
    return easingInOut(i * 2, sm);
  } else {
    return easingInOut((1 - i) * 2, sm);
  }
}

/**
 * Returns a random number between min and max (inclusive)
 */
function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Move mouse smoothly with custom parameters
 * @param x2 Target x coordinate
 * @param y2 Target y coordinate
 * @param options Custom options for the movement
 * @author DtTvB
 * @link https://www.autoitscript.com/forum/topic/34182-a-smoother-mousemove/
 */
export function moveMouse(
  x2: number,
  y2: number,
  options?: {
    speed?: number;
    xVariation?: [number, number];
    yVariation?: [number, number];
    smoothness?: [number, number];
    steps?: [number, number];
  }
): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const { x: x1, y: y1 } = await getMousePosition();

      const xv = random(options?.xVariation?.[0] ?? -100, options?.xVariation?.[1] ?? 100);
      const yv = random(options?.yVariation?.[0] ?? -100, options?.yVariation?.[1] ?? 100);
      const sm = random(options?.smoothness?.[0] ?? 1.5, options?.smoothness?.[1] ?? 2.5);
      const m = random(options?.steps?.[0] ?? 50, options?.steps?.[1] ?? 160);

      for (let i = 0; i <= m; i++) {
        const ci = easingInOut(i / m, sm);
        const co = easingBackward(i / m, sm);
        const cx = x1 + (x2 - x1) * ci + xv * co;
        const cy = y1 + (y2 - y1) * ci + yv * co;
        await MouseMove(cx, cy, options?.speed ?? 1);
      }

      resolve();
    } catch (e: any) {
      reject(e);
    }
  });
}
