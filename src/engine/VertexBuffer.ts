import Buffer, { 
    BufferAttribute,
    BufferTarget,
    BufferUsage,
} from "./Core/Buffer";

export default class VertexBuffer extends Buffer {

    constructor(attributes: {[name: string]: BufferAttribute }, isDynamic: boolean = false) {
        super(attributes, BufferTarget.array, isDynamic ? BufferUsage.dynamic : BufferUsage.static);
    }

}