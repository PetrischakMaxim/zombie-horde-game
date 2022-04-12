import {Application, Container, Text, TextStyle} from "pixi.js";
import {textStyle, subTextStyle} from "./constants";

export default function createScene(app: Application,sceneText: string, subSceneText: string) {
    const sceneContainer = new Container();

    const text = new Text(sceneText, new TextStyle(textStyle));
    text.x = app.screen.width / 2;
    text.y = 0;
    text.anchor.set(0.5, 0);

    const subText = new Text(subSceneText, new TextStyle(subTextStyle));
    subText.x = app.screen.width / 2;
    subText.y = 50;
    subText.anchor.set(0.5, 0);

    sceneContainer.zIndex = 1;
    sceneContainer.addChild(text,subText);
    app.stage.addChild(sceneContainer);
    return sceneContainer;
}