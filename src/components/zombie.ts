import {Graphics}  from "pixi.js";
import Victor from "victor";

export default class Zombie {
    constructor({app, player}) {
        this.app = app;
        this.player = player;
        this.radius = 16;
        this.speed = 2;
        this.sprite = new Graphics();
        const r = this.randomSpawnPoint();
        this.sprite.position.set(r.x, r.y);
        this.sprite.beginFill(0xFF0000, 1);
        this.sprite.drawCircle(0, 0, this.radius);
        this.sprite.endFill();
        app.stage.addChild(this.sprite);
    }

    update() {
        const e = new Victor(this.sprite.position.x, this.sprite.position.y);
        const s = new Victor(this.player.position.x, this.player.position.y);
        if (e.distance(s) < this.player.width / 2) {
            //this.attackPlayer();
            const r = this.randomSpawnPoint();
            this.sprite.position.set(r.x, r.y);
            return;
        }
        const d = s.subtract(e);
        const v = d.normalize().multiplyScalar(this.speed);
        this.sprite.scale.x = v.x < 0 ? 1 : -1;
        this.sprite.position.set(
            this.sprite.position.x + v.x,
            this.sprite.position.y + v.y
        );
    }

    randomSpawnPoint() {
        const edge = Math.floor(Math.random() * 4);
        const spawnPoint = new Victor(0, 0);
        const canvasSize = this.app.screen.width;
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
}
