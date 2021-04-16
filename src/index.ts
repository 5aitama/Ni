import RaymarchingScene, { Scene2 } from "./exemples/Raymarching/scene";
import SceneManager from "./engine/Core/Genesis/SceneManager";

const canvas = document.querySelector('#canvas') as HTMLCanvasElement | undefined;
const btn = document.querySelector('#changescene') as HTMLButtonElement | undefined;

if(!canvas)
    throw new Error("Canvas not found !");

if(!btn)
    throw new Error("Button not found !");

const sceneA = new RaymarchingScene(canvas);
const sceneB = new Scene2(canvas);

const sceneManager = new SceneManager(sceneA);

let state = false;
sceneManager.useScene(sceneA);

btn.onclick = (ev: MouseEvent) => {
    state = !state;
    sceneManager.useScene(state ? sceneB : sceneA);
}