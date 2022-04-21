import {Application, Text, TextStyle} from "pixi.js";

export default class Counter {
    _value: number;
    _text: Text;
    _textStyle: TextStyle;
    _app: Application;

    constructor(app: Application) {
        this._app = app;
        this._value = 0;
        this._textStyle = new TextStyle({
            fontSize: 24,
            fontFamily: "Arial",
            fontStyle: "normal",
            fontWeight: "bold",
            fill: ["#88A050", "#ff0000"], // gradient
            stroke: "#F0E8C8",
            strokeThickness: 2,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: "round"
        });
        this._text = new Text(String(this._value),this._textStyle);
        this._text.alpha = 0;
        this._text.x = this._app.screen.width / 2;
        this._text.y = this._app.screen.height - 100;
        this._text.anchor.set(0.5, 0);
        this._app.stage.addChild(this._text);
    }

    public update() {
        this._text.alpha = 1;
        this._text.text = `${++this._value}`;
    }
}