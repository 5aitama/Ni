import Mesh2D           from "../Meshes/Mesh2D";
import Number2          from "../Core/Math/Number2";
import Material         from "../Core/Genesis/Material";
import Transform2D      from "../Components/Transform2D";
import GameObjectBase   from "../Core/Base/GameObjectBase";

export default class GameObject2D extends GameObjectBase {

    /**
     * Create new gameObject.
     * @param position The position of the gameObject.
     * @param rotation The rotation of the gameObject.
     * @param scale The scale of the gameObject.
     * @param mesh The mesh of the gameObject.
     * @param material The material of the gameObject.
     */
    constructor(position: Number2, rotation: number, scale: Number2, mesh: Mesh2D, material: Material) {
        super();

        // Add transforms component...
        this.addComponent(new Transform2D(position, rotation, scale));
        
        // Add mesh component...
        this.addComponent(mesh);

        // Add material component...
        this.addComponent(material);
    }
}