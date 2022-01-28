import Zombie from "./zombie";

export default class Spawner {
    _time: number;
    _maxCount: 3;
    _timerId: number;
    _element: Zombie;
    public elements: Array<Zombie>;

    constructor(element: Zombie) {
        this._time = 1000;
        this._maxCount = 3;
        this.elements = [];
        this._timerId = null;
        this._element = element;
        this._generate();
    }

    private _generate() {
        this._timerId = window.setInterval(this._spawn, this._time)
    }

    private _spawn() {
        if (this.elements.length >= this._maxCount) {
            return;
        }
        this.elements.push(this._element);
    }
}