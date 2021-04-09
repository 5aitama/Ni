import Buffer, { 
    BufferAttributeAmount, 
    BufferDataType, 
    BufferTarget, 
    BufferUsage,
    BufferData
} from "./Core/Buffer";

import Number2 from "./Math/Number2";

/**
 * Vertex 2D Buffer.
 */
export default class Vertex2DBuffer extends Buffer {

    /**
     * Create new vertex 2D buffer.
     * @param data The vertices.
     * @param isDynamic Must be `true` if the buffer will be modified repeatedly and used many times.
     */
    constructor(data: Number2[], isDynamic: boolean) {
        const array = [];

        for(const n of data)
            array.push(n.x, n.y);
        
        super({ indices: new BufferData(array, BufferDataType.short, BufferAttributeAmount.two, false) },
            BufferTarget.element, isDynamic ? BufferUsage.dynamic : BufferUsage.static
        );
    }

}