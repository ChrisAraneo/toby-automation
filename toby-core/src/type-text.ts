import robot from "robotjs";

/**
 * Types specified text
 * @param {string} text string to type
 */
export function typeText(text: string): Promise<void> {
  const letters = text.split("");

  return new Promise<void>((resolve, reject) => {
    try {
      letters.forEach((letter) => {
        const charactersPerMinute = Math.floor(220 + Math.random() * 80);
        robot.typeStringDelayed(letter, charactersPerMinute);
      });
      resolve();
    } catch (e: any) {
      reject(e);
    }
  });
}
