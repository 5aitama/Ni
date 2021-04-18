import Buffer, {
    BufferAttribute,
    BufferAttributeSize,
    BufferAttributeDataType,
} from "../Core/Genesis/Buffer";

import Number2      from "../Core/Math/components/Number2";
import VertexBuffer from "./VertexBuffer";

/**
 * Vertex 2D Buffer.
 */
export default class Vertex2DBuffer extends VertexBuffer {

    /**
     * Create new vertex 2D buffer.
     * @param data The vertices.
     * @param isDynamic Must be `true` if the buffer will be modified repeatedly and used many times.
     */
    constructor(data: Number2[], isDynamic: boolean) {
        super({ vertex: new BufferAttribute(Buffer.flat2(data), BufferAttributeDataType.float, BufferAttributeSize.two, false) }, isDynamic);
    }

}