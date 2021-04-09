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
export enum BufferDataType {
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

export enum BufferAttributeAmount {
    one     = 1,
    two     = 2,
    three   = 3,
    four    = 4,
}

// /**
//  * Buffer data structure.
//  */
// type BufferData = {
//     /** The data of the buffer. */
//     data: number[],
    
//     /** Buffer data type */
//     type: BufferDataType,

//     /** The amount of attributes pers vertex. */
//     size: BufferAttributeAmount,

//     /** If the data must be normalized (`true`) or not (`false`) */
//     normalized: boolean,
// }

export class BufferData {
    data: number[];
    type: BufferDataType;
    size: BufferAttributeAmount;
    normalized: boolean;

    constructor(data: number[], type: BufferDataType, size: BufferAttributeAmount, normalized: boolean) {
        this.data = data;
        this.type = type;
        this.size = size;
        this.normalized = normalized;
    }
}

export default class Buffer {

    public  data       : { [name: string]: BufferData };
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
    constructor(data: { [name: string]: BufferData }, target: BufferTarget, usage: BufferUsage) {
        this.data       = data;
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
    static sizeOfDataType(dataType: BufferDataType) {
        switch(dataType) {
            case BufferDataType.byte   : return BufferDataTypeSize.byte;
            case BufferDataType.short  : return BufferDataTypeSize.short;
            case BufferDataType.ubyte  : return BufferDataTypeSize.ubyte;
            case BufferDataType.ushort : return BufferDataTypeSize.ushort;
            case BufferDataType.float  : return BufferDataTypeSize.float;
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

        for(const key in buffer.data)
            stride += this.sizeOfDataType(buffer.data[key].type) * buffer.data[key].size;

        return stride;
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
            for(const key in buffer.data)
                bufferSize += buffer.data[key].data.length * this.sizeOfDataType(buffer.data[key].type);
            
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
        for(const key in buffer.data)
            stride += this.sizeOfDataType(buffer.data[key].type) * buffer.data[key].size;

        for(const key in buffer.data) {
            let bufferdata : BufferSource | undefined;

            // Create an array according to the buffer data type.
            switch(buffer.data[key].type) {
                case BufferDataType.byte   : bufferdata = new Int8Array    (buffer.data[key].data); break;
                case BufferDataType.float  : bufferdata = new Float32Array (buffer.data[key].data); break;
                case BufferDataType.short  : bufferdata = new Int16Array   (buffer.data[key].data); break;
                case BufferDataType.ubyte  : bufferdata = new Uint8Array   (buffer.data[key].data); break;
                case BufferDataType.ushort : bufferdata = new Uint16Array  (buffer.data[key].data); break;
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
                    gl.vertexAttribPointer(location, buffer.data[key].size, buffer.data[key].type, buffer.data[key].normalized, stride, vaOffset);
                    
                    // Don't forget to enable the vertex array.
                    gl.enableVertexAttribArray(location);

                }
            } else {
                throw new Error(`Failed to update buffer "${key}"`);
            }
            
            // Get the size (in byte) of the data type
            const dataTypeSize = this.sizeOfDataType(buffer.data[key].type);

            offset   += buffer.data[key].data.length * dataTypeSize;
            vaOffset += buffer.data[key].size * this.sizeOfDataType(buffer.data[key].type);
        }
    }
}