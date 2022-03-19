import {Application, Container, SCALE_MODES, Text, settings} from "pixi.js";
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

app.isGameStarted = false;
settings.SCALE_MODE = SCALE_MODES.NEAREST;

const startScene = createScene("Click to Start");
const endScene = createScene("Game Over");

const player = new Player(app);
const spawner = new Spawner({
    app: app,
    callback: () => new Zombie({app, player})
});

app.ticker.add((delta) => runGame(delta));

function runGame(delta: number) {
    endScene.visible = player.isDead;
    if(!app.isGameStarted) {
        return;
    }

    player.update(delta);
    spawner.children.forEach((zombie: Zombie) => zombie.update());

    bulletHitTest(
        player.shooting.bullets,
        spawner.children,
        8,
        16,
    );
}

function createScene(sceneText: string) {
    const sceneContainer = new Container();
    const text = new Text(sceneText);
    sceneContainer.x = app.screen.width  / 2;
    sceneContainer.y = 0;
    sceneContainer.zIndex = 1;
    sceneContainer.addChild(text);
    app.stage.addChild(sceneContainer);
    return sceneContainer;
}

function startGame() {
    app.isGameStarted = true;
    startScene.visible = false;
}

document.addEventListener("click", startGame, {once: true});

