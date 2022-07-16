import { findImages } from "./find-images";
import { moveMouse } from "./move-mouse";
import { readImage } from "./read-image";

function app() {
  readImage("../toby-core/assets/example.png").then((image) => {
    moveMouse(100, 100, 0.025).then(() => {
      findImages([image])
        .then((r) => console.log(r))
        .catch((e) => console.error(e));
    });
  });
}

app();
