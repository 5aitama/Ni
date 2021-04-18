import { BufferAttributeDataType } from "../../Genesis/Buffer";
import Number4 from "./Number4";

/**
 * Represent 4 signed 8-bit integer (`Int8`), with values in [-128, 127].
 */
 export class byte4 extends Number4 {
     type(): BufferAttributeDataType { return BufferAttributeDataType.byte }
 }

 /**
  * Represent 4 unsigned 8-bit integer (`UInt8`), with values in [0, 255]
  */
 export class ubyte4 extends Number4 {
     type(): BufferAttributeDataType { return BufferAttributeDataType.ubyte }
 }
 
 /**
  * Represent 4 signed 16-bit integer (`Int16`), with values in [-32768, 32767]
  */
 export class short4 extends Number4 {
     type(): BufferAttributeDataType { return BufferAttributeDataType.short }
 }
 
 /**
  * Represent 4 unsigned 16-bit integer (`UInt16`), with values in [0, 65535]
  */
 export class ushort4 extends Number4 {
     type(): BufferAttributeDataType { return BufferAttributeDataType.ushort }
 }
 
 /**
  * Represent 4 32-bit IEEE floating point number (`Float`)
  */
  export class float4 extends Number4 {
      type(): BufferAttributeDataType { return BufferAttributeDataType.float }
  }
 