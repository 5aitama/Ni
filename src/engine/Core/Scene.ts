import IndexBuffer from "../IndexBuffer";
import Number2 from "../Math/Number2";
import Vertex2DBuffer from "../Vertex2DBuffer";
import Buffer, { 
    BufferUsage,
    BufferTarget,
    BufferAttributeSize,
    BufferAttributeDataType,
} from "./Buffer";

import Material, { UniformType } from "./Material";
import Shader from "./Shader";

const slider = document.querySelector('#slider') as HTMLInputElement;
const fpsLabel = document.querySelector('#fps_label') as HTMLParagraphElement;

/**
 *  2D Scene.
 */
export default class Scene {
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const gl = canvas.getContext('webgl');

        if(!gl) throw new Error("Failed to get webgl context: Please live in 2020 dude...");

        this.gl = gl;
    }

    onResize(gl: WebGLRenderingContext) 
    {
        const pixelRatio = window.devicePixelRatio;
        const screenWidth  = Math.floor((gl.canvas as HTMLCanvasElement).clientWidth  * pixelRatio);
        const screenHeight = Math.floor((gl.canvas as HTMLCanvasElement).clientHeight * pixelRatio);

        // Check if the canvas is not the same size.
        if (gl.canvas.width  !== screenWidth ||
            gl.canvas.height !== screenHeight) 
        {
            // Make the canvas the same size
            gl.canvas.width  = screenWidth;
            gl.canvas.height = screenHeight;
        }
    }

    
}