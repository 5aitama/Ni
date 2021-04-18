import RaymarchingScene from "./exemples/Raymarching/scene";
import SceneManager from "./engine/Core/Genesis/SceneManager";

const canvas = document.querySelector('#canvas') as HTMLCanvasElement | undefined;
const btn    = document.querySelector('#changescene') as HTMLButtonElement | undefined;

if(!canvas)
    throw new Error("Canvas not found !");

if(!btn)
    throw new Error("Button not found !");

const raymarchingScene  = new RaymarchingScene(canvas);
const sceneManager      = new SceneManager(raymarchingScene);

sceneManager.useScene(raymarchingScene);