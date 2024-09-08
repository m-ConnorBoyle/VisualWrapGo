import { coloursStore } from "./stores/colours-store";
import { pinia } from "../main.js";

//const pinia = createPinia()
//const cStore = coloursStore(pinia)

//let cStore

document.addEventListener("DOMContentLoaded", () => {
  function clearStage() {
    app.stage.removeChildren();
  }

  function serializeGraphics() {
    /* let objects = [];
     app.stage.children.forEach(child => {
       let children = []
       for (let i = 0; i < child.children.length; i++) {
         children.push({ x: child[i].x, y: child[i].y, rotation: child[i].rotation, colour: child[i]._tintColor })
       }
       objects.push(JSON.stringify(children));
     });
     localStorage.setItem("graphicsData", JSON.stringify(objects))
     //return JSON.stringify(objects);*/
  }

  function deserializeGraphics(data, app) {
    let objects = JSON.parse(data);
    objects.forEach((obj) => {
      const graphics = new PIXI.Graphics();
      graphics.x = obj.x;
      graphics.y = obj.y;
      obj.graphicsData.forEach((gd) => {
        graphics.lineStyle(gd.lineWidth, gd.lineColor, gd.lineAlpha);
        graphics.beginFill(gd.fill, gd.alpha);
        if (gd.type === "polygon") {
          graphics.drawPolygon(gd.points);
        }
        // Add other types of shapes here based on `gd.type`
        graphics.endFill();
      });
      app.stage.addChild(graphics);
    });
  }

  const canvasContainer = document.getElementById("canvasContainer");
  let canvasWidth = 400;
  let globalZIndex = 0;
  let linesArr = [];

  const app = new PIXI.Application({
    width: canvasWidth,
    height: canvasWidth,
    backgroundColor: 0xffffff,
  });

  app.view.classList.add("border");
  canvasContainer.appendChild(app.view);

  let hoverLine1 = new PIXI.Graphics();
  let hoverLine2 = new PIXI.Graphics();
  let hoverLine3 = new PIXI.Graphics();
  let hoverLine4 = new PIXI.Graphics();
  let hoverLine5 = new PIXI.Graphics();
  let hoverLine6 = new PIXI.Graphics();

  app.stage.addChild(
    hoverLine1,
    hoverLine2,
    hoverLine3,
    hoverLine4,
    hoverLine5,
    hoverLine6,
  );

  app.view.addEventListener("pointermove", (e) => {
    let mouseX = Math.round(e.offsetX);
    let mouseY = Math.round(e.offsetY);
    let myOffset = canvasWidth / 2;

    // Update coordinate displays
    //document.getElementById('x-coordinate').textContent = mouseX;
    //document.getElementById('y-coordinate').textContent = mouseY;

    requestAnimationFrame(() => {
      hoverLine1.clear();
      hoverLine2.clear();
      hoverLine3.clear();
      hoverLine4.clear();
      hoverLine5.clear();
      hoverLine6.clear();

      drawDottedLine(
        hoverLine1,
        { x: mouseX, y: mouseY },
        Math.PI / 4,
        800,
        0x000000,
        2,
        [3, 3],
      );
      drawDottedLine(
        hoverLine2,
        { x: mouseX, y: mouseY },
        -Math.PI / 4,
        800,
        0x000000,
        2,
        [3, 3],
      );
      drawDottedLine(
        hoverLine3,
        { x: mouseX + myOffset, y: mouseY - myOffset },
        Math.PI / 4,
        800,
        0x000000,
        2,
        [3, 3],
      );
      drawDottedLine(
        hoverLine4,
        { x: mouseX, y: mouseY - canvasWidth },
        -Math.PI / 4,
        800,
        0x000000,
        2,
        [3, 3],
      );
      drawDottedLine(
        hoverLine5,
        { x: mouseX + myOffset, y: mouseY + myOffset },
        -Math.PI / 4,
        800,
        0x000000,
        2,
        [3, 3],
      );
      drawDottedLine(
        hoverLine6,
        { x: mouseX - myOffset, y: mouseY + myOffset },
        Math.PI / 4,
        800,
        0x000000,
        2,
        [3, 3],
      );

      app.renderer.render(app.stage);
    });
  });

  app.view.addEventListener("pointerout", () => {
    hoverLine1.clear();
    hoverLine2.clear();
    hoverLine3.clear();
    hoverLine4.clear();
    hoverLine5.clear();
    hoverLine6.clear();
    app.renderer.render(app.stage);
  });

  function drawDottedLine(
    graphics,
    start,
    angle,
    distance,
    color,
    lineWidth,
    dashArray,
  ) {
    const [dashSize, gapSize] = dashArray;
    const dashLength = dashSize + gapSize;
    const dashCount = Math.floor((distance * 2) / dashLength);

    const dx = Math.cos(angle);
    const dy = Math.sin(angle);

    for (let i = -dashCount / 2; i < dashCount / 2; i++) {
      const segmentStartX = start.x + i * dashLength * dx;
      const segmentStartY = start.y + i * dashLength * dy;
      const segmentEndX = segmentStartX + dashSize * dx;
      const segmentEndY = segmentStartY + dashSize * dy;

      graphics.lineStyle(lineWidth, color);
      graphics.moveTo(segmentStartX, segmentStartY);
      graphics.lineTo(segmentEndX, segmentEndY);
    }
  }

  //let isOdd = true
  let currentColour;

  function generateLineObject(
    startX,
    startY,
    colour1,
    colour2,
    angleInDegrees,
    thickness,
  ) {
    let lineContainer = new PIXI.Container();
    lineContainer.interactive = true;
    lineContainer.buttonMode = true;
    let myOffset = canvasWidth / 2;
    let startX2 = startX + myOffset;
    let startY2 = startY + myOffset;
    /*if (startX2 < 0) {
      startX2 = xCoord + canvasWidth;
    } 
    if (startY2 < 0) {
      startY2 = yCoord + canvasWidth;
    }*/

    let graphics1 = createLine(
      startX,
      startY,
      colour1,
      angleInDegrees,
      thickness,
    );
    lineContainer.addChild(graphics1);

    let graphics2 = createLine(
      startX2,
      startY2,
      colour1,
      angleInDegrees,
      thickness,
    );
    lineContainer.addChild(graphics2);

    let graphics5 = createLine(
      startX2 + myOffset,
      startY2 + myOffset,
      colour1,
      angleInDegrees,
      thickness,
    );
    //lineContainer.addChild(graphics5);

    let graphics6 = createLine(
      startX - myOffset,
      startY - myOffset,
      colour1,
      angleInDegrees,
      thickness,
    );
    //lineContainer.addChild(graphics6);

    //let graphics3 = createLine(startX2 + myOffset, startY2, colour, 360 - angleInDegrees, thickness);
    let graphics3 = createLine(
      startX2,
      startY2,
      colour1,
      360 - angleInDegrees,
      thickness,
    );
    lineContainer.addChild(graphics3);

    let graphics7 = createLine(
      startX,
      startY2 + canvasWidth,
      colour1,
      360 - angleInDegrees,
      thickness,
    );
    //lineContainer.addChild(graphics7);

    let graphics4 = createLine(
      startX2 + canvasWidth,
      startY2,
      colour1,
      360 - angleInDegrees,
      thickness,
    );
    lineContainer.addChild(graphics4);

    /*let graphics8 = createLine(startX2, startY2 + myOffset, colour, 360 - angleInDegrees, thickness);
    lineContainer.addChild(graphics8);*/

    //figure out what to do with more lines here

    // drawDottedLine(hoverLine5, { x: mouseX + myOffset, y: mouseY + myOffset }, -Math.PI / 4, 800, 0x000000, 2, [3, 3])
    // drawDottedLine(hoverLine6, { x: mouseX - myOffset, y: mouseY + myOffset }, Math.PI / 4, 800, 0x000000, 2, [3, 3])

    lineContainer.on("pointerover", (e) => {
      if (!dragging) {
        lineContainer.children.forEach((child) => {
          currentColour = "red";
          child.tint = 0x008000;
        });
      }
    });

    lineContainer.on("pointerout", () => {
      lineContainer.children.forEach((child) => {
        if (child.tint === 0x008000) {
          child.tint = currentColour;
        }
      });
    });

    //Dragging
    let dragging = false;

    lineContainer.on("pointerdown", (event) => {
      lineContainer.alpha = 0.5; // Visual cue for dragging
      dragging = true;
      lineContainer.draggingData = event.data;
      lineContainer.startPosition = lineContainer.toGlobal(
        event.data.getLocalPosition(lineContainer),
      );

      // Start global move listener
      app.view.addEventListener("pointermove", onDragMove);
    });

    function onDragMove(event) {
      if (dragging) {
        const newPosition = lineContainer.draggingData.getLocalPosition(
          app.stage,
        );
        lineContainer.x += newPosition.x - lineContainer.startPosition.x;
        lineContainer.y += newPosition.y - lineContainer.startPosition.y;
        lineContainer.startPosition = newPosition;
      }
    }

    function endDrag(event) {
      dragging = false;
      lineContainer.alpha = 1;
      // Stop global move listener
      app.view.removeEventListener("pointermove", onDragMove);
      lineContainer.data = null;
    }

    lineContainer.on("pointerup", endDrag);
    lineContainer.on("pointerupoutside", endDrag);

    app.stage.addChild(lineContainer);

    //    app.stage.addChild(lineContainer);
  }

  function createLine(startX, startY, colour, angleInDegrees, thickness) {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(colour);
    graphics.drawRect(0, 0, canvasWidth * 6, thickness);
    graphics.endFill();

    let angleInRadians = angleInDegrees * (Math.PI / 180);
    graphics.pivot.x = canvasWidth * 2;
    graphics.pivot.y = 0.5;
    graphics.rotation = angleInRadians;
    graphics.x = startX;
    graphics.y = startY;

    return graphics;
  }

  function parseCode(code) {
    let firstWord = code.split(" ")[0];

    if (firstWord === "Box") {
      parseBox(code);
    } else if (firstWord === "Cross") {
      parseCross(code);
    } else if (firstWord === "Thread_Up") {
      parseThreadUp(code);
    } else if (firstWord === "Thread_Down") {
      parseThreadDown(code);
    }
  }

  function getNumberAfterKeyword(sentence, keyword) {
    const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`${escapedKeyword}\\s+(\\S+)`, "i");
    const matches = sentence.match(regex);
    return Number(matches ? matches[1] : null);
  }

  function getWordAfterKeyword(sentence, keyword) {
    const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`${escapedKeyword}[^\\s]*\\s+(\\S+)`, "i");
    const matches = sentence.match(regex);
    return matches ? matches[1] : null;
  }

  function findFirstWordAfterFourthNumber(sentence) {
    // Regex pattern to find the first word after the fourth number
    const pattern = /(?:\d+\D+){3}\d+[^a-zA-Z\d]*(\w+)/;
    const match = sentence.match(pattern);
    return match ? match[1] : null; // Return the word if found, otherwise return null
  }

  function parseCross(str) {
    let xCoord = getNumberAfterKeyword(str, "x") * 1;
    let yCoord = getNumberAfterKeyword(str, "y") * 1;
    let color1 = getWordAfterKeyword(str, "Spool");
    let band = getNumberAfterKeyword(str, "Band") * 1;
    let minus = getNumberAfterKeyword(str, "minus") * 1;
    let plus = getNumberAfterKeyword(str, "plus") * 1;
    let progressionType = "";
    if (minus != 0) {
      progressionType = "minus";
    } else if (plus != 0) {
      progressionType = "plus";
    } else if (band != 0) {
      progressionType = "band";
    }

    if (band != "") {
      band = true;
    } else {
      band = false;
    }
    let direction = findFirstWordAfterFourthNumber(str);
    let init = getNumberAfterKeyword(str, "init#");
    let passes = getNumberAfterKeyword(str, "passes");
    let gradient = getNumberAfterKeyword(str, "%") * 1;
    console.log(
      "x: " + xCoord,
      "y: " + yCoord,
      "color: " + color1,
      "progressionType: " + progressionType,
      "direction: " + direction,
      "init: " + init,
      "passes: " + passes,
      "gradient: " + gradient,
    );
    let currentWidth = init;
    console.log("direction:" + direction);
    let first_flag = false;
    for (let i = 0; i < passes; i++) {
      // generateLineObject(xCoord, yCoord, color, 45, currentWidth);
      console.log(cStore[Number(color1)]);
      generateLineObject(
        xCoord,
        yCoord,
        cStore[Number(color1)],
        -45,
        currentWidth,
      );
      //generateLineObject(xCoord, yCoord, '0xff0000', 45, currentWidth);
      if (direction === "Left") {
        yCoord = yCoord - currentWidth;
      } else if (direction === "Up") {
        xCoord = xCoord + currentWidth;
      } else if (direction === "Down") {
        xCoord = xCoord - currentWidth;
      } else if (direction === "Right") {
        if (!first_flag) {
          yCoord = yCoord + currentWidth;
          first_flag = true;
        } else {
          yCoord = yCoord + currentWidth;
        }
      }
      currentWidth = currentWidth;
    }

    //generateLineObject(xCoord, yCoord, '0xff0000', 45, band);
    app.renderer.render(app.stage);
    //mySavedData = serializeGraphics()
  }

  function addRunEventListener() {
    document.getElementById("menuRun").addEventListener("click", () => {
      clearStage();
      let code = document.getElementById("code-editor").value;
      parseCross(code);

      /*let lines = code.split('\n');
      lines.forEach(line => {
        parseThreadDown2(line);
      })*/
    });
  }

  addRunEventListener();
  //generateLineObject(200, 200, 0xff0000, 45);

  app.renderer.render(app.stage);
});
