import Material from "./Core/Material";
import Number2      from "./Math/Number2";
import Mesh2D       from "./Mesh2D";
import Transform2D  from "./Transform2D";

export default class GameObject2D {
    
    transform: Transform2D;
    mesh: Mesh2D;
    material: Material;

    constructor(position: Number2, rotation: number, scale: Number2, mesh: Mesh2D) {
        this.transform = new Transform2D(position, rotation, scale);
        this.mesh = mesh;
        this.ma
    }
}