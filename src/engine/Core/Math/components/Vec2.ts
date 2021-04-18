import { BufferAttributeDataType } from "../../Genesis/Buffer";
import Number2 from "./Number2";

/**
 * Represent 2 signed 8-bit integer (`Int8`), with values in [-128, 127].
 */
export class byte2 extends Number2 {
    type(): BufferAttributeDataType { return BufferAttributeDataType.byte }
}

 /**
  * Represent 2 unsigned 8-bit integer (`UInt8`), with values in [0, 255]
  */
export class ubyte2 extends Number2 {
    type(): BufferAttributeDataType { return BufferAttributeDataType.ubyte }
}
 
 /**
  * Represent 2 signed 16-bit integer (`Int16`), with values in [-32768, 32767]
  */
export class short2 extends Number2 {
    type(): BufferAttributeDataType { return BufferAttributeDataType.short }
}
 
 /**
  * Represent 2 unsigned 16-bit integer (`UInt16`), with values in [0, 65535]
  */
export class ushort2 extends Number2 {
    type(): BufferAttributeDataType { return BufferAttributeDataType.ushort }
}
 
 /**
  * Represent 2 32-bit IEEE floating point number (`Float`)
  */
export class float2 extends Number2 { 
    type(): BufferAttributeDataType { return BufferAttributeDataType.float }
}
 