import { objectStore } from "../stores/objects-store";
class Canvas {
  constructor(parentId, width, backgroundColor) {
    this._parentId = parentId;
    this._width = width;
    this._backgroundColor = backgroundColor;
    this._app = new PIXI.Application({
      width: this._width,
      height: this._width,
      backgroundColor: backgroundColor,
    });
    this._hoverLines;
    this._canvasContainer = document.getElementById(this._parentId);
  }

  get canvasContainer() {
    return this._canvasContainer;
  }

  get app() {
    return this._app;
  }

  clearStage() {
    this._app.stage.removeChildren();
  }

  onPointerMove() {
    this._app.view.addEventListener("pointermove", (e) => {
      let oStore = objectStore();
      let mouseX = Math.round(e.offsetX);
      let mouseY = Math.round(e.offsetY);
      let myOffset = this._width / 2;

      // Update coordinate displays
      //document.getElementById('x-coordinate').textContent = mouseX;
      //document.getElementById('y-coordinate').textContent = mouseY;

      //let coordData = { x: 0, y: 0 };
      let coordData = oStore.coordinates;

      document.getElementById("x-coordinate").textContent = coordData.x;
      document.getElementById("y-coordinate").textContent = coordData.y;
      // Use anime.js to animate the updates
      /*anime({
                targets: coordData,
                x: mouseX,
                y: mouseY,
                round: 1,
                update: function () {
                    // Update coordinate displays
                    document.getElementById('x-coordinate').textContent = coordData.x;
                    document.getElementById('y-coordinate').textContent = coordData.y;
                }
            });*/
      coordData.x = mouseX;
      coordData.y = mouseY;

      requestAnimationFrame(() => {
        this._hoverLines[0].clear();
        this._hoverLines[1].clear();
        this._hoverLines[2].clear();
        this._hoverLines[3].clear();
        this._hoverLines[4].clear();
        this._hoverLines[5].clear();

        this.drawDottedLine(
          this._hoverLines[0],
          { x: mouseX, y: mouseY },
          Math.PI / 4,
          800,
          0x000000,
          2,
          [3, 3],
        );
        this.drawDottedLine(
          this._hoverLines[1],
          { x: mouseX, y: mouseY },
          -Math.PI / 4,
          800,
          0x000000,
          2,
          [3, 3],
        );
        this.drawDottedLine(
          this._hoverLines[2],
          { x: mouseX + myOffset, y: mouseY - myOffset },
          Math.PI / 4,
          800,
          0x000000,
          2,
          [3, 3],
        );
        this.drawDottedLine(
          this._hoverLines[3],
          { x: mouseX, y: mouseY - this._width },
          -Math.PI / 4,
          800,
          0x000000,
          2,
          [3, 3],
        );
        this.drawDottedLine(
          this._hoverLines[4],
          { x: mouseX + myOffset, y: mouseY + myOffset },
          -Math.PI / 4,
          800,
          0x000000,
          2,
          [3, 3],
        );
        this.drawDottedLine(
          this._hoverLines[5],
          { x: mouseX - myOffset, y: mouseY + myOffset },
          Math.PI / 4,
          800,
          0x000000,
          2,
          [3, 3],
        );

        this._app.renderer.render(this._app.stage);
      });
    });
  }

  onPointerOut() {
    this._app.view.addEventListener("pointerout", () => {
      this._hoverLines[0].clear();
      this._hoverLines[1].clear();
      this._hoverLines[2].clear();
      this._hoverLines[3].clear();
      this._hoverLines[4].clear();
      this._hoverLines[5].clear();
      this._app.renderer.render(this._app.stage);
    });
  }

  drawDottedLine(
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

  hoverLines() {
    let hoverLine1 = new PIXI.Graphics();
    let hoverLine2 = new PIXI.Graphics();
    let hoverLine3 = new PIXI.Graphics();
    let hoverLine4 = new PIXI.Graphics();
    let hoverLine5 = new PIXI.Graphics();
    let hoverLine6 = new PIXI.Graphics();
    this._hoverLines = [
      hoverLine1,
      hoverLine2,
      hoverLine3,
      hoverLine4,
      hoverLine5,
      hoverLine6,
    ];
    this._app.stage.addChild(
      hoverLine1,
      hoverLine2,
      hoverLine3,
      hoverLine4,
      hoverLine5,
      hoverLine6,
    );
  }

  newApp() {
    this._canvasContainer.appendChild(this._app.view);
    //let hoverLine1 = new PIXI.Graphics(); let hoverLine2 = new PIXI.Graphics(); let hoverLine3 = new PIXI.Graphics(); let hoverLine4 = new PIXI.Graphics(); let hoverLine5 = new PIXI.Graphics(); let hoverLine6 = new PIXI.Graphics();
    //this._app.stage.addChild(hoverLine1, hoverLine2, hoverLine3, hoverLine4, hoverLine5, hoverLine6)
    this.hoverLines();
    this.onPointerMove();
    this.onPointerOut();
    return this._app;
  }
}

export default Canvas;
