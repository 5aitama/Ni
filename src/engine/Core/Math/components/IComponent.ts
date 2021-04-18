import { BufferAttributeDataType, BufferAttributeSize } from "../../Genesis/Buffer";

export default interface IComponent {
    
    /**
     * Return the flatten version of a vector (is just
     * the vector components (x, y...) packed in a array). 
     */
    flat() : number[];
}