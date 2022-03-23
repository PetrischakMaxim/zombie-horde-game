import {Application, Container, SCALE_MODES, Text, settings} from "pixi.js";
import {bulletHitTest} from "./components/utils";
import Player from "./components/player";
import Zombie from "./components/zombie";
import Spawner from "./components/spawner";
import {State} from "./components/state";
import loadAssets from "./utils/loadAssets";
import createScene from "./utils/createScene";

const gameState = new State();
const canvasSize = 512;
const canvasElement = document.querySelector('#myCanvas') as HTMLCanvasElement;

const app = new Application ({
    view: canvasElement as HTMLCanvasElement,
    width: canvasSize,
    height: canvasSize,
    backgroundColor: 0x312a2b,
    resolution: 2
});

settings.SCALE_MODE = SCALE_MODES.NEAREST;

const startScene = createScene(app,"Click to Start");
const endScene = createScene(app, "Game Over");
endScene.visible = false;

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

            if(player.isDead) {
                endGame();
                return;
            }

            if(gameState.isStarted) {
                player.update(delta);
                spawner.children.forEach((zombie: Zombie) => zombie.update(delta));

                bulletHitTest(
                    player.shooting.bullets,
                    spawner.children,
                    8,
                    16,
                );
            }
        }

        // End refactor
    } catch (error) {
        console.log(error.message);
    }
}

// Todo add scene class
function startGame() {
    gameState.isStarted = true;
    startScene.visible = false;
}

function endGame() {
    gameState.isStarted = false;
    gameState.isEnded = true;
    endScene.visible = true;
}

initGame()
    .then(onDocumentClick);

function onDocumentClick() {
    document.addEventListener("click", startGame, {once: true});
}


