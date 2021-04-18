import { BufferAttributeDataType, BufferAttributeSize } from "../../Genesis/Buffer";
import IComponent from "./IComponent";

export default interface IVector<T extends IComponent> {

    size(): BufferAttributeSize;

    type(): BufferAttributeDataType;

    /**
     * Adding the vector by vector `vec`.
     * @param vec Additif vector.
     */
    add(vec: T) : T;

    /**
     * Substract the vector by vector `vec`.
     * @param vec Substractif vector.
     */
    sub(vec: T) : T;

    /**
     * Multiply the vector by vector `vec`.
     * @param vec Multiplicative vector..
     */
    mul(vec: T) : T;

    /**
     * Divide the vector by vector `vec`.
     * @param vec Divisive vector.
     */
    div(vec: T) : T;

    /**
     * Dot product.
     * @param vec dot vector.
     */
    dot(vec: T) : number;

    /**
     * Copy the current vector.
     */
    copy() : T;
}