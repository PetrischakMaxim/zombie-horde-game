import {Application} from "pixi.js";
import Victor from "victor";
import Bullet from "./bullet";
import Player from "./player";

interface Options {
    app: Application,
    player: Player
}

export default class Shooting {
    _options: Options;
    _bullets: Array<Bullet>;
    _speed: number;
    _maxBullets: number;
    _timerId: number;

    constructor(options: Options) {
        this._options = options;
        this._speed = 4;
        this._bullets = [];
        this._maxBullets = 3;
    }

    _fire() {
        this._checkBullets();
        this._renderBullet(new Bullet());
    }

    _renderBullet(bullet: Bullet) {
        bullet.position.set(
            this._options.player.position.x,
            this._options.player.position.y
        );
        bullet.rotation = this._options.player.rotation;

        const angle = this._options.player.rotation - Math.PI / 2;

        bullet.velocity = new Victor(
            Math.cos(angle),
            Math.sign(angle)
        ).multiplyScalar(this._speed);

        this._bullets.push(bullet);
        this._options.app.stage.addChild(bullet);
    }

    _checkBullets() {
        if (this._bullets.length >= this._maxBullets) {
            const bullet = this._bullets.shift();
            this._options.app.stage.removeChild(bullet);
        }

        this._bullets.forEach(bullet => this._options.app.stage.removeChild(bullet));
        this._bullets = this._bullets.filter(
            (bullet) =>
                Math.abs(bullet.position.x) < this._options.app.screen.width &&
                Math.abs(bullet.position.y) < this._options.app.screen.height
        );

        this._bullets.forEach(bullet => this._options.app.stage.addChild(bullet));
    }

    public update(delta: number) {
        this._bullets.forEach((bullet) =>
            bullet.position.set(
                bullet.position.x + bullet.velocity.x * delta,
                bullet.position.y + bullet.velocity.y * delta
            )
        );
    }

    set shoot(shooting: boolean) {
        if (shooting) {
            this._fire();
            this._timerId = window.setInterval(this._fire, 500);
        } else {
            window.clearInterval(this._timerId);
        }
    }

    get bullets() {
        return this._bullets;
    }

}