import {Sprite,Loader} from "pixi.js";
import Victor from "victor";
import Player from "./player";

export default class Bullet extends Sprite {
    public velocity: Victor;

    constructor(player: Player, texture = Loader.shared.resources["bullet"].texture) {
        super();
        this.texture = Loader.shared.resources["bullet"].texture;
        this.anchor.set(0.5);
        this.scale.set(0.2);
        this.position.set(player.position.x, player.position.y);
        this.rotation = player.rotation;
        this.velocity = null;
    }
}