import ComponentBase from "./Core/ComponentBase";
import { SDictionaryOf } from "./Core/Dictionary";

export default class GameObjectBase {

    /**
     * Dictionary of all components that 
     * be owned by this the current gameobject.
     */
    public components: SDictionaryOf<ComponentBase> = {};

    constructor() { /* ... */ }

    /**
     * Retrieve a specific component.
     * 
     * @param component The component type to retrieve. 
     * @returns The component.
     */
    getComponent<T extends ComponentBase>(component: new (...args: any[]) => T) {
        const name = component.name;
        const comp = this.components[name] ? this.components[name] : undefined;
        return comp as (T | undefined);
    }

    addComponent<T extends ComponentBase>(component: T) {
        // if(!this.components[component.name]);
    }

}