import Zombie from "./zombie";
import Game from "../components/game";
import State from "./state";

export default class Spawner {
    _time: number;
    _maxCount: number;
    _callback: Function;
    _app: Game;

    public children: Array<Zombie>;

    constructor(options: {
        app: Game,
        callback: Function,
    }) {
        this._time = 1000;
        this._maxCount = 50;
        this._app = options.app;
        this._callback = options.callback;
        this.children = [];
        this._generate();
    }

    private _generate() {
        window.setInterval(() => {
            this._spawn()
        }, this._time);
    }

    private _spawn() {
        if (this._app.state !== State.RUNNING) return;
        if (this.children.length >= this._maxCount) return;
        const zombie = this._callback();
        this.children.push(zombie);
    }
}