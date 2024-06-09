<script setup>
import { PlusCircleIcon, LifeBuoy, Settings2, SquareTerminal, SquareUser, Triangle, } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { TooltipProvider } from 'radix-vue'
import { ref } from 'vue'
import { editorStore } from './stores/editor-store'

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
    <aside class="inset-y fixed left-0 z-20 flex max-h-[80vh] pb-[40px] flex-col ">
        <nav class="grid gap-1 p-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger as-child>
                        <Button variant="ghost" @click="toggleEditor" size="icon" class=""
                            id="script-editor-menu-icon" aria-label="VisualWrap">
                            <SquareTerminal class="size-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent class="font-untitledSans" side="right" :side-offset="5">
                        Script Editor
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger as-child>
                        <Button variant="ghost" size="icon" class="rounded-lg " aria-label="Settings">
                            <Settings2 class="size-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent class="font-untitledSans" side="right" :side-offset="5">
                        Settings
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger as-child>
                        <Button variant="ghost" size="icon" class="mt-auto " aria-label="Help">
                            <LifeBuoy class="size-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" :side-offset="5">
                        Help
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger as-child>
                        <Button variant="ghost" size="icon" class="mt-auto rounded-lg" aria-label="Account">
                            <SquareUser class="size-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" :side-offset="5">
                        Account
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        </nav>
    </aside>
</template>

<style scoped></style>