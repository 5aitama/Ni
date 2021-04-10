import Buffer, {
    BufferUsage,
    BufferTarget,
    BufferAttribute,
    BufferAttributeSize,
    BufferAttributeDataType,
} from "./Core/Buffer";

/**
 * Index buffer.
 */
export default class IndexBuffer extends Buffer {

    /**
     * Create new index buffer.
     * @param indices The indices.
     * @param isDynamic Must be `true` if the buffer will be modified repeatedly and used many times.
     */
    constructor(indices: number[], isDynamic = false) {
        super({ indices: new BufferAttribute(indices, BufferAttributeDataType.ubyte, BufferAttributeSize.one, false) },
            BufferTarget.element, isDynamic ? BufferUsage.dynamic : BufferUsage.static
        );
    }
}