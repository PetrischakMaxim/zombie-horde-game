import { SCALE_MODES, settings} from "pixi.js";
import Game from "./components/game";
import {gameOptions} from "./utils/constants";

settings.SCALE_MODE = SCALE_MODES.NEAREST;
const game = new Game(gameOptions);
game.init()
    .then(() => document.addEventListener("click", () => game.run()));

