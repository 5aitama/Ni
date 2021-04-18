import { BufferAttributeDataType, BufferAttributeSize } from "../../Genesis/Buffer";
import IComponent from "./IComponent";
import IVector from "./IVector";

export default class Number3 implements IComponent, IVector<Number3> {

    /** The x vector component. */
    x: number = 0;

    /** The y vector component. */
    y: number = 0;

    /** The z vector component. */
    z: number = 0;

    constructor(x: number = 0, y?: number, z?: number) {
        this.x = x;
        this.y = (y === undefined ? this.x : y);
        this.z = (z === undefined ? this.y : z);
    }
    
    size(): BufferAttributeSize { return BufferAttributeSize.three }

    type(): BufferAttributeDataType { return BufferAttributeDataType.byte }

    dot(vec: Number3): number {
        return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    }

    copy(): Number3 {
        return new Number3(this.x, this.y, this.z);
    }

    add(vec: Number3): Number3 {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;

        return this;
    }

    sub(vec: Number3): Number3 {
        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z;

        return this;
    }

    mul(vec: Number3): Number3 {
        this.x *= vec.x;
        this.y *= vec.y;
        this.z *= vec.z;

        return this;
    }

    div(vec: Number3): Number3 {
        this.x /= vec.x;
        this.y /= vec.y;
        this.z /= vec.z;

        return this;
    }

    flat() { return [this.x, this.y, this.z] }
}