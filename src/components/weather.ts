import {Sprite, Texture, ParticleContainer, Loader, Application} from "pixi.js";
import * as PARTICLES from "pixi-particles";
import { rain } from "../utils/emmiter-configs";
import {assetsPath} from "../utils/constants";

export default class Weather {
    _lightningGap : {min: number, max: number};
    _app: Application;
    _lightning: Sprite;
    _thunder: HTMLAudioElement;
    _rain: HTMLAudioElement;
    _isSound: Boolean;

    constructor(app: Application ) {
        this._lightningGap = { min: 9000, max: 29000 };
        this._app = app;
        this._createAudio();
        this._lightning = new Sprite(Texture.WHITE);
        this._lightning.width = this._lightning.height = app.screen.width;
        this._lightning.tint = 0xffffff;
        this._lightning.alpha = 0.8;
        this._flash();
        // rain
        const container = new ParticleContainer();
        container.zIndex = 2;
        app.stage.addChild(container);
        const emitter = new PARTICLES.Emitter(
            container,
            [Loader.shared.resources["rain"].texture],
            rain
        );
        let elapsed = Date.now();
        const update = function () {
            requestAnimationFrame(update);
            const now = Date.now();
            emitter.update((now - elapsed) * 0.001);
            elapsed = now;
        };
        emitter.emit = true;
        update();
    }

    private _createAudio() {
        this._thunder = new Audio(`${assetsPath}/sounds/thunder.mp3`);
        this._rain = new Audio(`${assetsPath}/sounds/rain.mp3`);
        this._rain.addEventListener("timeupdate", function () {
            if (this.currentTime > this.duration - 0.2) {
                this.currentTime = 0;
            }
        });
    }

    private async _flash() {
        await new Promise((response) =>
            setTimeout(
                response,
                this._lightningGap.min +
                (this._lightningGap.max - this._lightningGap.min) * Math.random()
            )
        );
        this._app.stage.addChild(this._lightning);
        if (this._isSound) {
            this._thunder.play();
        }
        await new Promise((res) => setTimeout(res, 200));
        this._app.stage.removeChild(this._lightning);
        this._flash();
    }

    public enableSound() {
        this._isSound = true;
        this._rain.play();
    }
}