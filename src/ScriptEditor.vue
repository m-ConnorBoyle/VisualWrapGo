<script setup>
import { onMounted, nextTick } from 'vue';
import { VAceEditor } from 'vue3-ace-editor';
import { editorStore } from './stores/editor-store'
import { ref } from 'vue';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-github';

const themes = ['github', 'chrome'];
const eStore = editorStore();
const content = ref("")

function editorInit(editor) {
    editor.setShowPrintMargin(false);
}

onMounted(() => {

});

</script>

<template>
    <div v-if="eStore.isEditorVisible" id="code-editor" class="h-[300px] w-full">
        <v-ace-editor v-model:value="content" @init="editorInit" lang="html" theme="github" style="height: 300px" />
    </div>
</template>

<style scoped>
#code-editor {
    border-top: 1px solid grey;
    position: fixed;
    bottom: 0;
}
</style>