import Buffer, { BufferAttributeAmount, BufferData, BufferDataType, BufferTarget, BufferUsage } from "./Core/Buffer";

/**
 * Index buffer.
 */
export default class IndexBuffer extends Buffer {

    /**
     * Create new index buffer.
     * @param indices The indices.
     * @param isDynamic If the buffer will be modified repeatedly and used many times.
     */
    constructor(indices: number[], isDynamic = false) {
        super({ indices: new BufferData(indices, BufferDataType.byte, BufferAttributeAmount.one, false) },
            BufferTarget.element, isDynamic ? BufferUsage.dynamic : BufferUsage.static
        );
    }
}