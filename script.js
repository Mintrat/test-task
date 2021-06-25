// Parameters for the canvas
const widthtCanvas = 1000;
const heightCanvas = 1000;
const canvasBorderStyle = '1px solid black';

// Parameters for the rectangle
const widthtRectangle = 200;
const heightRectangle = 100;
const degreesRotate = 45;
const xPositionRectangle = widthtCanvas/ 2 - widthtRectangle
const yPositionRectangle = heightCanvas / 2 - heightRectangle

// Parameters for the button
const buttonText = "Click me!";
const fontButtonText = "Roboto";
const fontSize = 30;
const xPositionButton = 20;
const yPositionButton = 20;
const buttonPaddingHorizontal = 10;
const buttonPaddingVertical = 10;

const canvas = document.createElement('canvas');

canvas.width = widthtCanvas;
canvas.height = heightCanvas;
canvas.style.border = canvasBorderStyle;
document.body.append(canvas);

const ctx = canvas.getContext('2d');

const rectangle = {
    width: widthtRectangle,
    height: heightRectangle,
    x: xPositionRectangle,
    y: yPositionRectangle,
    degreesRotate: 0,
    
    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.degreesRotate * Math.PI / 180);
        ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.fill();
        ctx.restore();
    },
}

const button = {
    text: buttonText,
    x: xPositionButton,
    y: yPositionButton,
    fontSize: fontSize,
    font: fontButtonText,
    paddingHorizontal: buttonPaddingHorizontal,
    paddingVertical: buttonPaddingVertical,

    draw() {
        ctx.font = this.getTextStyle();
        ctx.strokeRect(this.x, this.y, this.getWidth(), this.getHeight());
        
        const textPosition =  this.getTextPosition()
        ctx.fillText(this.text, textPosition.x, textPosition.y);
    },

    getTextPosition() {
        return {
            x: this.x + this.paddingHorizontal,
            y: this.y + this.getTextHeight() +  (this.paddingHorizontal / 2)
        }
    },

    getTextStyle() {

        if (this.fontSize && this.font) {
            return `${this.fontSize}px ${this.font}`;
        }

        if (this.fontSize) {
            return `${this.fontSize}px ` + ctx.font.split(' ')[1];
        }

        if (this.font) {
            return ctx.font.split(' ')[0] + this.font;
        }

        return ctx.font;
    },

    getTextWidth() {
        return ctx.measureText(this.text).width;
    },

    getTextHeight() {
        const textMetrics = ctx.measureText(this.text);

        if (textMetrics.fontBoundingBoxAscent !== undefined) {
            return textMetrics.fontBoundingBoxAscent;
        }
     
        return Math.abs(textMetrics.actualBoundingBoxAscent) +
            Math.abs(textMetrics.actualBoundingBoxDescent) +
            Math.abs(textMetrics.actualBoundingBoxLeft) +
            Math.abs(textMetrics.width) -
            Math.abs(textMetrics.actualBoundingBoxRight);
    },

    getWidth() {
        return this.getTextWidth() + this.paddingHorizontal * 2;
    },

    getHeight() {
        return this.getTextHeight() + this.paddingVertical * 2;
    },

    listenToСlicks(closure) {
        canvas.addEventListener('click', event => {
            
            const canCallClosure = this._clickOnMe(event.layerX, event.layerY) && typeof closure === 'function';

            if (canCallClosure) {
                closure(event, this);
            }
        });
    },

    _clickOnMe(x, y) {
        const coincidesInX = x >= this.x && x <= ( this.x + this.getWidth() );
        const coincidesInY = y >= this.y && y <= ( this.y + this.getHeight() );

        return coincidesInX && coincidesInY;
    }
}

button.draw();
rectangle.draw();

button.listenToСlicks((event, button) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    button.draw();
    rectangle.degreesRotate += degreesRotate;
    rectangle.draw();
});