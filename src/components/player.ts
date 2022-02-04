import {Application, Sprite, Texture} from "pixi.js";
import Shooting from "./shooting";
import HealthBar from "./healthBar";

export default class Player {
    _spriteSize: number;
    _sprite: Sprite;
    _app: Application;
    _healthBar: HealthBar;
    _health: number;
    _isDead: boolean;
    _lastMouseButton: number;

    public shooting: Shooting;

    constructor(app: Application) {
        this._app = app;
        this._isDead = false;
        this._spriteSize = 32;
        this._sprite = new Sprite(Texture.WHITE);
        this._sprite.anchor.set(0.5);
        this._sprite.position.set(app.screen.width / 2, app.screen.height / 2);
        this._sprite.width = this._sprite.height = this._spriteSize;
        this._sprite.tint = 0xea985d;
        this._lastMouseButton = 0;
        this._healthBar = new HealthBar(this._app);
        this._health = this._healthBar.maxLife;
        this.shooting = new Shooting({app, player: this._sprite});
        this._app.stage.sortableChildren = true;
        this._app.stage.addChild(this._sprite, this._healthBar);
    }

    public attack() {
        this._health -= 1;
        this._healthBar.updateWidth(this._health);
        if (this._health <= 0) {
            this._isDead = true;
        }
    }

    get position() {
        return this._sprite.position;
    }

    get width() {
        return this._sprite.width;
    }

    public update(delta: number) {
        const mouse = this._app.renderer.plugins.interaction.mouse;
        const cursorPosition = mouse.global;
        this._sprite.rotation = Math.atan2(
            cursorPosition.y - this._sprite.position.y,
            cursorPosition.x - this._sprite.position.x
        ) + Math.PI / 2;

        if (mouse.buttons !== this._lastMouseButton) {
            this.shooting.shoot = mouse.buttons !== 0;
            this._lastMouseButton = mouse.buttons;
        }

        this.shooting.update(delta);
    }

}