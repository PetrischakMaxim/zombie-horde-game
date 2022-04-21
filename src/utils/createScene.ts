import {Application, Container, Text, TextStyle} from "pixi.js";

export function createScene(app: Application, sceneText: string, subSceneText: string) {
    const sceneContainer = new Container();
    const text = new Text(sceneText, new TextStyle({
        fontSize: 36,
        fontFamily: "Arial",
        fontStyle: "normal",
        fontWeight: "bold",
        fill: ["#88A050", "#ff0000"], // gradient
        stroke: "#F0E8C8",
        strokeThickness: 2,
        dropShadow: true,
        dropShadowColor: "#000000",
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
        lineJoin: "round"
    }));

    text.x = app.screen.width / 2;
    text.y = 0;
    text.anchor.set(0.5, 0);

    const subText = new Text(subSceneText, new TextStyle({
        fontSize: 22,
        fontFamily: "Arial",
        fontStyle: "normal",
        fontWeight: "bold",
        fill: ["#88A050"], // gradient
        stroke: "#0",
        strokeThickness: 2,
        dropShadow: true,
        dropShadowColor: "#000000",
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
        lineJoin: "round"
    }));

    subText.x = app.screen.width / 2;
    subText.y = 50;
    subText.anchor.set(0.5, 0);

    sceneContainer.zIndex = 1;
    sceneContainer.addChild(text,subText);
    app.stage.addChild(sceneContainer);
    return sceneContainer;
}