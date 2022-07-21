export type Key =
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

export type Image = {
  path: string;
  width: number;
  height: number;
  pixels: {
    red: number;
    green: number;
    blue: number;
  }[];
};
