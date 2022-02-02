import Zombie from "./zombie";

export default class Spawner {
    _time: number;
    _maxCount: number;
    _callback: Function;

    public children: Array<Zombie>;

    constructor(options: {callback: Function}) {
        this._time = 5000;
        this._maxCount = 3;
        this._callback = options.callback;
        this.children = [];
        this._generate();
    }

    private _generate() {
       window.setInterval(() => this._spawn(), this._time);
    }

    private _spawn() {
        if (this.children.length >= this._maxCount) {
            return;
        }
        const zombie = this._callback();
        this.children.push(zombie);
    }
}