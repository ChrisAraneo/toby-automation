import { autoit } from "@ahmic/autoit-js";
import { findImages } from "./find-images";
import { moveMouse } from "./move-mouse";
import { readImage } from "./read-image";

async function app() {
  autoit.load();

  readImage("../assets/example.png").then((image) => {
    moveMouse(100, 100, { speed: 1, steps: [100, 100] }).then(() => {
      findImages([image])
        .then((r) => console.log(r))
        .catch((e) => console.error(e));
    });
  });
}

app();
