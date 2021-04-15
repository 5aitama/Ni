import IMathComponent from "../Math/IMathComponent";
import Number2 from "../Math/Number2";
import Number3 from "../Math/Number3";
import Shader from "./Shader";

/**
 * The size of each buffer data type
 * in byte.
 */
export enum BufferDataTypeSize {
    /** 8-bit */
    byte = 1,

    /** 16-bit */
    short = 2,

    /** 8-bit */
    ubyte = 1,

    /** 16-bit */

    ushort = 2,

    /** 32-bit */
    float = 4,
}

/**
 * Types that can be stored in a buffer.
 */
export enum BufferAttributeDataType {
    /** signed 8-bit integer, with values in [-128, 127] */
    byte   = WebGLRenderingContext['BYTE'],

    /** signed 16-bit integer, with values in [-32768, 32767] */
    short  = WebGLRenderingContext['SHORT'],

    /** unsigned 8-bit integer, with values in [0, 255] */
    ubyte  = WebGLRenderingContext['UNSIGNED_BYTE'],

    /** unsigned 16-bit integer, with values in [0, 65535] */
    ushort = WebGLRenderingContext['UNSIGNED_SHORT'],

    /** 32-bit IEEE floating point number */
    float  = WebGLRenderingContext['FLOAT'],
}

export enum BufferTarget {
    array   = WebGLRenderingContext['ARRAY_BUFFER'],
    element = WebGLRenderingContext['ELEMENT_ARRAY_BUFFER'],
}

export enum BufferUsage {
    static  = WebGLRenderingContext['STATIC_DRAW'],
    dynamic = WebGLRenderingContext['DYNAMIC_DRAW'],
}

export enum BufferAttributeSize {
    one     = 1,
    two     = 2,
    three   = 3,
    four    = 4,
}

export class BufferAttribute {
    data: number[];
    type: BufferAttributeDataType;
    size: BufferAttributeSize;
    normalized: boolean;

    constructor(data: number[], type: BufferAttributeDataType, size: BufferAttributeSize, normalized: boolean) {
        this.data = data;
        this.type = type;
        this.size = size;
        this.normalized = normalized;
    }

    public static readonly VertexAttributeName   = "vertices";
    public static readonly IndexAttributeName    = "indices";
}

export default class Buffer {

    public  attributes : { [name: string]: BufferAttribute };
    private target     : BufferTarget;
    private usage      : BufferUsage;
    private rawBuffer? : WebGLBuffer;
    private needUpdate : boolean;

    /**
     * Create new buffer.
     * 
     * @param data Buffer data.
     * @param target Buffer target.
     * @param usage Buffer usage.
     */
    constructor(attributes: { [name: string]: BufferAttribute }, target: BufferTarget, usage: BufferUsage) {
        this.attributes = attributes;
        this.target     = target;
        this.usage      = usage;
        this.needUpdate = false;
    }

    /**
     * Indicates that modifications have 
     * been made to the buffer.
     */
    markAsUpdate() {
        this.needUpdate = true;
    }

    /**
     * Get the size of a buffer data type.
     * @param dataType The buffer data type.
     * @returns The size (in byte) of specified data type.
     */
    static sizeOfDataType(dataType: BufferAttributeDataType) {
        switch(dataType) {
            case BufferAttributeDataType.byte   : return BufferDataTypeSize.byte;
            case BufferAttributeDataType.short  : return BufferDataTypeSize.short;
            case BufferAttributeDataType.ubyte  : return BufferDataTypeSize.ubyte;
            case BufferAttributeDataType.ushort : return BufferDataTypeSize.ushort;
            case BufferAttributeDataType.float  : return BufferDataTypeSize.float;
            default: throw new Error(`Missing size for data type "${dataType}"`);
        }
    }

    /**
     * Calculate the stride value of a specified buffer.
     * @param buffer The buffer.
     * @returns The stride of the buffer.
     */
     static strideOf<T extends Buffer>(buffer: T) {
        let stride = 0;

        for(const key in buffer.attributes)
            stride += this.sizeOfDataType(buffer.attributes[key].type) * buffer.attributes[key].size;

        return stride;
    }

    /**
     * Flat an array of object that implement `IMathComponent`.
     * 
     * @param data The array of element to be flatten.
     * @returns The flatten array.
     */
     public static flat<T extends IMathComponent>(vectors: T[]) {
        const array: number[] = [];

        for(const vector of vectors)
            array.push(...vector.rawData());

        return array;
    }

    /**
     * Bind a buffer.
     * @param gl The context.
     */
    static bindBuffer(gl: WebGLRenderingContext, buffer: Buffer) {
        if(buffer.rawBuffer == null)
            throw new Error("Can't bind buffer: The buffer was not initialized !");
        
        gl.bindBuffer(buffer.target, buffer.rawBuffer);
    }

    /**
     * Update a buffer. If the buffer was not initialized
     * it send data to it otherwise it update the data.
     * @param gl The context.
     * @param buffer The buffer to be updated
     */
    static updateBuffer(gl: WebGLRenderingContext, buffer: Buffer, shader: Shader) {
        if(!shader.isCompiled)
            throw "Can't update buffer: Shader must be compiled!";

        // Init the buffer if it was not initialized.
        if(buffer.rawBuffer == null) {
            const buff = gl.createBuffer();

            if(buff == null)
                throw new Error("Failed to create buffer !");

            buffer.rawBuffer = buff;
            
            let bufferSize = 0;

            // Get the size of the buffer.
            for(const key in buffer.attributes)
                bufferSize += buffer.attributes[key].data.length * this.sizeOfDataType(buffer.attributes[key].type);
            
            this.bindBuffer(gl, buffer);
            gl.bufferData(buffer.target, bufferSize, buffer.usage);
            
            buffer.needUpdate = true;
        }

        // Check if buffer need update.
        if(!buffer.needUpdate)
            return;

        buffer.needUpdate = false;

        /** Buffer subdata offset. */
        let offset      = 0;

        /** Vertex attrib ptr stride. */
        let stride      = 0;

        /** Vertex attrib ptr offset. */
        let vaOffset    = 0;

        this.bindBuffer(gl, buffer);

        // Get the stride of the buffer...
        for(const key in buffer.attributes)
            stride += this.sizeOfDataType(buffer.attributes[key].type) * buffer.attributes[key].size;

        for(const key in buffer.attributes) {
            let bufferdata : BufferSource | undefined;

            // Create an array according to the buffer data type.
            switch(buffer.attributes[key].type) {
                case BufferAttributeDataType.byte   : bufferdata = new Int8Array    (buffer.attributes[key].data); break;
                case BufferAttributeDataType.float  : bufferdata = new Float32Array (buffer.attributes[key].data); break;
                case BufferAttributeDataType.short  : bufferdata = new Int16Array   (buffer.attributes[key].data); break;
                case BufferAttributeDataType.ubyte  : bufferdata = new Uint8Array   (buffer.attributes[key].data); break;
                case BufferAttributeDataType.ushort : bufferdata = new Uint16Array  (buffer.attributes[key].data); break;
            }
            
            if(bufferdata) {
                // Update the buffer with the data.
                gl.bufferSubData(buffer.target, offset, bufferdata);

                // This step is only for ARRAY buffer.
                if(buffer.target == BufferTarget.array) {

                    // Get the location of the attribute in the shader...
                    // The location name is the key of the buffer dictionary.
                    const location = gl.getAttribLocation(shader.program!, key);

                    // Describe the vertex attribute data layout...
                    gl.vertexAttribPointer(location, buffer.attributes[key].size, buffer.attributes[key].type, buffer.attributes[key].normalized, stride, vaOffset);
                    
                    // Don't forget to enable the vertex array.
                    gl.enableVertexAttribArray(location);

                }
            } else {
                throw new Error(`Failed to update buffer "${key}"`);
            }
            
            // Get the size (in byte) of the data type
            const dataTypeSize = this.sizeOfDataType(buffer.attributes[key].type);

            offset   += buffer.attributes[key].data.length * dataTypeSize;
            vaOffset += buffer.attributes[key].size * this.sizeOfDataType(buffer.attributes[key].type);
        }
    }
}