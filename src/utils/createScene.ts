import {Application, Container, Text} from "pixi.js";

export default function createScene(app: Application,sceneText: string) {
    const text = new Text(sceneText);
    const sceneContainer = new Container();
    text.style.fill = '#fff';
    sceneContainer.x = 50;
    sceneContainer.y = 0;
    sceneContainer.zIndex = 1;
    sceneContainer.addChild(text);
    app.stage.addChild(sceneContainer);
    return sceneContainer;
}