import {Graphics} from "pixi.js";
import Victor from "victor";

export default class Bullet extends Graphics {
    _radius: number;
    _color: number;
    public velocity: Victor;

    constructor() {
        super();
        this._radius = 8;
        this._color = 0x0000ff;
        this.velocity = null;
        this._init();
    }

    _init() {
        this.beginFill(this._color, 1).drawCircle(0, 0, this._radius).endFill();
    }
}