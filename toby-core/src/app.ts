import axios from "axios";
import { moveMouse } from "./move-mouse";
import { readImage } from "./read-image";

type Request = {
  images: {
    width: number;
    height: number;
    pixels: {
      red: number;
      green: number;
      blue: number;
    }[];
  }[];
};

function app() {
  readImage("../toby-core/assets/example.png").then((image) => {
    const body: Request = {
      images: [
        {
          ...image,
        },
      ],
    };

    moveMouse(100, 100, 0.025).then(() => {
      axios
        .post("http://localhost:8080/", { ...body })
        .then((r) => console.log(r.data.data))
        .catch((e) => console.error(e));
    });
  });
}

app();
