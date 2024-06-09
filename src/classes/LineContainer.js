import Line from './Line.js';
import { objectStore } from '../stores/objects-store.js';

class LineContainer {
    constructor(canvasWidth, app) {
        this._lineContainer = new PIXI.Container();
        this._dragging = false;
        this._currentColour = 'red';
        this._canvasWidth = canvasWidth;
        this._app = app;
        this._currentColour
        this._oStore = objectStore()
    }

    addLine(line) {
        if (!(line instanceof PIXI.Graphics)) {
            throw new TypeError('Expected argument of type Line');
        }
        this._lineContainer.addChild(line);
    }

    onPointerOver() {
        this._lineContainer.on('pointerover', (e) => {
            if (!this._dragging) {
                const localPosition = e.data.getLocalPosition(this._app.stage)
                this._lineContainer.children.forEach(child => {
                    if (localPosition.x > 0 && localPosition.x < this._canvasWidth && localPosition.y > 0 && localPosition.y < this._canvasWidth) {
                        child.alpha = 0.5
                        //console.log('inside the app.view')
                        child.originalColour = child.tint
                        this._currentColour = child.colour
                        //child.tint = 0x008000;
                    }
                });
            }
        });
    }

    onPointerOut() {
        this._lineContainer.on('pointerout', () => {
            this._lineContainer.children.forEach(child => {
                child.alpha = 1
            });
        });
    }

    onDragMove(event) {
        if (this._dragging) {
            const newPosition = this._lineContainer.draggingData.getLocalPosition(this._app.stage)
            this._lineContainer.x += (newPosition.x - this._lineContainer.startPosition.x)
            this._lineContainer.y += (newPosition.y - this._lineContainer.startPosition.y)
            this._lineContainer.startPosition = newPosition
        }
    }

    onPointerDown() {
        this._lineContainer.on('pointerdown', (event) => {
            this._lineContainer.alpha = 0.5; // Visual cue for dragging
            this._dragging = true;
            this._lineContainer.draggingData = event.data;
            this._lineContainer.startPosition = this._lineContainer.toGlobal(event.data.getLocalPosition(this._lineContainer));
            // Start global move listener
            this._app.view.addEventListener('pointermove', this.onDragMove.bind(this));
        })
    }

    onClick() {
        this._lineContainer.on('click', (e) => {
            if (!this._dragging) {
                const localPosition = e.data.getLocalPosition(this._app.stage)
                this._lineContainer.children.forEach(child => {
                    if (localPosition.x > 0 && localPosition.x < this._canvasWidth && localPosition.y > 0 && localPosition.y < this._canvasWidth) {
                        child.alpha = 0.5
                        child.originalColour = child.tint
                        this._currentColour = child.colour
                        const event = new CustomEvent('linecontainer:hover', {
                            detail: { x: localPosition.x, y: localPosition.y }
                        });
                        window.dispatchEvent(event);
                    }
                });
            }
        });
    }
    endDrag(event) {
        this._dragging = false;
        this._lineContainer.alpha = 1;
        this._app.view.removeEventListener('pointermove', this.onDragMove.bind(this));
        this._lineContainer.data = null;
        this._oStore.lastClickedContainer = this._lineContainer
    }

    createLineObject() {
        this._lineContainer.interactive = true
        this._lineContainer.buttonMode = true
        let myOffset = this._canvasWidth / 2
        this.onPointerOver()
        this.onPointerOut()
        this.onPointerDown()
        this.onClick()
        this._lineContainer.on('pointerup', this.endDrag.bind(this));
        this._lineContainer.on('pointerupoutside', this.endDrag.bind(this));
        return this._lineContainer
    }

}

export default LineContainer;