import {Sprite,Texture} from "pixi.js";

export default class Player {
    constructor({app}) {
        this.app = app;
        this.sprite = new Sprite(Texture.WHITE);
        this.spriteSize = 32;
        this.sprite.anchor.set(0.5);
        this.sprite.position.set(app.screen.width / 2, app.screen.height / 2);
        this.sprite.width = this.sprite.height = this.spriteSize;
        this.sprite.tint = 0xea985d;

        app.stage.addChild(this.sprite);
    }

    get position() {
        return this.sprite.position;
    }

    get width() {
        return this.sprite.width;
    }

    update() {
        const cursorPosition = this.app.renderer.plugins.interaction.mouse.global;
        const angle = Math.atan2(
            cursorPosition.y - this.sprite.position.y,
            cursorPosition.x - this.sprite.position.x
        ) + Math.PI / 2;

        this.sprite.rotation = angle;
    }

}