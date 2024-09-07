<script setup>
import { ref } from 'vue'
import { editorStore } from '/src/stores/editor-store'

const eStore = editorStore()

const toggleEditor = () => {
    if (eStore.isEditorVisible) {
        eStore.$patch({ isEditorVisible: false })
    } else {
        eStore.$patch({ isEditorVisible: true })
    }
    //editorStore.$patch({ isEditorVisible: !eStore.isEditorVisible })
};


</script>

<template>
    <div class="inset-y fixed left-0 flex max-h-[80vh] pb-[40px] flex-col ">
        <nav class="grid gap-1 w-28 p-2">
        <div clas="font-untitledSans animate-pulse">Script Editor</div> 
        <div clas="font-untitledSans">Settings</div> 
        <div clas="font-untitledSans">Help</div> 
        <div clas="font-untitledSans">Account</div> 
        </nav>
    </div>
</template>

<style scoped>

</style>