import Buffer from "./Core/Buffer";

export default class MeshBase {
    /**
     * Buffer that contains vertex data.
     */
    vertexBuffer: Buffer;

    /**
     * Buffer that contains index data.
     */
    indexBuffer: Buffer;

    constructor(vertexBuffer: Buffer, indexBuffer: Buffer) {
        this.vertexBuffer   = vertexBuffer;
        this.indexBuffer    = indexBuffer;
    }
}