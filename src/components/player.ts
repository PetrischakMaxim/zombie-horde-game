import {Application, Sprite, Texture} from "pixi.js";

export default class Player {
    _spriteSize: number;
    _sprite: Sprite;
    _app: Application;
    rotation: number;

    constructor(app: Application) {
        this._app = app;
        this._spriteSize = 32;
        this._sprite = new Sprite(Texture.WHITE);
        this._sprite.anchor.set(0.5);
        this._sprite.position.set(app.screen.width / 2, app.screen.height / 2);
        this._sprite.width = this._sprite.height = this._spriteSize;
        this._sprite.tint = 0xea985d;
        app.stage.addChild(this._sprite);
    }

    get position() {
        return this._sprite.position;
    }

    get width() {
        return this._sprite.width;
    }

    update() {
        const cursorPosition = this._app.renderer.plugins.interaction.mouse.global;
        this._sprite.rotation = Math.atan2(
            cursorPosition.y - this._sprite.position.y,
            cursorPosition.x - this._sprite.position.x
        ) + Math.PI / 2;
    }

}