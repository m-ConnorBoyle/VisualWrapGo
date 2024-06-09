// @ts-nocheck

<script setup>
import { PlusCircleIcon, LifeBuoy, Settings2, SquareTerminal, SquareUser, Triangle, } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { TooltipProvider } from 'radix-vue'
import { coloursStore } from '/src/stores/colours-store'
import { onMounted, ref, toRaw, computed } from 'vue'
import { Slider } from '@/components/ui/slider'
import { objectStore } from './stores/objects-store'
import Line from './classes/Line'
import LineContainer from './classes/LineContainer'
import Canvas from './classes/Canvas'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import LeftBar from './LeftBar.vue'
import anime from 'animejs/lib/anime.es.js';
import ScriptEditor from './ScriptEditor.vue'
import { Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
/*import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'*/


const cStore = coloursStore()
const oStore = objectStore()
const sliderValue = ref([0])
const sliderMaxValue = computed(() => oStore.objects.length)
let colours = cStore.colours
let canvasWidth = 400;
let backgroundColour = 0xFFFFFF;


let coordData = {
    x: 0,
    y: 0
}


/*const app = new PIXI.Application({
    width: canvasWidth,
    height: canvasWidth,
    backgroundColor: 0xFFFFFF,
})*/

let app

function handleSliderChange(newValue) {
    clearStage();
    for (let i = 0; i < newValue; i++) {
        app.stage.addChild(toRaw(oStore.objects[i]).createLineObject())
    }
    app.renderer.render(app.stage)
}

function clearStage() {
    app.stage.removeChildren()
}

function handleButtonClick() {
    console.log('Button clicked!')
}

onMounted(() => {
    /*window.addEventListener('linecontainer:hover', function (event) {
        // Assuming popover is a DOM element
        let button = document.getElementById('myPopoverButton');    
        button.click();
        const popover = popoverContentRef.value
        popover.style.left = event.detail.x + 'px';
        popover.style.top = event.detail.y + 'px';
        popover.style.display = 'block';
    });*/
    let c1 = new Canvas('canvasContainer', canvasWidth, backgroundColour)
    app = c1.newApp()
    //const canvasContainer = document.getElementById('canvasContainer');
    const canvasContainer = c1.canvasContainer
    let globalZIndex = 0;
    let linesArr = []

    //app.view.classList.add('border');
    canvasContainer.appendChild(app.view);
    //canvasContainer2.appendChild(app2.view);

    /*function createHoverLines(app) {
        let hoverLines = [];
        for (let i = 0; i < 6; i++) {
            hoverLines.push(new PIXI.Graphics());
        }
        app.stage.addChild(...hoverLines);
        return hoverLines;
    }*/

    //let hoverLine1 = new PIXI.Graphics(); let hoverLine2 = new PIXI.Graphics(); let hoverLine3 = new PIXI.Graphics(); let hoverLine4 = new PIXI.Graphics(); let hoverLine5 = new PIXI.Graphics(); let hoverLine6 = new PIXI.Graphics();

    //let hoverLines = createHoverLines(app);

    //app.stage.addChild(hoverLine1, hoverLine2, hoverLine3, hoverLine4, hoverLine5, hoverLine6);
    //app2.stage.addChild(hoverLine1, hoverLine2, hoverLine3, hoverLine4, hoverLine5, hoverLine6);

    /*app.view.addEventListener('pointermove', (e) => {
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
    });*/

    /*app.view.addEventListener('pointerout', () => {
        hoverLine1.clear();
        hoverLine2.clear();
        hoverLine3.clear();
        hoverLine4.clear();
        hoverLine5.clear();
        hoverLine6.clear();
        app.renderer.render(app.stage);
    });*/

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

    function generateLineObject(startX, startY, colour1, colour2, angleInDegrees, thickness) {
        let myOffset = canvasWidth / 2;
        let startX2 = startX + myOffset;
        let startY2 = startY + myOffset;

        let line_1 = new LineContainer(canvasWidth, app)
        line_1.addLine(new Line(startX, startY, colour1, angleInDegrees, thickness, canvasWidth).createLine())
        line_1.addLine(new Line(startX2, startY2, colour1, angleInDegrees, thickness, canvasWidth).createLine())
        line_1.addLine(new Line(startX2 - canvasWidth * 1.5, startY2 - myOffset, colour1, angleInDegrees, thickness, canvasWidth).createLine())
        line_1.addLine(new Line(startX - canvasWidth, startY - canvasWidth, colour1, angleInDegrees, thickness, canvasWidth).createLine())

        let line_2 = new LineContainer(canvasWidth, app)
        line_2.addLine(new Line(startX2, startY2, colour2, 360 - angleInDegrees, thickness, canvasWidth).createLine())
        line_2.addLine(new Line(startX2 + canvasWidth, startY2, colour2, 360 - angleInDegrees, thickness, canvasWidth).createLine())
        line_2.addLine(new Line(startX - myOffset, startY2, colour2, 360 - angleInDegrees, thickness, canvasWidth).createLine())


        let line_1Object = line_1.createLineObject()
        let line_2Object = line_2.createLineObject()

        oStore.$patch((state) => {
            //state.objects.push(line_1Object)
            state.objects.push(line_1)
        })
        oStore.$patch((state) => {
            //state.objects.push(line_2Object)
            state.objects.push(line_2)
        })

        app.stage.addChild(line_1Object);
        app.stage.addChild(line_2Object);
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
            if (direction.toUpperCase() === 'LEFT') {
                yCoord = yCoord - current_line_width * Math.SQRT2;
            } else if (direction.toUpperCase() === 'UP') {
                xCoord = xCoord + current_line_width * Math.SQRT2;
            } else if (direction.toUpperCase() === 'DOWN') {
                xCoord = xCoord - current_line_width * Math.SQRT2;
            } else if (direction.toUpperCase() === 'RIGHT') {
                if (!first_flag) {
                    yCoord = yCoord + current_line_width * Math.SQRT2;
                    first_flag = true;
                } else {
                    yCoord = yCoord + current_line_width * Math.SQRT2;
                }
            }
            currentWidth = currentWidth;
            first_flag = true;
        }

        app.renderer.render(app.stage);
    }

    function addRunEventListener() {
        document.getElementById('menuRun').addEventListener('click', () => {
            clearStage();
            sliderValue.value = [0]
            oStore.$patch((state) => {
                state.objects = []
            })

            let code = document.getElementById('code-editor').value;
            let textBoxLines = code.split('\n')

            textBoxLines.forEach((line) => {
                parseCross(line, 3)
                app.renderer.render(app.stage);
            })

        });
    }
    window.addEventListener('keydown', function (event) {
        if (event.altKey && event.key === 'Enter') {
            console.log('Alt + Enter pressed!');
            clearStage();
            sliderValue.value = [0]
            oStore.$patch((state) => {
                state.objects = []
            })

            let code = document.querySelector('.ace_text-input').value;
            let textBoxLines = code.split('\n')

            textBoxLines.forEach((line) => {
                console.log('asdf')
                parseCross(line, 3)
            })

        }

    })
    //addRunEventListener();

    app.renderer.render(app.stage);

})



</script>

<template>
    <header class="sticky top-0 z-10 flex h-[57px] items-center bg-stone-800 gap-1 border-b px-4">
        <h1 class="text-3xl text-white font-untitledSans font-medium ">
            VisualWrap [TEST]
        </h1>
    </header>
    <div class="grid h-[90vh] w-full pl-[53px]">
        <LeftBar />
        <div class="flex flex-col justify-center items-center">
            <!-- here -->
            <main class="border-l gap-4 overflow-auto w-full flex md:grid-cols-1 lg:grid-cols-1 justify-center">
                <!--<ResizablePanel :default-size="15">
                        <div class="relative hidden flex-col items-start gap-8 md:flex ms-2 pe-1">
                            <form class="grid w-full items-start gap-6">
                                <fieldset class="grid gap-6 hover:shadow-sm border mt-1 p-4">
                                    <legend class="text-md font-untitledSans text-s font-bold">
                                        Script Editor
                                    </legend>
                                    <div class="gap-3">
                                        <Label for="content"></Label>
                                        <Textarea id="code-editor" placeholder=""
                                            class="min-h-[9.5rem] font-untitledSans" />
                                        <Button size="sm" variant="outline" id="menuRun"
                                            @click.prevent="handleButtonClick" class="mt-4 font-untitledSans">
                                            Generate</Button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </ResizablePanel>-->
                <div class="relative flex h-full min-h-[20vh] items-center flex-col p-4 lg:col-span-2"
                    id="mainContainer">
                    <div class="flex gap-1 mb-4 mt-6 w-1/2">
                        <Slider @update:modelValue="handleSliderChange" v-model="sliderValue" :default-value="[1]"
                            :max="sliderMaxValue" :step="1" />
                    </div>
                    <div class="relative flex gap-1 mb-6 mt-6">
                        <div v-for="c, i in colours" class="columns-1">
                            <div :class="`bg-${c} w-8 h-8 hover:border-2`"
                                :style="{ 'background-color': c + '!important' }">
                            </div>
                            <div class="text-center font-untitledSans">{{ i + 1 }}</div>
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger as-child>
                                    <Button variant="ghost" size="icon" class="rounded-lg" aria-label="Add Spool">
                                        <PlusCircleIcon class=""></PlusCircleIcon>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent class="font-untitledSans" side="right" :side-offset="5">
                                    Add Spool
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div class="flex gap-5">
                        <div id="canvasContainer" class="canvas-container"></div>
                        <div id="canvasContainer2" class="canvas-container"></div>
                    </div>
                    <div id="y-coordinate">asdf</div>
                    <div id="x-coordinate">asdf</div>
                    <div class="font-untitledSans">Cross X 100 Y 100 Spool_Up 4 Spool_Dn 1 Right plus 0 init# 20
                        passes 3 % 1.1
                        !descriptive comment</div>
                    <div class="flex-1" />
                </div>
            </main>
        </div>
    </div>
    <ScriptEditor />
    <div class="footer bg-stone-800 border-t w-full">
        <div id="coordinate1" class="text-white"></div>
    </div>
</template>

<style scoped>
.footer {
    bottom: 0%;
    position: fixed;
    height: 30px;
}

.hover-delay {
    transition: background-color 0.05 ease;
    transition: width 0.05 ease;
    transition-delay: 0.05;
}

#mainContainer {
    height: calc(100vh - 57px - 30px);
}
</style>