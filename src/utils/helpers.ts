function getNumberAfterKeyword(sentence: string, keyword: string) {
  const escapedKeyword = keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
  const regex = new RegExp(`${escapedKeyword}\\s+(\\S+)`, "i")
  const matches = sentence.match(regex)
  return Number(matches ? matches[1] : null)
}

function getWordAfterKeyword(sentence: string, keyword: string): string {
  const escapedKeyword = keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
  const regex = new RegExp(`${escapedKeyword}[^\\s]*\\s+(\\S+)`, "i")
  const matches = sentence.match(regex)
  return matches ? matches[1] : ""
}

function findFirstWordAfterFourthNumber(sentence: string) {
  const pattern = /(?:\d+\D+){3}\d+[^a-zA-Z\d]*(\w+)/
  const match = sentence.match(pattern)
  return match ? match[1] : ""
}

function getFirstWord(str: string) {
  str = str.trim()
  const firstWord = str.split(/\s+/)[0]
  return firstWord
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseCross(str: string, appCanvas: any) {
  let xCoord = getNumberAfterKeyword(str, "x") * 1
  let yCoord = getNumberAfterKeyword(str, "y") * 1
  const band = getNumberAfterKeyword(str, "Band") * 1
  const minus = getNumberAfterKeyword(str, "minus") * 1
  const plus = getNumberAfterKeyword(str, "plus") * 1
  let progressionType = ""
  if (minus != 0) {
    progressionType = "minus"
  } else if (plus != 0) {
    progressionType = "plus"
  } else if (band != 0) {
    progressionType = "band"
  }
  const direction = findFirstWordAfterFourthNumber(str)
  const init = getNumberAfterKeyword(str, "init#")
  const passes = getNumberAfterKeyword(str, "passes")

  let first_flag = false
  let current_line_width = init

  for (let i = 0; i < passes; i++) {
    if (band === 0 && first_flag) {
      if (progressionType === "plus") {
        current_line_width = init + plus * i
      } else if (progressionType === "minus") {
        current_line_width = init + minus * i
      }
    }
    //generateLineObject(xCoord, yCoord, colours[Number(color1) - 1], colours[Number(color2) - 1], -45, current_line_width, appCanvas);
    //console.log(oStore.objects[i])
    if (direction.toUpperCase() === "LEFT") {
      yCoord = yCoord - current_line_width * Math.SQRT2
    } else if (direction.toUpperCase() === "UP") {
      xCoord = xCoord + current_line_width * Math.SQRT2
    } else if (direction.toUpperCase() === "DOWN") {
      xCoord = xCoord - current_line_width * Math.SQRT2
    } else if (direction.toUpperCase() === "RIGHT") {
      if (!first_flag) {
        yCoord = yCoord + current_line_width * Math.SQRT2
        first_flag = true
      } else {
        yCoord = yCoord + current_line_width * Math.SQRT2
      }
    }
    first_flag = true
  }

  appCanvas.renderer.render(appCanvas.stage)
}
/*function generateLineObject(startX, startY, colour1, colour2, angleInDegrees, thickness, app) {
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
    }*/

export {
  getFirstWord,
  getNumberAfterKeyword,
  getWordAfterKeyword,
  findFirstWordAfterFourthNumber,
  parseCross,
}
