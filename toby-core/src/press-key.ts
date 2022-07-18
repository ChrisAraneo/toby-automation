import robot from "robotjs";

/**
 * Press a single key
 * @param {Key} key name of a key
 */
export function pressKey(key: Key): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      robot.keyTap(key);
      resolve();
    } catch (e: any) {
      reject(e);
    }
  });
}

type Key =
  | "backspace"
  | "delete"
  | "enter"
  | "tab"
  | "escape"
  | "up"
  | "down"
  | "right"
  | "left"
  | "home"
  | "end"
  | "pageup"
  | "pagedown"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6"
  | "f7"
  | "f8"
  | "f9"
  | "f10"
  | "f11"
  | "f12"
  | "command"
  | "alt"
  | "control"
  | "shift"
  | "right_shift"
  | "space";
