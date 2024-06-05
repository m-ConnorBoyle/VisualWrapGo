import { defineStore } from "pinia"

export const objectStore = defineStore('objects', {
    state: () => ({
        objects: []
    }),
    actions: {
        addObject(obj) {
            this.objects.push(obj)
        }
    }
})