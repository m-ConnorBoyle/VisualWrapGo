// @ts-nocheck

<script setup>
import { coloursStore } from '/src/stores/colours-store'
import { onMounted, ref, toRaw, computed } from 'vue'
import { objectStore } from './stores/objects-store'
import Line from './classes/Line'
import LineContainer from './classes/LineContainer'
import Canvas from './classes/Canvas'
import LeftBar from './LeftBar.vue'
import anime from 'animejs/lib/anime.es.js';
import ScriptEditor from './ScriptEditor.vue'
import { getFirstWord, getNumberAfterKeyword, getWordAfterKeyword, findFirstWordAfterFourthNumber } from './helpers.ts'
import { editorStore } from './stores/editor-store'

/*import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'*/


const cStore = coloursStore()
const oStore = objectStore()
const eStore = editorStore()
const sliderValue = ref([0])
const sliderMaxValue = computed(() => oStore.objects.length)
//const sliderMaxValue = ref(100)
let colours = cStore.colours
let canvasWidth = 400;
let backgroundColour = 0xFFFFFF;
let app

function handleSliderChange(event) {
    let newValue = event.target.value
    clearStage();

    for (let i = 0; i < newValue; i++) {

        if (oStore.objects.length > 0) {
            if (i < oStore.objects.length) {
                console.log("changed")
                app.stage.addChild(toRaw(oStore.objects[i]).createLineObject())
                //app.stage.addChild(toRaw(oStore.objects[i]))
                //app.stage.addChild(toRaw(oStore.objects[i]).createLineObject())
                app.renderer.render(app.stage)
                //app.renderer.textureGC.run(); // Manually run texture garbage collection*/
            }
        }
    }
}


function clearStage() {
    app.stage.removeChildren()
}


onMounted(() => {
    let c1 = new Canvas('canvasContainer', canvasWidth, backgroundColour)
    app = c1.newApp()
    const canvasContainer = c1.canvasContainer
    let globalZIndex = 0;
    let linesArr = []

    canvasContainer.appendChild(app.view);

    function generateCrossObject(startX, startY, colour1, colour2, angleInDegrees, thickness) {
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

    function generateThreadObject(startX, startY, colour, angleInDegrees, thickness, type) {
        let myOffset = canvasWidth / 2;
        let startX2 = startX + myOffset;
        let startY2 = startY + myOffset;

        let line
        if (type === 'threadDown') {
            line = new LineContainer(canvasWidth, app)
            line.addLine(new Line(startX, startY, colour, angleInDegrees, thickness, canvasWidth).createLine())
            line.addLine(new Line(startX2, startY2, colour, angleInDegrees, thickness, canvasWidth).createLine())
            line.addLine(new Line(startX2 - canvasWidth * 1.5, startY2 - myOffset, colour, angleInDegrees, thickness, canvasWidth).createLine())
            line.addLine(new Line(startX - canvasWidth, startY - canvasWidth, colour, angleInDegrees, thickness, canvasWidth).createLine())
        } else if (type === 'threadUp') {
            line = new LineContainer(canvasWidth, app)
            line.addLine(new Line(startX2, startY2, colour2, 360 - angleInDegrees, thickness, canvasWidth).createLine())
            line.addLine(new Line(startX2 + canvasWidth, startY2, colour2, 360 - angleInDegrees, thickness, canvasWidth).createLine())
            line.addLine(new Line(startX - myOffset, startY2, colour2, 360 - angleInDegrees, thickness, canvasWidth).createLine())
        }

        let lineObject = line.createLineObject()

        oStore.$patch((state) => {
            state.objects.push(lineObject)
        })

        app.stage.addChild(lineObject);
    }


    function determinePath(str, appCanvas) {
        let path = getFirstWord(str).toUpperCase()
        if (path === 'CROSS') parseItem(str, appCanvas, 'cross')
        else if (path === 'THREAD_UP') parseItem(str, appCanvas, 'threadDown')
        else if (path === 'THREAD_DN') parseItem(str, appCanvas, 'threadUp')
    }

    function parseItem(str, appCanvas, itemType) {
        let xCoord = getNumberAfterKeyword(str, 'x') * 1
        let yCoord = getNumberAfterKeyword(str, 'y') * 1
        let color1 = getWordAfterKeyword(str, 'Spool').toUpperCase()
        let color2
        if (itemType === 'cross' || itemType === 'box') {
            color2 = getWordAfterKeyword(str, 'Spool_Up').toUpperCase()
        }
        let band = getNumberAfterKeyword(str, 'Band') * 1
        let minus = getNumberAfterKeyword(str, 'minus') * 1
        let plus = getNumberAfterKeyword(str, 'plus') * 1
        let progressionType = ""
        if (minus != 0) {
            progressionType = "MINUS"
        } else if (plus != 0) {
            progressionType = "PLUS"
        } else if (band != 0) {
            progressionType = 'BAND'
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
                if (progressionType === "PLUS") {
                    current_line_width = init + plus * i;
                } else if (progressionType === 'MINUS') {
                    current_line_width = init + minus * i;
                }
            }
            if (itemType === 'cross') generateCrossObject(xCoord, yCoord, colours[Number(color1) - 1], colours[Number(color2) - 1], -45, current_line_width)
            else if (itemType === 'threadDown') generateThreadObject(xCoord, yCoord, colours[Number(color1) - 1], -45, current_line_width, 'threadDown')
            else if (itemType === 'threadUp') generateThreadObject(xCoord, yCoord, colours[Number(color2) - 1], -45, current_line_width, 'threadUp')
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
        appCanvas.renderer.render(appCanvas.stage);
    }

    window.addEventListener('keydown', function (event) {
        if (event.altKey && event.key === 'Enter') {
            console.log('Alt + Enter pressed!');
            clearStage();
            sliderValue.value = [0]
            oStore.$patch((state) => {
                state.objects = []
            })

            //let code = document.querySelector('.ace_text-input').value;
            let code = eStore.editorValue
            let textBoxLines = code.split('\n')

            textBoxLines.forEach((line) => {
                determinePath(line, app)
            })

        }

    })

    app.renderer.render(app.stage);

})



</script>

<template>
    <header class="sticky top-0 z-10 flex h-[57px] items-center bg-stone-800 gap-1 border-b px-4">
        <h1 class="text-3xl text-white font-untitledSans font-medium ">
            VisualWrap [TEST]
        </h1>
    </header>
    <div class="grid h-[90vh] w-full pl-[110px]">
        <LeftBar />
        <div class="flex flex-col justify-center items-center">
            <!-- here -->
            <main class="border-l gap-4 o w-full flex md:grid-cols-1 lg:grid-cols-1 justify-center">
                <div class="relative flex h-full min-h-[20vh] items-center flex-col p-4 lg:col-span-2"
                    id="mainContainer">
                    <div class="flex gap-1 mb-4 mt-6">
                        <!--<Slider @update:modelValue="handleSliderChange" v-model="sliderValue" :default-value="[1]"
                            :max="sliderMaxValue" :step="1" />-->
                        <div class="slidecontainer">
                            <input @input="handleSliderChange($event)" v-model="sliderValue" type="range" min="1"
                                :max="sliderMaxValue" class="slider" id="myRange">
                        </div>
                    </div>
                    <div class="relative flex gap-1 mb-6 mt-6">
                        <div v-for="c, i in colours" class="columns-1">
                            <div :class="`bg-${c} w-8 h-8 hover:border-2`"
                                :style="{ 'background-color': c + '!important' }">
                            </div>
                            <div class="text-center font-untitledSans">{{ i + 1 }}</div>
                        </div>
                    </div>
                    <div class="flex gap-5">
                        <div id="canvasContainer" class="canvas-container"></div>
                        <div id="canvasContainer2" class="canvas-container"></div>
                    </div>
                    <div id="y-coordinate">0</div>
                    <div id="x-coordinate">0</div>
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

#myRange {
    width: 20vw
}
</style>