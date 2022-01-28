import {Application, SCALE_MODES, settings} from "pixi.js";

import Player from "./components/player";
import Zombie from "./components/zombie";
import Spawner from "./components/spawner";

const canvasSize = 512;
const canvasElement = document.querySelector('#myCanvas');

const app = new Application({
    view: canvasElement as HTMLCanvasElement,
    width: canvasSize,
    height: canvasSize,
    backgroundColor: 0x312a2b,
    resolution: 2
});

settings.SCALE_MODE = SCALE_MODES.NEAREST;
const player = new Player(app);
const spawner = new Spawner(new Zombie({app, player}));

app.ticker.add(() => {
    player.update();
    spawner.elements.forEach((element: Zombie) => element.update());
});