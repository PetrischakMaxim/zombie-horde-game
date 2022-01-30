import {Application, Sprite, Texture} from "pixi.js";
import Shooting from "./shooting";

export default class Player {
    _spriteSize: number;
    _sprite: Sprite;
    _app: Application;

    _lastMouseButton: number;
   public shooting: Shooting;

    constructor(app: Application) {
        this._app = app;
        this._spriteSize = 32;
        this._sprite = new Sprite(Texture.WHITE);
        this._sprite.anchor.set(0.5);
        this._sprite.position.set(app.screen.width / 2, app.screen.height / 2);
        this._sprite.width = this._sprite.height = this._spriteSize;
        this._sprite.tint = 0xea985d;
        this._lastMouseButton = 0;
        this.shooting = new Shooting({app, player: this._sprite});
        app.stage.addChild(this._sprite);
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