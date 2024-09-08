import { defineStore } from "pinia";

export const objectStore = defineStore("objects", {
  state: () => ({
    objects: [],
    lastClickedContainer: null,
    canvasArr: [],
    coordinates: {
      x: 0,
      y: 0,
    },
  }),
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addObject(obj: any) {
      this.objects.push(obj);
    },
  },
});
