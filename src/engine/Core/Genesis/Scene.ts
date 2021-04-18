import GameObjectBase       from "../Base/GameObjectBase";
import Number2              from "../Math/components/Number2";
import { ushort2 }          from "../Math/components/Vec2";
import { SDictionaryOf }    from "./Dictionary";

/**
 *  2D Scene.
 */
export default class Scene {
    private gl              : WebGLRenderingContext;
    private gameObjects     : SDictionaryOf<GameObjectBase> = {};
    protected mousePosition : Number2 = new Number2(0);
    protected time          : number = 0;
    protected deltaTime     : number = 0;
    private lastTime        : number = 0;

    constructor(canvas: HTMLCanvasElement) {
        const gl = canvas.getContext('webgl');

        if(!gl) throw new Error("Failed to get webgl context: Please live in 2020 dude...");

        this.gl = gl;
    }

    public async setupScene() {
        this.setupEvents();
        await this.onInit();
    }

    protected setupEvents() {
        window.onresize = () => this.onResize(this.gl);
        window.onmousemove = (ev: MouseEvent) => this.onMouseMove(ev);

        this.onResize(this.gl);
    }

    private onMouseMove(ev: MouseEvent) {
        this.mousePosition.x = ev.clientX * devicePixelRatio;
        this.mousePosition.y = ev.clientY * devicePixelRatio;
    }

    public getContext() {
        return this.gl;
    }

    private onResize(gl: WebGLRenderingContext) 
    {
        const pixelRatio    = window.devicePixelRatio;
        const screenWidth   = Math.floor((gl.canvas as HTMLCanvasElement).clientWidth  * pixelRatio);
        const screenHeight  = Math.floor((gl.canvas as HTMLCanvasElement).clientHeight * pixelRatio);

        // Check if the canvas is not the same size.
        if (gl.canvas.width  !== screenWidth ||
            gl.canvas.height !== screenHeight) 
        {
            // Make the canvas the same size
            gl.canvas.width  = screenWidth;
            gl.canvas.height = screenHeight;
        }
    }

    protected async onInit() {
        for(const key in this.gameObjects)
            this.gameObjects[key].onInit(this);
    }

    protected async onUpdate() {
        for(const key in this.gameObjects)
            this.gameObjects[key].onUpdate(this);
    }

    protected onBeforeRender() {
        for(const key in this.gameObjects)
            this.gameObjects[key].onBeforeRender(this);
    }

    protected onRender() {
        
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        for(const key in this.gameObjects)
            this.gameObjects[key].onRender(this);
    }

    protected onAfterRender() {
        for(const key in this.gameObjects)
            this.gameObjects[key].onAfterRender(this);
    }

    public onDestroy() {
        for(const key in this.gameObjects)
            this.gameObjects[key].onDestroy(this);
    }

    getSize() {
        return new ushort2(this.gl.canvas.width, this.gl.canvas.height);
    }

    addGameObject(name: string, gameObject: GameObjectBase) {
        if(this.gameObjects[name]) {
            console.warn(`Add game object failed: Another game object with name "${name}" already exist!`);
            return false;
        }

        this.gameObjects[name] = gameObject;
        this.gameObjects[name].onInit(this);

        return true;
    }

    getGameObject(name: string) {
        if(!this.gameObjects[name]) {
            console.warn(`Get game object failed: There is no game object with name "${name}" !`);
            return undefined;
        }

        return this.gameObjects[name];
    }

    removeGameObject(name: string) {
        if(!this.gameObjects[name]) {
            console.warn(`Remove game object failed: There is no game object with name "${name}" !`);
            return false;
        }

        delete this.gameObjects[name];

        return true;
    }

    public async loopScene(time = 0) {
        this.time       = time;
        this.deltaTime  = this.time - this.lastTime;
        this.lastTime   = this.time;

        await this.onUpdate();
        this.onBeforeRender();
        this.onRender();
        this.onAfterRender();
    }
    
}