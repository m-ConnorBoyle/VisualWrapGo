<script setup lang="ts">
import { PlusCircleIcon, LifeBuoy, Settings2, SquareTerminal, SquareUser, Triangle, } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { TooltipProvider } from 'radix-vue'
import { coloursStore } from '/src/stores/colours-store'
import { onMounted, onUnmounted, ref, nextTick, watchEffect, computed } from 'vue'
import { Slider } from '@/components/ui/slider'
import { objectStore } from './stores/objects-store'
import { DateField } from 'radix-vue/namespaced'
import Line from './classes/Line'
import LineContainer from './classes/LineContainer'

const cStore = coloursStore()
const oStore = objectStore()
const sliderValue = ref([0])
//const sliderMaxValue = ref(oStore.objects.length)
const sliderMaxValue = computed(() => oStore.objects.length)

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable'

let colours = cStore.colours

let canvasWidth = 400;
const app = new PIXI.Application({
    width: canvasWidth,
    height: canvasWidth,
    backgroundColor: 0xFFFFFF,
})

function handleSliderChange(newValue) {
    clearStage();
    for (let i = 0; i < newValue; i++) {
        app.stage.addChild(oStore.objects[i]);
    }
    app.renderer.render(app.stage);
}

function clearStage() {
    app.stage.removeChildren();
}

function handleButtonClick() {
    console.log('Button clicked!');
}

onMounted(() => {
    const canvasContainer = document.getElementById('canvasContainer');
    let globalZIndex = 0;
    let linesArr = []


    app.view.classList.add('border');
    canvasContainer.appendChild(app.view);

    let hoverLine1 = new PIXI.Graphics(); let hoverLine2 = new PIXI.Graphics(); let hoverLine3 = new PIXI.Graphics(); let hoverLine4 = new PIXI.Graphics(); let hoverLine5 = new PIXI.Graphics(); let hoverLine6 = new PIXI.Graphics();

    app.stage.addChild(hoverLine1, hoverLine2, hoverLine3, hoverLine4, hoverLine5, hoverLine6);

    app.view.addEventListener('pointermove', (e) => {
        let mouseX = Math.round(e.offsetX);
        let mouseY = Math.round(e.offsetY);
        let myOffset = canvasWidth / 2;

        // Update coordinate displays
        document.getElementById('x-coordinate').textContent = mouseX;
        document.getElementById('y-coordinate').textContent = mouseY;

        requestAnimationFrame(() => {
            hoverLine1.clear(); hoverLine2.clear(); hoverLine3.clear(); hoverLine4.clear(); hoverLine5.clear(); hoverLine6.clear();

            drawDottedLine(hoverLine1, { x: mouseX, y: mouseY }, Math.PI / 4, 800, 0x000000, 2, [3, 3])
            drawDottedLine(hoverLine2, { x: mouseX, y: mouseY }, -Math.PI / 4, 800, 0x000000, 2, [3, 3])
            drawDottedLine(hoverLine3, { x: mouseX + myOffset, y: mouseY - myOffset }, Math.PI / 4, 800, 0x000000, 2, [3, 3])
            drawDottedLine(hoverLine4, { x: mouseX, y: mouseY - canvasWidth }, -Math.PI / 4, 800, 0x000000, 2, [3, 3])
            drawDottedLine(hoverLine5, { x: mouseX + myOffset, y: mouseY + myOffset }, -Math.PI / 4, 800, 0x000000, 2, [3, 3])
            drawDottedLine(hoverLine6, { x: mouseX - myOffset, y: mouseY + myOffset }, Math.PI / 4, 800, 0x000000, 2, [3, 3])

            app.renderer.render(app.stage);
        });
    });

    app.view.addEventListener('pointerout', () => {
        hoverLine1.clear();
        hoverLine2.clear();
        hoverLine3.clear();
        hoverLine4.clear();
        hoverLine5.clear();
        hoverLine6.clear();
        app.renderer.render(app.stage);
    });

    function drawDottedLine(graphics, start, angle, distance, color, lineWidth, dashArray) {
        const [dashSize, gapSize] = dashArray;
        const dashLength = dashSize + gapSize;
        const dashCount = Math.floor((distance * 2) / dashLength);

        const dx = Math.cos(angle);
        const dy = Math.sin(angle);

        for (let i = -dashCount / 2; i < dashCount / 2; i++) {
            const segmentStartX = start.x + (i * dashLength) * dx;
            const segmentStartY = start.y + (i * dashLength) * dy;
            const segmentEndX = segmentStartX + (dashSize * dx);
            const segmentEndY = segmentStartY + (dashSize * dy);

            graphics.lineStyle(lineWidth, color);
            graphics.moveTo(segmentStartX, segmentStartY);
            graphics.lineTo(segmentEndX, segmentEndY);
        }
    }

    let currentColour

    function generateLineObject(startX, startY, colour1, colour2, angleInDegrees, thickness) {
        let myOffset = canvasWidth / 2;
        let startX2 = startX + myOffset;
        let startY2 = startY + myOffset;
        /*let lineContainer = new PIXI.Container();
        let subContainer1 = new PIXI.Container();
        let subContainer2 = new PIXI.Container();

        lineContainer.colour1 = colour1
        lineContainer.colour2 = colour2
        lineContainer.interactive = true;
        subContainer2.interactive = true;
        lineContainer.buttonMode = true;
        subContainer2.buttonMode = true;
        let myOffset = canvasWidth / 2;
        let startX2 = startX + myOffset;
        let startY2 = startY + myOffset;*/

        let line_1 = new LineContainer(canvasWidth, app)
        line_1.addLine(new Line(startX, startY, colour1, angleInDegrees, thickness, canvasWidth).createLine())
        line_1.addLine(new Line(startX2, startY2, colour1, angleInDegrees, thickness, canvasWidth).createLine()) 
        line_1.addLine(new Line(startX2 - canvasWidth * 1.5, startY2 - myOffset, colour1, angleInDegrees, thickness, canvasWidth).createLine())
        line_1.addLine(new Line(startX - canvasWidth, startY - canvasWidth, colour1, angleInDegrees, thickness, canvasWidth).createLine())

        let line_2 = new LineContainer(canvasWidth, app)
        line_2.addLine(new Line(startX2, startY2, colour2, 360 - angleInDegrees, thickness, canvasWidth).createLine())
        line_2.addLine(new Line(startX2 + canvasWidth, startY2, colour2, 360 - angleInDegrees, thickness, canvasWidth).createLine())
        line_2.addLine(new Line(startX - myOffset, startY2, colour2, 360 - angleInDegrees, thickness, canvasWidth).createLine())
        //let graphics1 = new Line(startX, startY, colour1, angleInDegrees, thickness, canvasWidth).createLine()
        //subContainer1.addChild(graphics1);

        //let graphics2 = new Line(startX2, startY2, colour1, angleInDegrees, thickness, canvasWidth).createLine()
        //subContainer1.addChild(graphics2);

        let graphics3 = new Line(startX2, startY2, colour2, 360 - angleInDegrees, thickness, canvasWidth).createLine()
        //subContainer2.addChild(graphics3);

        let graphics4 = new Line(startX2 + canvasWidth, startY2, colour2, 360 - angleInDegrees, thickness, canvasWidth).createLine()
        //subContainer2.addChild(graphics4);

//        let graphics5 = new Line(startX2 - canvasWidth * 1.5, startY2 - myOffset, colour1, angleInDegrees, thickness, canvasWidth).createLine()
        //subContainer1.addChild(graphics5);

//        let graphics6 = new Line(startX - canvasWidth, startY - canvasWidth, colour1, angleInDegrees, thickness, canvasWidth).createLine()
        //subContainer1.addChild(graphics6);

        let graphics7 = new Line(startX - myOffset, startY2, colour2, 360 - angleInDegrees, thickness, canvasWidth).createLine()
        //subContainer2.addChild(graphics7);

        /*function onPointerOver(container) {
            container.on('pointerover', (e) => {
                if (!dragging) {
                    const localPosition = e.data.getLocalPosition(app.stage);
                    // Use localPosition.x and localPosition.y as needed
                    //console.log('Mouse position on lineContainer:', localPosition.x, localPosition.y);
                    container.children.forEach(child => {
                        if (localPosition.x > 0 && localPosition.x < canvasWidth && localPosition.y > 0 && localPosition.y < canvasWidth) {
                            child.alpha = 0.5
                            //console.log('inside the app.view')
                            child.originalColour = child.tint
                            currentColour = child.colour
                            //child.tint = 0x008000;
                        }
                    });
                }
            });
        }*/

        /*function onPointerOut(container) {
            container.on('pointerout', () => {
                container.children.forEach(child => {
                    //child.tint = child.originalColour
                    child.alpha = 1
                    /*if (child.tint === 0x008000) {
                        child.tint = currentColour
                    }
                });
            });
        }*/

        //onPointerOver(subContainer1);
        //onPointerOver(subContainer2);
        //onPointerOut(subContainer2);

        /*lineContainer.on('pointerover', (e) => {
            if (!dragging) {
                const localPosition = e.data.getLocalPosition(app.stage);
                // Use localPosition.x and localPosition.y as needed
                //console.log('Mouse position on lineContainer:', localPosition.x, localPosition.y);
                lineContainer.children.forEach(child => {
                    if (localPosition.x > 0 && localPosition.x < canvasWidth && localPosition.y > 0 && localPosition.y < canvasWidth) {
                        child.alpha = 0.5
                        //console.log('inside the app.view')
                        child.originalColour = child.tint
                        currentColour = child.colour
                        //child.tint = 0x008000;
                    }
                });
            }
        });*/

        /*lineContainer.on('pointerout', () => {
            lineContainer.children.forEach(child => {
                //child.tint = child.originalColour
                child.alpha = 1
                /*if (child.tint === 0x008000) {
                    child.tint = currentColour
                }
            });
        });*/

        //Dragging
        //let dragging = false;

        /*subContainer2.on('pointerdown', (event) => {
            subContainer2.alpha = 0.5; // Visual cue for dragging
            dragging = true;
            subContainer2.draggingData = event.data;
            subContainer2.startPosition = subContainer2.toGlobal(event.data.getLocalPosition(subContainer2));

            // Start global move listener
            app.view.addEventListener('pointermove', (event) => onDragMove(event, subContainer2));
        });*/


        /*lineContainer.on('pointerdown', (event) => {
            lineContainer.alpha = 0.5; // Visual cue for dragging
            dragging = true;
            lineContainer.draggingData = event.data;
            lineContainer.startPosition = lineContainer.toGlobal(event.data.getLocalPosition(lineContainer));

            // Start global move listener
            app.view.addEventListener('pointermove', onDragMove);
        });*/

        /*function onDragMove(event, container) {
            if (dragging) {
                const newPosition = container.draggingData.getLocalPosition(app.stage);
                container.x += (newPosition.x - container.startPosition.x);
                container.y += (newPosition.y - container.startPosition.y);
                container.startPosition = newPosition;
            }
        }*/

        /*function onDragMove(event) {
            if (dragging) {
                const newPosition = lineContainer.draggingData.getLocalPosition(app.stage);
                lineContainer.x += (newPosition.x - lineContainer.startPosition.x);
                lineContainer.y += (newPosition.y - lineContainer.startPosition.y);
                lineContainer.startPosition = newPosition;
            }
        }*/

        /*function endDrag(event, container) {
            dragging = false;
            container.alpha = 1;
            // Stop global move listener
            app.view.removeEventListener('pointermove', onDragMove(undefined, subContainer2));
            container.data = null;
        }*/

        //lineContainer.on('pointerup', endDrag);
        //subContainer2.on('pointerup', (event) => endDrag(event, subContainer2));
        //subContainer2.on('pointerupoutside', (event) => endDrag(event, subContainer2));
        //lineContainer.on('pointerupoutside', endDrag);

        //lineContainer.addChild(subContainer1);
        

        //KEEP THIS 
        /*oStore.$patch((state) => {
            state.objects.push(subContainer1)
        })
        oStore.$patch((state) => {
            state.objects.push(subContainer2)
        })*/
        //END KEEP THIS


        //app.stage.addChild(lineContainer);
        //app.stage.addChild(subContainer1);
        app.stage.addChild(line_1.createLineObject());
        app.stage.addChild(line_2.createLineObject());
        //app.stage.addChild(subContainer2);
        //oStore.addObject(lineContainer)

        //console.log(oStore.objects)
    }

    function getNumberAfterKeyword(sentence, keyword) {
        const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`${escapedKeyword}\\s+(\\S+)`, 'i');
        const matches = sentence.match(regex);
        return Number(matches ? matches[1] : null)
    }

    function getWordAfterKeyword(sentence, keyword) {
        const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
        const regex = new RegExp(`${escapedKeyword}[^\\s]*\\s+(\\S+)`, 'i')
        const matches = sentence.match(regex)
        return matches ? matches[1] : null
    }

    function findFirstWordAfterFourthNumber(sentence) {
        // Regex pattern to find the first word after the fourth number
        const pattern = /(?:\d+\D+){3}\d+[^a-zA-Z\d]*(\w+)/;
        const match = sentence.match(pattern);
        return match ? match[1] : null; // Return the word if found, otherwise return null
    }

    function regenerateTimeline(n) {
        clearStage();
        /*oStore.objects.forEach((object) => {
            app.stage.addChild(object);
        });*/
        for (let i = 0; i < n; i++) {
            app.stage.addChild(oStore.objects[i]);
        }
        app.renderer.render(app.stage);
    }

    function parseCross(str) {
        let xCoord = getNumberAfterKeyword(str, 'x') * 1;
        let yCoord = getNumberAfterKeyword(str, 'y') * 1;
        let color1 = getWordAfterKeyword(str, 'Spool');
        let color2 = getWordAfterKeyword(str, 'Spool_Dn');
        let band = getNumberAfterKeyword(str, 'Band') * 1;
        let minus = getNumberAfterKeyword(str, 'minus') * 1;
        let plus = getNumberAfterKeyword(str, 'plus') * 1;
        let progressionType = "";
        if (minus != 0) {
            progressionType = "minus";
        } else if (plus != 0) {
            progressionType = "plus";
        } else if (band != 0) {
            progressionType = 'band';
        }
        let direction = findFirstWordAfterFourthNumber(str);
        let init = getNumberAfterKeyword(str, 'init#');
        let passes = getNumberAfterKeyword(str, 'passes');
        let gradient = getNumberAfterKeyword(str, '%') * 1;

        let currentWidth = init;
        let first_flag = false;
        let current_line_width = init;

        for (let i = 0; i < passes; i++) {
            let current_line_width2 = current_line_width;
            if (band === 0 && first_flag) {
                if (progressionType === "plus") {
                    current_line_width = init + plus * i;
                } else if (progressionType === 'minus') {
                    current_line_width = init + minus * i;
                }
            }
            generateLineObject(xCoord, yCoord, colours[Number(color1) - 1], colours[Number(color2) - 1], -45, current_line_width);
            console.log(oStore.objects[i])
            if (direction === 'Left') {
                yCoord = yCoord - current_line_width * Math.SQRT2;
            } else if (direction === 'Up') {
                xCoord = xCoord + current_line_width * Math.SQRT2;
            } else if (direction === 'Down') {
                xCoord = xCoord - current_line_width * Math.SQRT2;
            } else if (direction === 'Right') {
                if (!first_flag) {
                    yCoord = yCoord + current_line_width * Math.SQRT2;
                    first_flag = true;
                } else {
                    yCoord = yCoord + current_line_width * Math.SQRT2;
                }
            }
            currentWidth = currentWidth;
            first_flag = true;
            //}
        }

        app.renderer.render(app.stage);
    }

    //let iterator = 0
    function addRunEventListener() {
        document.getElementById('menuRun').addEventListener('click', () => {
            clearStage();
            sliderValue.value = [0]
            oStore.$patch((state) => {
                state.objects = []
            })

            let code = document.getElementById('code-editor').value;
            let textBoxLines = code.split('\n')

            textBoxLines.forEach((line, iterator) => {
                parseCross(line, 3)
                //iterator++
            })

        });
    }
    addRunEventListener();

    app.renderer.render(app.stage);


})



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
                    VisualWrap [TEST]
                </h1>

            </header>
            <main class="grid flex-1 gap-4 overflow-auto w-full md:grid-cols-1 lg:grid-cols-1">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel :default-size="15">
                        <div class="relative hidden flex-col items-start gap-8 md:flex ms-2 pe-4">
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
                    <ResizableHandle id="resizable-handle1" @mouseenter="console.log('asdf')" ref="resizeHandle"
                        class="w-1 hover-delay" with-handle />
                    <ResizablePanel>
                        <div
                            class="relative flex h-full min-h-[50vh] flex-col border border-l-0 bg-muted/50 p-4 lg:col-span-2">
                            <div class="flex gap-1 mb-4">
                                <Slider @update:modelValue="handleSliderChange" v-model="sliderValue"
                                    :default-value="[1]" :max="sliderMaxValue" :step="1" />
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
                            <div id="y-coordinate">asdf</div>
                            <div id="x-coordinate">asdf</div>
                            <div>Cross X 100 Y 100 Spool_Up 4 Spool_Dn 1 Right plus 0 init# 20 passes 3 % 1.1
                                !descriptive comment</div>
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

<style scoped>
.hover-delay {
    transition: background-color 0.05 ease;
    transition: width 0.05 ease;
    transition-delay: 0.05;
}
</style>