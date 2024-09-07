import { defineStore } from "pinia"

export const objectStore = defineStore('objects', {
    state: () => ({
        objects: [],
        lastClickedContainer: null,
        canvasArr:[], 
        coordinates: {
            x: 0,
            y: 0
        }
    }),
    actions: {
        addObject(obj) {
            this.objects.push(obj)
        }
    }
})