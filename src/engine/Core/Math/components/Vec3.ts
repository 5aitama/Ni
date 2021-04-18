import { BufferAttributeDataType } from "../../Genesis/Buffer";
import Number3 from "./Number3";

/**
 * Represent 3 signed 8-bit integer (`Int8`), with values in [-128, 127].
 */
 export class byte3 extends Number3 {
     type(): BufferAttributeDataType { return BufferAttributeDataType.byte }
 }

 /**
  * Represent 3 unsigned 8-bit integer (`UInt8`), with values in [0, 255]
  */
 export class ubyte3 extends Number3 {
     type(): BufferAttributeDataType { return BufferAttributeDataType.ubyte }
 }
 
 /**
  * Represent 3 signed 16-bit integer (`Int16`), with values in [-32768, 32767]
  */
 export class short3 extends Number3 {
     type(): BufferAttributeDataType { return BufferAttributeDataType.short }
 }
 
 /**
  * Represent 3 unsigned 16-bit integer (`UInt16`), with values in [0, 65535]
  */
 export class ushort3 extends Number3 {
     type(): BufferAttributeDataType { return BufferAttributeDataType.ushort }
 }
 
 /**
  * Represent 3 32-bit IEEE floating point number (`Float`)
  */
  export class float3 extends Number3 {
      type(): BufferAttributeDataType { return BufferAttributeDataType.float }
  }
 