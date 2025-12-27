import { Send } from "@ahmic/autoit-js";

/**
 * Presses down a single key
 * @param {string} key name of a key
 */
export function keyDown(key: string): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await Send(`{${key} down}`);
      resolve();
    } catch (e: any) {
      reject(e);
    }
  });
}
