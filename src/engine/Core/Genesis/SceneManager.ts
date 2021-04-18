import Scene from "./Scene";


export default class SceneManager {
    private scene?: Scene;

    constructor(scene?: Scene) {
        this.scene = scene;
        this.loop();
    }

    public useScene(scene: Scene) {
        const oldScene = this.scene;
        this.scene = undefined;

        if(oldScene)
            oldScene.onDestroy();
        
        scene.setupScene().then(_ => this.scene = scene);
    }

    private async loop(time = 0) {
        requestAnimationFrame((time) => this.loop(time));
        
        if(!this.scene) 
            return;
        
        await this.scene.loopScene(time);
    }
}