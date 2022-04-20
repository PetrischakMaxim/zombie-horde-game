import {Application} from "pixi.js";
import State from "./state";
import Weather from "./weather";
import {IApplicationOptions} from "@pixi/app";

export default class Game extends Application {
    public state: State;
    public weather: Weather;

    constructor(props: IApplicationOptions ) {
        super(props);
        this.state = null;
        this.weather = null;
    }
}