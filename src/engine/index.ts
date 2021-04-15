import ComponentBase from "./Core/ComponentBase";
import Scene from "./Core/Scene";
import GameObjectBase from "./GameObjectBase";

const canvas = document.querySelector('#canvas') as HTMLCanvasElement | null;
if(!canvas)
    throw new Error("Canvas not found !");

// const scene = new Scene(canvas);

class MyComponent extends ComponentBase {
    constructor() {
        super();
    }
}

const myComponent = new MyComponent();
const gameObject = new GameObjectBase();

gameObject.addComponent(myComponent);