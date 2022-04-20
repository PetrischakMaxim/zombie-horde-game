import { SCALE_MODES, settings} from "pixi.js";
import Player from "./components/player";
import Zombie from "./components/zombie";
import Spawner from "./components/spawner";
import Weather from "./components/weather";
import State from "./components/state";
import Game from "./components/game";
import {loadAssets} from "./utils/loadAssets";
import {createScene} from "./utils/createScene";
import {initSound} from "./utils/initSound";
import {assetsPath, gameOptions, sceneText} from "./utils/constants";
import {bulletHitTest} from "./utils/bulletHitTest";

const game = new Game(gameOptions);
settings.SCALE_MODE = SCALE_MODES.NEAREST;

initGame();

async function initGame() {
    game.state = State.PREINTRO;
    try {
        await loadAssets();
        game.weather = new Weather(game);
        const player = new Player(game);
        const spawner = new Spawner({
            app: game,
            callback: () => new Zombie({ app: game, player })
        });

        const gamePreIntroScene = createScene(game,sceneText.title, sceneText.intro);
        const gameStartScene = createScene(game,sceneText.title, sceneText.start);
        const gameOverScene = createScene(game,sceneText.title, sceneText.end);

        game.ticker.add((delta) => {
            if (player.isDead) game.state = State.GAMEOVER;
            gamePreIntroScene.visible = game.state === State.PREINTRO;
            gameStartScene.visible = game.state === State.START;
            gameOverScene.visible = game.state === State.GAMEOVER;
            switch (game.state) {
                case State.PREINTRO:
                    player.scale = 4;
                    break;
                case State.INTRO:
                    player.scale = 1;
                    // if (player.scale <= 1)
                    game.state = State.START;
                    break;
                case State.RUNNING:
                    player.update(delta);
                    spawner.children.forEach((zombie) => zombie.update(delta));
                    bulletHitTest(player.shooting.bullets, spawner.children, 8,16);
                    break;
                default:
                    break;
            }
        });
    } catch (error) {
        console.log(error.message);
        console.log("Load failed");
    }
}

function onDocumentClick() {
    const gameMusic = initSound(`${assetsPath}/sounds/HordeZee.mp3`);
    const zombieHordeSound = initSound(`${assetsPath}/sounds/horde.mp3`);

    switch (game.state) {
        case State.PREINTRO:
            game.state = State.INTRO;
            gameMusic.play();
            game.weather.enableSound();
            break;
        case State.START:
            game.state = State.RUNNING;
            zombieHordeSound.play();
            break;
        default:
            break;
    }
}

document.addEventListener("click", onDocumentClick);