import { BufferAttributeDataType, BufferAttributeSize } from "../../Genesis/Buffer";
import IComponent from "./IComponent";
import IVector from "./IVector";

export default class Number2 implements IVector<Number2>, IComponent {

    /** The x vector component. */
    x: number = 0;

    /** The y vector component. */
    y: number = 0;

    constructor(x: number = 0, y?: number) {
        this.x = x;
        this.y = (y === undefined ? this.x : y);
    }
    
    size(): BufferAttributeSize { return BufferAttributeSize.two }

    type(): BufferAttributeDataType { return BufferAttributeDataType.byte }

    dot(vec: Number2): number {
        return (this.x * vec.x) + (this.y * vec.y);
    }

    copy(): Number2 {
        return new Number2(this.x, this.y);
    }

    add(vec: Number2): Number2 {
        this.x += vec.x;
        this.y += vec.y;

        return this;
    }

    sub(vec: Number2): Number2 {
        this.x -= vec.x;
        this.y -= vec.y;

        return this;
    }

    mul(vec: Number2): Number2 {
        this.x *= vec.x;
        this.y *= vec.y;

        return this;
    }

    div(vec: Number2): Number2 {
        this.x /= vec.x;
        this.y /= vec.y;

        return this;
    }

    flat() { return [this.x, this.y] }
}