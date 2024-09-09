<script setup lang='ts'>
//import { editorStore } from "@/stores/editor-store";

//const eStore = editorStore();

/*const toggleEditor = () => {
  if (eStore.isEditorVisible) {
    eStore.$patch({ isEditorVisible: false });
  } else {
    eStore.$patch({ isEditorVisible: true });
  }
  //editorStore.$patch({ isEditorVisible: !eStore.isEditorVisible })
};*/
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

</script>

<template>
  <div class="inset-y fixed left-0 flex max-h-[80vh] pb-[40px] flex-col">
    <nav class="grid gap-1 w-28 p-2">
      <div class="font-untitledSans"> {{ t('message.components.LeftBar.SCRIPT_EDITOR') }}</div>
      <div class="font-untitledSans"> {{ t('message.components.LeftBar.SETTINGS') }}</div>
      <div class="font-untitledSans"> {{ t('message.components.LeftBar.HELP') }}</div>
      <div class="font-untitledSans"> {{ t('message.components.LeftBar.ACCOUNT') }}</div>
    </nav>
  </div>
</template>

<style scoped></style>
