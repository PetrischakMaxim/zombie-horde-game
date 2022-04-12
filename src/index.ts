import {Application, SCALE_MODES, settings} from "pixi.js";
import {bulletHitTest} from "./utils/bulletHitTest";
import Player from "./components/player";
import Zombie from "./components/zombie";
import Spawner from "./components/spawner";
import Weather from "./components/weather";
import {State} from "./components/state";
import loadAssets from "./utils/loadAssets";
import createScene from "./utils/createScene";

const canvasSize = 512;
const canvasElement = document.querySelector('#root') as HTMLCanvasElement;

const app = new Application ({
    view: canvasElement as HTMLCanvasElement,
    width: canvasSize,
    height: canvasSize,
    backgroundColor: 0x312a2b,
    resolution: 2
});

settings.SCALE_MODE = SCALE_MODES.NEAREST;

const gameState = State.PREINTRO;
const introScene = createScene(app,"HordeZee", "Click to Continue");
const startScene = createScene(app,"HordeZee", "Click to Start");
const endScene = createScene(app,"HordeZee", "Game Over");


async function initGame() {
    try {
        await loadAssets();

        // Todo Refactor
        const player = new Player(app);
        const spawner = new Spawner({
            app: app,
            state: gameState,
            callback: () => new Zombie({app, player})
        });

        app.ticker.add((delta) => runGame(delta));

        const runGame = (delta: number) => {
            if(player.isDead) gameState = State.GAMEOVER;
            introScene.visible = gameState.PREINTRO;
            startScene.visible = gameState.START;
            endScene.visible = gameState.GAMEOVER;

            switch (gameState) {
                case gameState.PREINTRO:
                    player.scale = 4;
                    break;
                case gameState.INTRO:
                    player.scale -= 0.01;
                    if (player.scale <= 1) gameState = gameState.START;
                    break;
                case gameState.RUNNING:
                    player.update(delta);
                    spawner.children.forEach((zombie: Zombie) => zombie.update(delta));

                    bulletHitTest(
                        player.shooting.bullets,
                        spawner.children,
                        8,
                        16,
                    );
                    break;
                default:
                    break;
            }
        }

        // End refactor
    } catch (error) {
        console.log(error.message);
    }
}

function clickHandler() {

    switch (gameState) {
        case gameState.PREINTRO:
            gameState = gameState.INTRO;
            // music.play();
            // weather.enableSound();
            break;
        case gameState.START:
            gameState = gameState.RUNNING;
            // zombieHorde.play();
            break;
        default:
            break;
    }
}

initGame()
    .then(() => {
        document.addEventListener("click", clickHandler, {once: true});
    });







