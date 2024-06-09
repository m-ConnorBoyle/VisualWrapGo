import { defineStore } from "pinia"

export const editorStore = defineStore('editor', {
    state: () => ({
        isEditorVisible: true,
    }),
})