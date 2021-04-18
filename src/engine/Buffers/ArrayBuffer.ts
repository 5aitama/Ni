import Buffer, {
    BufferUsage,
    BufferTarget,
    BufferAttribute,
} from "../Core/Genesis/Buffer";

import { SDictionaryOf } from "../Core/Genesis/Dictionary";

import Number2 from "../Core/Math/components/Number2";
import Number3 from "../Core/Math/components/Number3";
import Number4 from "../Core/Math/components/Number4";

/**
 * Index buffer.
 */
export default class ArrayBuffer extends Buffer {

    /**
     * Create new index buffer.
     * @param indices The indices.
     * @param isDynamic Must be `true` if the buffer will be modified repeatedly and used many times.
     */
    constructor(attributes: SDictionaryOf<{data: Number2[] | Number3[] | Number4[], normalize: boolean}>, isDynamic: boolean, target: BufferTarget) {

        const _attributes : SDictionaryOf<BufferAttribute> = {};

        for(const key in attributes) {

            if(attributes[key].data.length === 0) continue;
            
            const data: number[] = [];

            for(const arr of attributes[key].data)
                data.push(...arr.flat());
            
            _attributes[key] = new BufferAttribute(data, attributes[key].data[0].type(), attributes[key].data[0].size(), attributes[key].normalize);
        }

        super(_attributes, target, isDynamic ? BufferUsage.dynamic : BufferUsage.static);
    }
}