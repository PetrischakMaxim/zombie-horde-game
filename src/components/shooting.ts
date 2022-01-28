import {Application, Graphics} from "pixi.js";
import Player from "./player";
import Victor from "victor";

interface Options {
    app: Application,
    player: Player
}

export default class Shooting {
    _options: Options;
    _bullets: Array<Graphics>;
    _speed: number;
    _bulletRadius: number;
    _maxBullets: number;
    _timerId: number;

    constructor(options: Options) {
        this._options = options;
        this._speed = 4;
        this._bulletRadius = 8;
        this._maxBullets = 3;
    }

    _makeBullet() {
        return new Graphics()
            .beginFill(0x0000ff, 1)
            .drawCircle(0, 0, this._bulletRadius)
            .endFill();
    }

    public fire() {
        const bullet = this._makeBullet();
        bullet.position.set(
            this._options.player.position.x,
            this._options.player.position.y
        );

        const angle = this._options.player.rotation;
        bullet["velocity"] = new Victor(
            Math.cos(angle),
            Math.sign(angle)
        ).multiplyScalar(this._speed);

        this._bullets.push(bullet);
        this._options.app.stage.addChild(bullet);
    }

    update() {
        this._bullets.forEach(bullet => {
            bullet.position.x + bullet.velocity.x,
            bullet.position.y + bullet.velocity.y
        })
    }

    set shoot(shooting) {
        if (shooting) {
            this.fire();
            this._timerId = window.setInterval(this.fire, 500);
        } else {
            window.clearInterval(this._timerId);
        }
    }
}