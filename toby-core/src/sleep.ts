/**
 * Stops execution for specified duration
 *  @param {number} timeInMillis duration of sleep
 */
export function sleep(timeInMillis: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    timeInMillis <= 0 && resolve();

    try {
      setTimeout(() => {
        resolve();
      }, timeInMillis);
    } catch (e) {
      reject(e);
    }
  });
}
