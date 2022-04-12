import {Sprite,Loader} from "pixi.js";
import Victor from "victor";

export default class Bullet extends Sprite {
    public velocity: Victor;

    constructor(texture = Loader.shared.resources["bullet"].texture) {
        super();
        this.texture = texture;
        this.velocity = null;
    }
}