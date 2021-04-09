import Scene from "./Core/Scene";

const canvas = document.querySelector('#canvas') as HTMLCanvasElement | null;
if(!canvas)
    throw new Error("Canvas not found !");

const scene = new Scene(canvas);