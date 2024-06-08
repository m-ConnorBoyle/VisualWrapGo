import { defineStore } from "pinia"

export const objectStore = defineStore('objects', {
    state: () => ({
        objects: [],
        lastClickedContainer: null,
        canvasArr:[]
    }),
    actions: {
        addObject(obj) {
            this.objects.push(obj)
        }
    }
})