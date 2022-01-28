import Zombie from "./zombie";

export default class Spawner {
    _time: number;
    _maxCount: number;
    _timerId: number;
    _element: Zombie;
    public elements: Array<Zombie>;

    constructor(element: Zombie) {
        this._time = 2000;
        this._maxCount = 5;
        this.elements = [];
        this._timerId = null;
        this._element = element;
        this._generate();
    }

    private _generate() {
        this._timerId = window.setInterval(
            () => this._spawn(this._element), this._time);

    }

    private _spawn(element: Zombie) {
        if (this.elements.length >= this._maxCount) {
            return;
        }
        this.elements.push(element);
    }
}