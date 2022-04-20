import {AnimatedSprite, Application, Loader} from "pixi.js";
import Victor from "victor";
import Player from "./player";
import {assetsPath, zombieNames} from "../utils/constants";

interface Options {
    app: Application,
    player: Player
}

export default class Zombie {
    _sprite: AnimatedSprite;
    _speed: number;
    _isAttacking: boolean;
    _options: Options;
    _timerId: number;
    _textures: {
        die: AnimatedSprite,
        attack: AnimatedSprite,
        default: AnimatedSprite
    };

    constructor(options: Options) {
        this._options = options;
        const r = this._randomSpawnPoint();
        const zombieName = zombieNames[Math.floor(Math.random() * zombieNames.length)];
        const {spritesheet} = Loader.shared.resources[`${assetsPath}/img/${zombieName}.json`];

        this._speed = zombieName === "quickzee" ? 1 : 0.25;
        this._textures = {
            die: new AnimatedSprite(spritesheet.animations["die"]),
            attack: new AnimatedSprite(spritesheet.animations["attack"]),
            default: new AnimatedSprite(spritesheet.animations["walk"]),
        };
        this._sprite = new AnimatedSprite(spritesheet.animations["walk"]);
        this._sprite.animationSpeed = zombieName === "quickzee" ? 0.2 : 0.1;
        this._sprite.play();
        this._sprite.anchor.set(0.5);
        this._sprite.position.set(r.x, r.y);
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
        }, 500);

        this._sprite.textures = this._textures.attack.textures;
        this._sprite.animationSpeed = 0.1;
        this._sprite.play();
    }

    public update(delta: number) {
        const e = new Victor(this._sprite.position.x, this._sprite.position.y);
        const s = new Victor(this._options.player.position.x, this._options.player.position.y);
        if (e.distance(s) < this._options.player.width / 2) {
            this._attack();
            return;
        }
        const d = s.subtract(e);
        const velocity = d.normalize().multiplyScalar(this._speed * delta);
        this._sprite.scale.x = velocity.x < 0 ? 1 : -1;
        this._sprite.position.set(
            this._sprite.position.x + velocity.x,
            this._sprite.position.y + velocity.y
        );
    }

    public kill() {
        this._sprite.textures = this._textures.die.textures;
        this._sprite.loop = false;
        this._sprite.onComplete = () => {
            setTimeout(() => {
                this._options.app.stage.removeChild(this._sprite);
            }, 3000)
        }
        this._sprite.play();
        window.clearInterval(this._timerId);
    }

    get position() {
        return this._sprite.position;
    }
}