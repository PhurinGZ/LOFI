import { pathLofi1, pathLofi2,pathLofi3 } from "./videoBackgroundData";

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
    ],
  },
  {
    id: 1,
    nameType: "Reality",
    video: [],
  },
  {
    id: 2,
    nameType: "Interact",
    video: [],
  },
];

export { typeLofi };
