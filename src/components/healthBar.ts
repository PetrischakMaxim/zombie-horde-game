import {Application, Graphics} from "pixi.js";

export default class HealthBar extends Graphics {
    _app: Application;
    _color: number;
    _margin: number;
    _initialWidth: number;
    _initialHeight: number;
    _maxLife: number;

    constructor(app: Application) {
        super();
        this._app = app;
        this._color = 0xFF0000;
        this._margin = 16;
        this._initialWidth = this._app.screen.width - this._margin * 2;
        this._initialHeight = 8;
        this._maxLife = 100;
        this._init();
    }

    private _init() {
        this.beginFill(this._color, 1);
        this.drawRect(
            this._margin,
            this._app.screen.height - this._initialHeight - this._margin / 2,
            this._initialWidth,
            this._initialHeight,
        )
        this.endFill();
        this.zIndex = 1;
    }

    public updateWidth(playerHealth: number) {
        this.width = (playerHealth / this._maxLife) * this._initialWidth;
    }

    get maxLife() {
        return this._maxLife;
    }
}