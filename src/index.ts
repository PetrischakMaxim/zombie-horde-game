import * as PIXI from "pixi.js";
import Victor from "victor";
import Player from "./components/player";
import Zombie from "./components/zombie";
import Spawner from "./components/spawner";

const canvasSize = 512;
const canvasElement = document.querySelector('#myCanvas');

const app = new PIXI.Application({
    view: canvasElement as HTMLCanvasElement,
    width: canvasSize,
    height: canvasSize,
    backgroundColor: 0x312a2b,
    resolution: 2
});

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const player = new Player({app});
const spawner = new Spawner({
    create: () => new Zombie({app, player})
})

app.ticker.add(() => {
    player.update();
    spawner.elements.forEach((element) => {
        element.update()
    });
});