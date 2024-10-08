import { defineStore } from "pinia";

export const coloursStore = defineStore("colours", {
  state: () => ({
    colours: [
      "red",
      "green",
      "yellow",
      "blue",
      "black",
      "silver",
      "gray",
      "white",
      "maroon",
      "purple",
      "fuchisa",
      "lime",
      "olive",
      "navy",
      "teal",
      "aqua",
    ],
    selectedColour: "",
  }),
});
