import { findImage } from "./find-image";
import { moveMouse } from "./move-mouse";

moveMouse(100, 100, 0.001).then(() => {
  console.log("Moved mouse!");

  findImage("start.png")
    .then((result) => console.log(result))
    .catch((e) => console.log(e));
});
