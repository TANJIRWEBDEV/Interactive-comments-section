import Amy from "../assets/image-amyrobson.png";
import Juli from "../assets/image-juliusomo.png";
import Max from "../assets/image-maxblagun.png";
import Ram from "../assets/image-ramsesmiron.png";
import Deletei from "../assets/icon-delete.svg";
import Editi from "../assets/icon-edit.svg";
import Minusi from "../assets/icon-minus.svg";
import Plusi from "../assets/icon-plus.svg";
import Replyi from "../assets/icon-reply.svg";

const data = [
  {
    id: 1,
    votes: [
      { id: 11, vote: 1 },
      { id: 12, vote: 1 },
      { id: 13, vote: 1 },
      { id: 15, vote: 1 },
      { id: 16, vote: 1 },
      { id: 17, vote: 1 },
    ],
    img: Amy,
    name: "amyrobson",
    timestamp: new Date("2023-05-10").getTime(),
    cId: 231,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo perspiciatis obcaecati, quaerat distinctio veniam fugiat!",
    replys: [],
  },
  {
    id: 2,
    votes: [
      { id: 21, vote: 1 },
      { id: 22, vote: 1 },
      { id: 23, vote: 1 },
      { id: 25, vote: 1 },
      { id: 26, vote: 1 },
    ],
    img: Max,
    name: "maxblagun",
    timestamp: new Date("2023-06-10").getTime(),
    cId: 232,
    comment:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum molestias consequuntur odio aperiam cum? Possimus minus tempora eius neque harum.",
    replys: [
      {
        id: 2.1,
        votes: [
          { id: 31, vote: 1 },
          { id: 32, vote: 1 },
          { id: 33, vote: 1 },
          { id: 35, vote: 1 },
        ],
        img: Ram,
        name: "ramsesmiron",
        timestamp: new Date("2023-06-25").getTime(),
        cId: 233,

        comment:
          "@maxblagun Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum molestias consequuntur odio aperiam cum? Possimus minus tempora eius neque harum.",
      },
      {
        id: 2.2,
        votes: [
          { id: 221, vote: 1 },
          { id: 222, vote: 1 },
          { id: 223, vote: 1 },
        ],
        img: Juli,
        name: "juliusomo",
        timestamp: new Date("2023-08-17").getTime(),
        cId: 234,
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, dolorum doloribus illo molestiae itaque consectetur minima, ratione quas voluptatibus voluptatem quaerat impedit necessitatibus!",
      },
    ],
  },
];

export { data, Deletei, Editi, Minusi, Plusi, Replyi, Juli };
