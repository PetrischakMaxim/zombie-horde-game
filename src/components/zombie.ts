import {Application, Graphics} from "pixi.js";
import Victor from "victor";
import Player from "./player";

interface Options {
    app: Application,
    player: Player
}

export default class Zombie {
    _sprite: Graphics;
    _speed: number;
    _radius: number;
    _isAttacking: boolean;
    _options: Options;
    _timerId: number;

    constructor(options: Options) {
        this._options = options;
        this._radius = 16;
        this._speed = 2;
        this._sprite = new Graphics();
        const r = this._randomSpawnPoint();
        this._sprite.position.set(r.x, r.y);
        this._sprite.beginFill(0xFF0000, 1);
        this._sprite.drawCircle(0, 0, this._radius);
        this._sprite.endFill();
        this._options.app.stage.addChild(this._sprite);
    }

    _randomSpawnPoint() {
        const edge = Math.floor(Math.random() * 4);
        const spawnPoint = new Victor(0, 0);
        const canvasSize = this._options.app.screen.width;
        switch (edge) {
            case 0: //top
                spawnPoint.x = canvasSize * Math.random();
                break;
            case 1: //right
                spawnPoint.x = canvasSize;
                spawnPoint.y = canvasSize * Math.random();
                break;
            case 2: //bottom
                spawnPoint.x = canvasSize * Math.random();
                spawnPoint.y = canvasSize;
                break;
            default:
                //left
                spawnPoint.x = 0;
                spawnPoint.y = canvasSize * Math.random();
                break;
        }
        return spawnPoint;
    }

    _attack() {
        if (this._isAttacking) return;
        this._isAttacking = true;
        this._timerId = window.setInterval(() => {
            this._options.player.attack();
        }, 500)
    }

    public update() {
        const e = new Victor(this._sprite.position.x, this._sprite.position.y);
        const s = new Victor(this._options.player.position.x, this._options.player.position.y);
        if (e.distance(s) < this._options.player.width / 2) {
            this._attack();
            return;
        }
        const d = s.subtract(e);
        const v = d.normalize().multiplyScalar(this._speed);
        this._sprite.scale.x = v.x < 0 ? 1 : -1;
        this._sprite.position.set(
            this._sprite.position.x + v.x,
            this._sprite.position.y + v.y
        );
    }

    public kill() {
        this._options.app.stage.removeChild(this._sprite);
        window.clearInterval(this._timerId);
    }

    get position() {
        return this._sprite.position;
    }
}
