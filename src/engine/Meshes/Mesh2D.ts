import Buffer, { 
    BufferTarget,
    BufferAttribute,
} from "../Core/Genesis/Buffer";

import MeshBase     from "./MeshBase";
import ArrayBuffer  from "../Buffers/ArrayBuffer";
import Number2      from "../Core/Math/components/Number2";
import Number3      from "../Core/Math/components/Number3";

export default class Mesh2D extends MeshBase {

    private vertices : Number2[] = [];
    private indices  : Number3[] = [];

    constructor(vertices: Number2[], indices: Number3[], isDynamic = false) {
        super();

        this.vertices = vertices;
        this.indices  = indices;

        this.addBuffer('vertex_buffer', new ArrayBuffer({ 
            vertex: { data: vertices, normalize: false }
        }, isDynamic, BufferTarget.array));

        this.addBuffer('index_buffer',  new ArrayBuffer(
            { indices: { data: indices, normalize: false }
        }, isDynamic, BufferTarget.element));
    }

    public setVertices(vertices: Number2[]) {
        this.vertices = vertices;
        this.updateBufferAttributeDataUnsafe('vertex_buffer', BufferAttribute.VertexAttributeName, Buffer.flat2(vertices));
    }

    public getVertices() {
        return this.vertices;
    }

    public setIndices(indices: Number3[]) {
        this.indices = indices;
        this.updateBufferAttributeDataUnsafe('index_buffer', BufferAttribute.IndexAttributeName, Buffer.flat2(indices));
    }

    public getIndices() {
        return this.indices;
    }
}