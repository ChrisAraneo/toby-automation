import { Send } from "@ahmic/autoit-js";

/**
 * Releases up a single key
 * @param {string} key name of a key
 */
export function keyUp(key: string): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await Send(`{${key} up}`);
      resolve();
    } catch (e: any) {
      reject(e);
    }
  });
}
