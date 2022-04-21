import {Application} from "pixi.js";
import {IApplicationOptions} from "@pixi/app";
import State from "./state";
import Weather from "./weather";
import Player from "./player";
import Spawner from "./spawner";
import Zombie from "./zombie";
import Counter from "./counter";
import {assetsPath, sceneText} from "../utils/constants";
import {loadAssets} from "../utils/loadAssets";
import {createScene} from "../utils/createScene";
import {bulletHitTest} from "../utils/bulletHitTest";
import {initSound} from "../utils/initSound";

export default class Game extends Application {
    public state: State;
    public weather: Weather;
    public counter: Counter;

    constructor(props: IApplicationOptions ) {
        super(props);
        this.state = null;
        this.weather = null;
        this.counter = null;
    }

    public async init() {
        this.state = State.PREINTRO;
        try {
            await loadAssets();
            this.weather = new Weather(this);
            this.counter = new Counter(this);
            const player = new Player(this);
            const spawner = new Spawner({
                app: this,
                callback: () => new Zombie({ app: this, player })
            });

            const gamePreIntroScene = createScene(this,sceneText.title, sceneText.intro);
            const gameStartScene = createScene(this,sceneText.title, sceneText.start);
            const gameOverScene = createScene(this,sceneText.title, sceneText.end);

            this.ticker.add((delta) => {
                if (player.isDead) this.state = State.GAMEOVER;
                gamePreIntroScene.visible = this.state === State.PREINTRO;
                gameStartScene.visible = this.state === State.START;
                gameOverScene.visible = this.state === State.GAMEOVER;
                switch (this.state) {
                    case State.PREINTRO:
                        player.scale = 4;
                        break;
                    case State.INTRO:
                        player.scale = 1;
                        this.state = State.START;
                        break;
                    case State.RUNNING:
                        player.update(delta);
                        spawner.children.forEach((zombie) => zombie.update(delta));
                        bulletHitTest(player.shooting.bullets, spawner.children, 8,16, this.counter);
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

    public run() {
        const gameMusic = initSound(`${assetsPath}/sounds/HordeZee.mp3`);
        const zombieHordeSound = initSound(`${assetsPath}/sounds/horde.mp3`);

        switch (this.state) {
            case State.PREINTRO:
                this.state = State.INTRO;
                gameMusic.play();
                this.weather.enableSound();
                break;
            case State.START:
                this.state = State.RUNNING;
                zombieHordeSound.play();
                break;
            default:
                break;
        }
    }
}