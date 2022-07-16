import axios from "axios";
import { moveMouse } from "./move-mouse";

function app() {
  moveMouse(100, 100, 0.001).then(() => {
    console.log("Moved mouse!");
  });
}

app();

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

const body: Request = {
  images: [
    {
      width: 1,
      height: 1,
      pixels: [
        {
          red: 230,
          green: 74,
          blue: 25,
        },
      ],
    },
  ],
};

axios
  .post("http://localhost:8080/", { ...body })
  .then((r) => console.log(r.data.data))
  .catch((e) => console.error(e));
