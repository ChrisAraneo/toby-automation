import { Send } from "@ahmic/autoit-js";

/**
 * Types specified text
 * @param {string} text string to type
 */
export async function typeText(text: string): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await Send(text);
      resolve();
    } catch (e: any) {
      reject(e);
    }
  });
}
