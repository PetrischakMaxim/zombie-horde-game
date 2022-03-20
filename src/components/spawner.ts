import Zombie from "./zombie";
import {Application} from "pixi.js";
import {State} from "./state";

export default class Spawner {
    _time: number;
    _maxCount: number;
    _callback: Function;
    _app: Application;
    _state: State;

    public children: Array<Zombie>;

    constructor(options: {
        app: Application,
        state: State,
        callback: Function,
    }) {
        this._time = 5000;
        this._maxCount = 3;
        this._app = options.app;
        this._state = options.state;
        this._callback = options.callback;
        this.children = [];
        this._generate();
    }

    private _generate() {
        window.setInterval(() => {
            if (this._state.isStarted) {
                this._spawn()
            }
        }, this._time);
    }

    private _spawn() {
        if (this.children.length >= this._maxCount) {
            return;
        }
        const zombie = this._callback();
        this.children.push(zombie);
    }
}