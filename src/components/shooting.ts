import {Application} from "pixi.js";
import Victor from "victor";
import Player from "./player";
import Bullet from "./bullet";
import {assetsPath} from "../utils/constants";

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
    _bulletRadius: number;
    _sound: HTMLAudioElement;

    constructor(options: Options) {
        this._options = options;
        this._speed = 4;
        this._bullets = [];
        this._maxBullets = 3;
        this._bulletRadius = 8;
        this._sound = new Audio(`${assetsPath}/sounds/shoot.mp3`);
    }

    _playSound() {
        this._sound.currentTime = 0;
        this._sound.play();
    }

    _fire() {
        this._playSound();
        const {stage} = this._options.app;

        if (this._bullets.length >= this._maxBullets) {
            let b = this._bullets.shift();
            stage.removeChild(b);
        }

        this._bullets.forEach((b) => stage.removeChild(b));
        this._bullets = this._bullets.filter((bullet) =>
            Math.abs(bullet.position.x) < this._options.app.screen.width &&
            Math.abs(bullet.position.y) < this._options.app.screen.height
        );
        this._bullets.forEach((b) => stage.addChild(b));

        const bullet = this._setupBullet(this._options);
        this._bullets.push(bullet);
        stage.addChild(bullet);
    }

    _setupBullet({player} = this._options) {
        const bullet = new Bullet(player);
        const angle = player.rotation - Math.PI / 2;
        bullet.velocity = new Victor(Math.cos(angle), Math.sin(angle)).multiplyScalar(this._speed);
        return bullet;
    }

    set shoot(shooting: boolean) {
        if (shooting) {
            this._fire();
            this._timerId = window.setInterval( () => this._fire(), 500);
        } else {
            window.clearInterval(this._timerId);
        }
    }

    public update(delta: number) {
        this._bullets.forEach((bullet) =>
            bullet.position.set(
                bullet.position.x + bullet.velocity.x * delta,
                bullet.position.y + bullet.velocity.y * delta
            )
        );
    }

    get bullets() {
        return this._bullets;
    }
}