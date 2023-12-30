import { pathLofi1, pathLofi2,pathLofi3, pathLofi4,pathLofi5, reality1, reality2, reality3, reality4, reality5, reality6, reality7 } from "./videoBackgroundData";

const typeLofi = [
  {
    id: 0,
    nameType: "LOFI",
    video: [
        // pathLofi1,
        // pathLofi2
      { id: 0, name: "lofi1", data: pathLofi1 },
      { id: 1, name: "lofi2", data: pathLofi2 },
      { id: 2, name: "lofi3", data: pathLofi3 },
      { id: 3, name: "lofi4", data: pathLofi4 },
      { id: 4, name: "lofi5", data: pathLofi5 },
    ],
  },
  {
    id: 1,
    nameType: "Reality",
    video: [ { id: 0, name: "reality", data: reality1 }, { id: 1, name: "reality", data: reality2 }, { id: 2, name: "reality", data: reality3 }, { id: 3, name: "reality", data: reality4 }, { id: 4, name: "reality", data: reality5 }, { id: 5, name: "reality", data: reality6 }, { id: 6, name: "reality", data: reality7 }],
  },
  {
    id: 2,
    nameType: "Interact",
    video: [],
  },
];

export { typeLofi };
