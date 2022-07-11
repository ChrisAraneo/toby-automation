import { findImage } from "./find-image";
import { moveMouse } from "./move-mouse";

function app() {
  moveMouse(100, 100, 0.001).then(() => {
    console.log("Moved mouse!");

    findImage("example.png")
      .then((result) => console.log(result))
      .catch((e) => console.error(e));
  });
}

app();
