import GameObjectBase from "../Base/GameObjectBase";
import ComponentBase from "../Base/ComponentBase";
import Scene from "./Scene";
import Shader from "./Shader";
import { SDictionaryOf } from "./Dictionary";

export enum UniformType {
    Float,
    Float2,
    Float3,
    Float4,

    FloatArray,
    Float2Array,
    Float3Array,
    Float4Array,

    Int,
    Int2,
    Int3,
    Int4,

    IntArray,
    Int2Array,
    Int3Array,
    Int4Array,

    Float2x2Array,
    Float3x3Array,
    Float4x4Array,
}

export enum AttributeType {
    Float,
    Float2,
    Float3,
    Float4,

    FloatArray,
    Float2Array,
    Float3Array,
    Float4Array,
}

export class Uniform {
    
    type      : UniformType;
    data      : number[];
    transpose : boolean;

    constructor(data: number[], type: UniformType, transpose: boolean = false) {
        this.data       = data;
        this.type       = type;
        this.transpose  = transpose;
    }
}

export type Attribute = {
    type      : AttributeType,
    data      : number[],
}

export default class Material extends ComponentBase {

    private shader      : Shader;
    private attributes  : SDictionaryOf<Attribute>;
    private uniforms    : SDictionaryOf<Uniform>;

    constructor(shader: Shader, attributes: {[name: string]: Attribute} = {}, uniforms: {[name: string]: Uniform} = {}) {
        super();

        this.attributes = attributes;
        this.uniforms   = uniforms;
        this.shader     = shader;
    }

    onInit(scene: Scene, _: GameObjectBase) {
        this.shader.compile(scene.getContext());
    }

    onBeforeRender(scene: Scene, _: GameObjectBase) {
        if(this.shader.program === undefined)
            throw new Error("Failed to send shader uniforms & attributes : shader program was undefined.");
        
        const gl = scene.getContext();

        gl.useProgram(this.shader.program);

        this.sendAttributes(gl);
        this.sendUniforms(gl);
    }

    /**
     * Get the shader.
     * @returns The shader.
     */
    public getShader() {
        return this.shader;
    }

    /**
     * Set an attribute.
     * @param name The attribute name.
     * @param attribute The attibute data.
     */
    public setAttribute(name: string, attribute: Attribute) {
        this.attributes[name] = attribute;
    }

    /**
     * Remove an attribute.
     * @param name The attribute name.
     * @returns `true` if the attribute was successfuly removed otherwise `false`
     */
    public removeAttribute(name: string) {
        if(this.attributes[name]) {
            delete this.attributes[name];
            return true;
        } else {
            return false;
        }
    }

    /**
     * Set an uniform.
     * @param name The uniform name.
     * @param uniform The uniform data.
     */
     public setUniform(name: string, uniform: Uniform) {
        this.uniforms[name] = uniform;
    }

    /**
     * Remove an uniform.
     * @param name The uniform name.
     * @returns `true` if the uniform was successfuly removed otherwise `false`
     */
    public removeUniform(name: string) {
        if(this.uniforms[name]) {
            delete this.uniforms[name];
            return true;
        } else {
            return false;
        }
    }

    private sendAttributes(gl: WebGLRenderingContext) {
        // Send attribute data to the shader.
        for(const key in this.attributes) {

            // Our attribute object
            const attribute = this.attributes[key];

            // The attribute location in the vertex shader.
            const location = gl.getAttribLocation(this.shader.program!, key);

            switch(attribute.type) {
                case AttributeType.FloatArray: 
                    gl.vertexAttrib1fv(location, attribute.data); 
                    break;
                case AttributeType.Float2Array: 
                    gl.vertexAttrib2fv(location, attribute.data); 
                    break;
                case AttributeType.Float3Array: 
                    gl.vertexAttrib3fv(location, attribute.data); 
                    break;
                case AttributeType.Float4Array: 
                    gl.vertexAttrib4fv(location, attribute.data); 
                    break;
                case AttributeType.Float: 
                    if(attribute.data.length < 1) throw new Error(`Can't set attribute float "${key}": not enough components`)
                    gl.vertexAttrib1f (location, attribute.data[0]); 
                    break;
                case AttributeType.Float2: 
                    if(attribute.data.length < 2) throw new Error(`Can't set attribute float2 "${key}": not enough components`)
                    gl.vertexAttrib2f (location, attribute.data[0], attribute.data[1]); 
                    break;
                case AttributeType.Float3: 
                    if(attribute.data.length < 3) throw new Error(`Can't set attribute float3 "${key}": not enough components`)
                    gl.vertexAttrib3f (location, attribute.data[0], attribute.data[1], attribute.data[2]);
                    break;
                case AttributeType.Float4: 
                    if(attribute.data.length < 4) throw new Error(`Can't set attribute float4 "${key}": not enough components`)
                    gl.vertexAttrib4f (location, attribute.data[0], attribute.data[1], attribute.data[2], attribute.data[3]); 
                    break;
            }
        }
    }

    private sendUniforms(gl: WebGLRenderingContext) {

        // Send uniform data to the shader.
        for(const key in this.uniforms) {

            // Our uniform object
            const uniform = this.uniforms[key];

            // The uniform location in the fragment shader.
            const location = gl.getUniformLocation(this.shader.program!, key);

            switch(uniform.type) {
                case UniformType.FloatArray: 
                    gl.uniform1fv(location, uniform.data); 
                    break;

                case UniformType.Float2Array: 
                    gl.uniform2fv(location, uniform.data); 
                    break;

                case UniformType.Float3Array: 
                    gl.uniform3fv(location, uniform.data); 
                    break;
                    
                case UniformType.Float4Array: 
                    gl.uniform4fv(location, uniform.data); 
                    break;

                case UniformType.IntArray:
                    gl.uniform1iv(location, uniform.data);
                    break;

                case UniformType.Int2Array:
                    gl.uniform2iv(location, uniform.data);
                    break;
                case UniformType.Int3Array:
                    gl.uniform3iv(location, uniform.data);
                    break;

                case UniformType.Int4Array:
                    gl.uniform4iv(location, uniform.data);
                    break;

                case UniformType.Float: 
                    if(uniform.data.length < 1) throw new Error(`Can't set uniform float "${key}": not enough components`)
                    gl.uniform1f (location, uniform.data[0]); 
                    break;

                case UniformType.Float2: 
                    if(uniform.data.length < 2) throw new Error(`Can't set uniform float2 "${key}": not enough components`)
                    gl.uniform2f (location, uniform.data[0], uniform.data[1]); 
                    break;

                case UniformType.Float3: 
                    if(uniform.data.length < 3) throw new Error(`Can't set uniform float3 "${key}": not enough components`)
                    gl.uniform3f (location, uniform.data[0], uniform.data[1], uniform.data[2]);
                    break;

                case UniformType.Float4: 
                    if(uniform.data.length < 4) throw new Error(`Can't set uniform float4 "${key}": not enough components`)
                    gl.uniform4f (location, uniform.data[0], uniform.data[1], uniform.data[2], uniform.data[3]); 
                    break;

                case UniformType.Int: 
                    if(uniform.data.length < 1) throw new Error(`Can't set uniform int "${key}": not enough components`)
                    gl.uniform1f (location, uniform.data[0]); 
                    break;

                case UniformType.Int2: 
                    if(uniform.data.length < 2) throw new Error(`Can't set uniform int2 "${key}": not enough components`)
                    gl.uniform2f (location, uniform.data[0], uniform.data[1]); 
                    break;

                case UniformType.Int3: 
                    if(uniform.data.length < 3) throw new Error(`Can't set uniform int3 "${key}": not enough components`)
                    gl.uniform3f (location, uniform.data[0], uniform.data[1], uniform.data[2]);
                    break;

                case UniformType.Int4: 
                    if(uniform.data.length < 4) throw new Error(`Can't set uniform int4 "${key}": not enough components`)
                    gl.uniform4f (location, uniform.data[0], uniform.data[1], uniform.data[2], uniform.data[3]); 
                    break;

                case UniformType.Float2x2Array:
                    gl.uniformMatrix2fv(location, uniform.transpose, uniform.data);
                    break;

                case UniformType.Float3x3Array:
                    gl.uniformMatrix3fv(location, uniform.transpose, uniform.data);
                    break;

                case UniformType.Float4x4Array:
                    gl.uniformMatrix4fv(location, uniform.transpose, uniform.data);
                    break;
            }
        }
    }
}