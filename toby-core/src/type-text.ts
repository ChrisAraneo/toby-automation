import robot from "robotjs";

/**
 * Types specified text
 * @param {string} text string to type
 */
export function typeText(text: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      robot.typeString(text);
      resolve();
    } catch (e: any) {
      reject(e);
    }
  });
}
