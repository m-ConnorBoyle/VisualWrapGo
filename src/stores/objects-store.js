import { defineStore } from "pinia"

export const objectStore = defineStore('objects', {
    state: () => ({
        objects: {}
    })
})