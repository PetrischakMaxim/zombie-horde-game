import {Application, Loader, AnimatedSprite} from "pixi.js";
import {assetsPath} from "../utils/constants";
import Shooting from "./shooting";
import HealthBar from "./healthBar";

export default class Player {
    _spriteSize: number;
    _sprite: AnimatedSprite;
    _app: Application;
    _healthBar: HealthBar;
    _health: number;
    _lastMouseButton: number;
    _textures: {
        idle: AnimatedSprite,
        shoot: AnimatedSprite,
    };

    public isDead: boolean;
    public shooting: Shooting;
    public rotation: number;

    constructor(app: Application) {
        this.isDead = false;
        this._app = app;
        this._spriteSize = 64;
        const {spritesheet} = Loader.shared.resources[`${assetsPath}/img/hero_male.json`];
        this._textures = {
            idle: new AnimatedSprite(spritesheet.animations["idle"]),
            shoot: new AnimatedSprite(spritesheet.animations["shoot"]),
        };
        this._sprite = new AnimatedSprite(spritesheet.animations["idle"]);
        this._sprite.animationSpeed = 0.1;
        this._sprite.play();
        this._sprite.anchor.set(0.5);
        this._sprite.position.set(app.screen.width / 2, app.screen.height / 2);

        this._lastMouseButton = 0;
        this._healthBar = new HealthBar(this._app);
        this._health = this._healthBar.maxLife;
        this._app.stage.sortableChildren = true;
        this._app.stage.addChild(this._sprite, this._healthBar);
        this.shooting = new Shooting({app, player: this});
    }

    public attack() {
        this._health -= 1;
        this._healthBar.updateWidth(this._health);
        if (this._health <= 0) {
            this.isDead = true;
        }
    }

    public update(delta: number) {
        if (this.isDead) {
            return;
        }
        const mouse = this._app.renderer.plugins.interaction.mouse;
        const cursorPosition = mouse.global;
        this.rotation = Math.atan2(
            cursorPosition.y - this._sprite.position.y,
            cursorPosition.x - this._sprite.position.x
        ) + Math.PI / 2;

        this._sprite.scale.x = cursorPosition.x < this._sprite.position.x ? -1 : 1;

        if (mouse.buttons !== this._lastMouseButton) {
            this._sprite.textures = (mouse.buttons === 0) ?
                this._textures.idle.textures : this._textures.shoot.textures;
            this._sprite.play();
            this.shooting.shoot = mouse.buttons !== 0;
            this._lastMouseButton = mouse.buttons;
        }

        this.shooting.update(delta);
    }

    get position() {
        return this._sprite.position;
    }

    get width() {
        return this._sprite.width;
    }

    set scale(scale: number) {
        this._sprite.scale.set(scale);
    }
}