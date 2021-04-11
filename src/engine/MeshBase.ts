import Buffer from "./Core/Buffer";

export default class MeshBase {
    
    /**
     * Dictionary that contains
     * mesh buffers.
     */
    buffers: {[key: string]: Buffer} = {};

    constructor() {
        
    }

    /**
     * Add a buffer.
     * 
     * @param name The name of the buffer.
     * @param buffer The buffer.
     */
    public addBuffer(name: string, buffer: Buffer) {
        if(this.buffers[name])
            throw new Error(`Cannot add buffer: A buffer with name ${name} already exist!`);

        this.buffers[name] = buffer;
    }

    /**
     * Replace an existing buffer. If the buffer
     * don't exist it add it.
     * 
     * @param name The name of the buffer to replace.
     * @param buffer The buffer.
     */
    public replaceBuffer(name: string, buffer: Buffer) {
        this.buffers[name] = buffer;
    }

    /**
     * Remove a buffer.
     * 
     * @param name The name of the buffer to remove
     */
    public removeBuffer(name: string) {
        if(!this.buffers[name]) {
            console.warn(`Cannot remove buffer: A buffer with name ${name} don't exist!`);
            return;
        }

        delete this.buffers[name];
    }

    /**
     * Remove a buffer without
     * checking the buffer name.
     * 
     * @param name The name of the buffer to remove.
     */
    public removeBufferUnsafe(name: string) {
        delete this.buffers[name];
    }

    /**
     * Update the buffer attributes.
     * 
     * @param name The name of the buffer to update.
     * @param attributes New attributes.
     */
    public updateBufferAttributes(name: string, attributes: {[name: string]: number[]}) {
        if(!this.buffers[name]) {
            console.warn(`Cannot update buffer: A buffer with name ${name} don't exist!`);
            return;
        }

        for(const k in attributes) {
            if(!this.buffers[name].attributes[k]) {
                console.warn(`Cannot update buffer attributes: A buffer attribute with name ${k} don't exist!`);
                continue;
            }

            this.buffers[name].attributes[k].data = attributes[k];
        }
    }

    /**
     * Update the buffer attributes without
     * checking the buffer name and the
     * attributes name.
     * 
     * @param name The name of the buffer to update.
     * @param attributes New attributes.
     */
    public updateBufferAttributesUnsafe(name: string, attributes: {[name: string]: number[]}) {
        for(const k in attributes)
            this.buffers[name].attributes[k].data = attributes[k];
    }

    /**
     * Update buffer attribute data.
     * 
     * @param buffer The name of buffer.
     * @param attribute The name of attribute.
     * @param data The new data of the attribute.
     */
    public updateBufferAttributeData(buffer: string, attribute: string, data: number[]) {
        if(!this.buffers[buffer]) {
            console.warn(`Cannot update buffer attribute: A buffer with name ${buffer} don't exist!`);
            return;
        }

        if(!this.buffers[buffer].attributes[attribute]) {
            console.warn(`Cannot update buffer attribute: A buffer attribute with name ${attribute} don't exist!`);
            return;
        }

        this.updateBufferAttributeDataUnsafe(buffer, attribute, data);
    }

    /**
     * Update buffer attribute data without
     * checking the buffer name and the
     * attribute name.
     * 
     * @param buffer The name of buffer.
     * @param attribute The name of the attribute.
     * @param data The new attribute data.
     */
    public updateBufferAttributeDataUnsafe(buffer: string, attribute: string, data: number[]) {
        this.buffers[buffer].attributes[attribute].data = data;
    }

    /**
     * Get a buffer.
     * 
     * @param name The name of the buffer to get.
     * @returns The buffer.
     */
    public getBuffer(name: string) {
        if(!this.buffers[name]) {
            console.warn(`Cannot get buffer: A buffer with name ${name} don't exist!`);
            return;
        }

        return this.buffers[name];
    }
}