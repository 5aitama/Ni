import Buffer, { BufferAttribute } from "../Core/Genesis/Buffer";
import IndexBuffer from "../Buffers/IndexBuffer";
import Number2 from "../Core/Math/Number2";
import Number3 from "../Core/Math/Number3";
import MeshBase from "./MeshBase";
import Vertex2DBuffer from "../Buffers/Vertex2DBuffer";

export default class Mesh2D extends MeshBase {

    private vertices : Number2[] = [];
    private indices : Number3[] = [];

    constructor(vertices: Number2[], indices: Number3[], isDynamic = false) {
        super();

        this.vertices   = vertices;
        this.indices    = indices;

        this.addBuffer('vertex_buffer', new Vertex2DBuffer(vertices, isDynamic));
        this.addBuffer('index_buffer',  new IndexBuffer(Buffer.flat(indices), isDynamic));
    }

    public setVertices(vertices: Number2[]) {
        this.vertices = vertices;
        this.updateBufferAttributeDataUnsafe('vertex_buffer', BufferAttribute.VertexAttributeName, Buffer.flat(vertices));
    }

    public getVertices() {
        return this.vertices;
    }

    public setIndices(indices: Number3[]) {
        this.indices = indices;
        this.updateBufferAttributeDataUnsafe('index_buffer', BufferAttribute.IndexAttributeName, Buffer.flat(indices));
    }

    public getIndices() {
        return this.indices;
    }
}