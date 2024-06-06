class Line {
    constructor(startX, startY, colour, angleInDegrees, thickness, canvasWidth) {
        this._startX = startX;
        this._startY = startY;
        this._colour = colour;
        this._angleInDegrees = angleInDegrees;
        this._thickness = thickness;
        this._dragging = false;
        this._currentColour = 'red';
        this._canvasWidth = canvasWidth;
    }

    get startX() {
        return this._startX;
    }

    get startY() {
        return this._startY;
    }

    get getColour() {
        return this._colour1;
    }   

    get angleInDegrees() {    
        return this._angleInDegrees;
    }  

    get thickness() {   
        return this._thickness;
    }

    set startX(value) {
        this._startX = value;
    }

    set startY(value) { 
        this._startY = value;
    }

    set colour(value) {
        this._colour = value;
    }   

    set angleInDegrees(value) {
        this._angleInDegrees = value;
    }

    set thickness(value) {  
        this._thickness = value;
    }

    graphicsInRadians() {
        return this.angleInDegrees * Math.PI / 180;
    }

    createLine() {
        let graphics = new PIXI.Graphics();
        graphics.beginFill(this._colour)
        graphics.drawRect(0, 0, this._canvasWidth * 6, this._thickness)
        graphics.endFill()
        graphics.pivot.x = this._canvasWidth * 3
        graphics.rotation = this.graphicsInRadians()
        graphics.x = this._startX
        graphics.y = this._startY
        graphics.colour = this._colour
        return graphics
    }

}

export default Line;