import ComponentBase from "./ComponentBase";
import { SDictionaryOf } from "../Genesis/Dictionary";
import Scene from "../Genesis/Scene";

export default class GameObjectBase {

    /**
     * Dictionary of all components that 
     * be owned by this the current gameobject.
     */
    public components: SDictionaryOf<ComponentBase> = {};

    constructor() { }

    public onInit(scene: Scene) {
        for(const componentKey in this.components)
            this.components[componentKey].onInit(scene, this);
    }

    public onUpdate(scene: Scene) {
        for(const componentKey in this.components)
            this.components[componentKey].onUpdate(scene, this);
    }

    public onBeforeRender(scene: Scene) {
        for(const componentKey in this.components)
            this.components[componentKey].onBeforeRender(scene, this);
    }

    public onRender(scene: Scene) {
        for(const componentKey in this.components)
            this.components[componentKey].onRender(scene, this);
    }

    public onAfterRender(scene: Scene) {
        for(const componentKey in this.components)
            this.components[componentKey].onAfterRender(scene, this);
    }

    public onDestroy(scene: Scene) {
        for(const componentKey in this.components)
            this.components[componentKey].onDestroy(scene, this);
    }

    /**
     * Retrieve a component.
     * 
     * @param component The component type to retrieve. 
     * @returns The component.
     */
    public getComponent<T extends ComponentBase>(component: new (...args: any[]) => T) {
        const name = component.name;
        const comp = this.components[name] ? this.components[name] : undefined;
        return comp as (T | undefined);
    }

    /**
     * Add a component to the gameobject.
     * 
     * @param component The component to add.
     * @returns `true` if the component was added successfuly otherwise `false`.
     */
    public addComponent<T extends ComponentBase>(component: T) {
        const name = component.constructor.name;

        if(this.components[name]) {
            console.warn(`Can't add component ${name} beacause it already exist! Please use setComponent(...)`);
            return false;
        }

        this.components[name] = component;
        return false;
    }
    	
    /**
     * Replace a component by another component
     * that have the same type.
     * 
     * @param component The new component.
     * @returns `true` if the component was set successfuly otherwise `false`.
     */
    public setComponent<T extends ComponentBase>(component: T) {
        const name = component.constructor.name;

        if(!this.components[name]) {
            console.warn(`Can't set component ${name} : You must add component first!`);
            return false;
        }

        this.components[name] = component;
        return true;
    }

    /**
     * Remove a component.
     * 
     * @param component The component type to be removed.
     * @returns `true` if the component was removed successfuly otherwise `false`.
     */
    public removeComponent<T extends ComponentBase>(component: new (...args: any[]) => T) {
        const name = component.name;

        if(!this.components[name]) {
            console.warn(`Can't remove component ${name} : The component don't exist!`);
            return false;
        }

        delete this.components[name];
        return true;
    }

    /**
     * Check if this gameobject contain a component.
     * 
     * @param component The component type.
     * @returns `true` if the component exist otherwise `false`.
     */
    public haveComponent<T extends ComponentBase>(component: new (...args: any[]) => T) {
        if(this.components[component.name])
            return true;
        else
            return false;
    }

}