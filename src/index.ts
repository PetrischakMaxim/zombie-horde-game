import {Application, SCALE_MODES, settings} from "pixi.js";
import {bulletHitTest} from "./components/utils";
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
const spawner = new Spawner({
    callback: () => new Zombie({app, player})
});

app.ticker.add((delta) => {
    player.update(delta);
    spawner.children.forEach((zombie: Zombie) => zombie.update());

    bulletHitTest(
        player.shooting.bullets,
        spawner.children,
        8,
        16,
    );
});
