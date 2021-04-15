import GameObjectBase from "../GameObjectBase";
import Scene from "./Scene";

export default class ComponentBase {

    /**
     * Called when a component need to initialize.
     * @param scene The scene.
     * @param gameObject The gameobject that own this component.
     */
    onInit(scene: Scene, gameObject: GameObjectBase) 
    { /* ... */ };

    /**
     * Called each frame before the entire scene rendering step.
     * @param scene The scene.
     * @param gameObject The gameobject that own this component.
     */
    onUpdate(scene: Scene, gameObject: GameObjectBase) 
    { /* ... */ };

    /**
     * Called each frame before the scene rendering.
     * @param scene The scene.
     * @param gameObject The gameobject that own this component.
     */
    onBeforeRender(scene: Scene, gameObject: GameObjectBase) 
    { /* ... */ };

    /**
     * Called each frame when the scene is rendering.
     * @param scene The scene.
     * @param gameObject The gameobject that own this component.
     */
    onRender(scene: Scene, gameObject: GameObjectBase) 
    { /* ... */ };

    /**
     * Called each frame after the scene rendering.
     * @param scene The scene.
     * @param gameObject The gameobject that own this component.
     */
    onAfterRender(scene: Scene, gameObject: GameObjectBase) 
    { /* ... */ };
}