import Buffer, {
    BufferUsage,
    BufferTarget,
    BufferAttribute,
    BufferAttributeSize,
    BufferAttributeDataType,
} from "./Core/Buffer";

import Number2 from "./Math/Number2";
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
        super({ vertices: new BufferAttribute(Buffer.flat(data), BufferAttributeDataType.short, BufferAttributeSize.two, false) }, isDynamic);
    }

}