import {Loader} from "pixi.js";
import {zombieNames,assetsPath} from "./constants";

export default async function loadAssets() {

    return new Promise((resolve,reject) => {
        zombieNames.forEach(name => Loader.shared.add(`${assetsPath}img/${name}.json`))
        Loader.shared.add(`${assetsPath}img/hero_male.json`);
        Loader.shared.add("bullet", `${assetsPath}img/bullet.png`);
        Loader.shared.add("rain", `${assetsPath}img/rain.png`);
        Loader.shared.onComplete.add(resolve);
        Loader.shared.onError.add(reject);
        Loader.shared.load();
    });
}