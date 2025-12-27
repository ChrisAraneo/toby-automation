import { Send } from "@ahmic/autoit-js";

/**
 * Press a single key and then release it
 * @param {string} key name of a key
 */
export async function pressKey(key: string): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await Send(`{${key} down}`);
      await Send(`{${key} up}`);
      resolve();
    } catch (e: any) {
      reject(e);
    }
  });
}
