<script setup lang="ts">
import {  PlusCircleIcon, LifeBuoy,  Settings2,  SquareTerminal, SquareUser, Triangle, } from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { TooltipProvider } from 'radix-vue'
import "/src/app.js"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable'


let colours = ['red', 'green', 'yellow', 'blue', 'black', 'silver', 'gray', 'white', 'maroon', 'purple', 'fuchisa', 'lime', 'olive', 'navy', 'teal', 'aqua']

function handleButtonClick() {
    console.log('Button clicked!');
}

</script>

<template>
    <div class="grid h-screen w-full pl-[53px]">
        <aside class="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
            <div class="border-b p-2">
                <Button variant="outline" size="icon" class="invisible" aria-label="Home">
                    <Triangle class="size-5 fill-foreground " />
                </Button>
            </div>
            <nav class="grid gap-1 p-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button variant="outline" size="icon" class=" bg-muted " aria-label="VisualWrap">
                                <SquareTerminal class="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" :side-offset="5">
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
                        <TooltipContent side="right" :side-offset="5">
                            Settings
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
            <nav class="mt-auto grid gap-1 p-2">
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
        <div class="flex flex-col">
            <header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
                <h1 class="text-3xl font-untitledSans font-medium ">
                    VisualWrap
                </h1>

            </header>
            <main class="grid flex-1 gap-4 overflow-auto w-full p-4 md:grid-cols-1 lg:grid-cols-1">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel :default-size="15">
                        <div class="relative hidden flex-col  items-start gap-8 md:flex pe-4">
                            <form class="grid w-full items-start gap-6">
                                <fieldset class="grid gap-6 hover:shadow-sm border p-4">
                                    <legend class="text-md font-untitledSans font-bold">
                                        Script Editor
                                    </legend>
                                    <div class="gap-3">
                                        <Label for="content"></Label>
                                        <Textarea id="code-editor" placeholder="" class="min-h-[9.5rem]" />
                                        <Button size="sm" variant="outline" id="menuRun"
                                            @click.prevent="handleButtonClick" class="mt-4">

                                            Generate</Button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle with-handle />
                    <ResizablePanel>
                        <div
                            class="relative flex h-full min-h-[50vh] flex-col border border-l-0 bg-muted/50 p-4 lg:col-span-2">
                            <div class="flex gap-1 mb-4">
                                <div v-for="c in colours">
                                    <div :class="`bg-${c} w-8 h-8 hover:border-2`"
                                        :style="{ 'background-color': c + '!important' }"></div>
                                </div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger as-child>
                                            <Button variant="ghost" size="icon" class="rounded-lg "
                                                aria-label="Add Spool">
                                                <PlusCircleIcon class=""></PlusCircleIcon>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="right" :side-offset="5">
                                            Add Spool
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div id="canvasContainer" class="canvas-container"></div>
                            <Badge variant="outline" class="absolute font-untitledSans font-light right-2 top-2">
                                Output
                            </Badge>
                            <div class="flex-1" />
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </main>
        </div>
    </div>
</template>