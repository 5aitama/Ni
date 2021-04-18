import { BufferAttributeDataType, BufferAttributeSize } from "../../Genesis/Buffer";
import IComponent from "./IComponent";
import IVector from "./IVector";

export default class Number4 implements IComponent, IVector<Number4> {
    
    /** The x vector component. */
    x: number = 0;

    /** The y vector component. */
    y: number = 0;

    /** The z vector component. */
    z: number = 0;
    
    /** The w vector component. */
    w: number = 0;

    constructor(x: number = 0, y?: number, z?: number, w?: number) {
        this.x = x;
        this.y = (y === undefined ? this.x : y);
        this.z = (z === undefined ? this.y : z);
        this.w = (w === undefined ? this.z : w);
    }

    size(): BufferAttributeSize { return BufferAttributeSize.four }

    type(): BufferAttributeDataType { return BufferAttributeDataType.byte }

    dot(vec: Number4): number {
        return this.x * vec.x + this.y * vec.y + this.z * vec.z + this.w * vec.w;
    }

    copy(): Number4 {
        return new Number4(this.x, this.y, this.z, this.w);
    }

    add(vec: Number4): Number4 {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
        this.w += vec.w;

        return this;
    }

    sub(vec: Number4): Number4 {
        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z;
        this.w -= vec.w;

        return this;
    }

    mul(vec: Number4): Number4 {
        this.x *= vec.x;
        this.y *= vec.y;
        this.z *= vec.z;
        this.w *= vec.w;

        return this;
    }

    div(vec: Number4): Number4 {
        this.x /= vec.x;
        this.y /= vec.y;
        this.z /= vec.z;
        this.w /= vec.w;

        return this;
    }

    flat() { return [this.x, this.y, this.z, this.w] }
}