import Buffer, { BufferAttributeAmount, BufferDataType, BufferTarget, BufferUsage } from "./Buffer";
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
    
    buffers: Buffer[] = [];
    materials: Material[] = [];

    vbuffer : Buffer | null = null;
    tbuffer : Buffer | null = null;
    shader  : Shader | null = null;
    material: Material | null = null;

    fps: number = 0;
    t_fps: number = 0;
    lastTime: number = 0;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const gl = canvas.getContext('webgl');

        if(!gl) throw new Error("Failed to get webgl context: Please live in 2020 dude...");

        this.gl = gl;
        
        const fShaderUrl = new URL('https://raw.githubusercontent.com/5aitama/Snake/main/src/shaders/fragment.frag');
        const vShaderUrl = new URL('https://raw.githubusercontent.com/5aitama/Snake/main/src/shaders/vertex.vert');
        
        Shader.LoadFrom(fShaderUrl, vShaderUrl).then(shader => {
            this.shader = shader;

            this.material = new Material(this.shader, {}, {
                iTime: { 
                    type: UniformType.Float, 
                    data: [0], 
                    transpose: false 
                },

                iResolution: { 
                    type: UniformType.Float2, 
                    data: [this.canvas.width, this.canvas.height], 
                    transpose: false 
                },

                blendForce: { 
                    type: UniformType.Float, 
                    data: [8], 
                    transpose: false
                }
            });
            
            this.material.sendUniforms(this.gl);
            this.material.sendAttributes(this.gl);
    
            this.vbuffer = new Buffer({
                aVertexPosition: { 
                    data: [-1, -1, -1, 1, 1, 1, 1, -1,],
                    type: BufferDataType.byte, 
                    size: BufferAttributeAmount.two, 
                    normalized: false 
                },
            }, BufferTarget.array, BufferUsage.static);
    
            Buffer.updateBuffer(this.gl, this.vbuffer, this.shader);
    
            this.tbuffer = new Buffer({
                indices: {
                    data: [0, 1, 2, 0, 2, 3],
                    type: BufferDataType.ubyte, 
                    size: BufferAttributeAmount.one, 
                    normalized: false 
                },
            }, BufferTarget.element, BufferUsage.static);
    
            Buffer.updateBuffer(this.gl, this.tbuffer, this.shader);
            this.onResize(this.gl);
            window.addEventListener('resize', () => this.onResize(this.gl));
            this.onTest(0);
        });
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

    onTest(time: number = 0) {
        requestAnimationFrame((time) => this.onTest(time));

        // Update buffers...
        for(const buff of this.buffers)
            Buffer.updateBuffer(this.gl, buff, this.shader!);

        // Update materials uniforms and attributes...
        for(const mat of this.materials) {
            mat.sendAttributes(this.gl);
            mat.sendUniforms(this.gl);
        }

        const delta = time - this.lastTime;
        this.lastTime = time;

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.clearColor(0.2, 0.2, 0.2, 1);
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.useProgram(this.shader!.program!);

        this.material!.uniforms.iTime.data          = [ time / 1000 ];
        this.material!.uniforms.blendForce.data     = [ parseInt(slider.value) / 1000 ];
        this.material!.uniforms.iResolution.data    = [ this.gl.canvas.width, this.gl.canvas.height ];

        this.material!.sendUniforms(this.gl);
        this.material!.sendAttributes(this.gl);
        
        Buffer.bindBuffer(this.gl, this.tbuffer!);
        this.gl.drawElements(this.gl.TRIANGLES, this.tbuffer!.data.indices.data.length, this.tbuffer!.data.indices.type, 0);

        if(this.t_fps > 1000) {
            fpsLabel.innerText = this.fps.toString() + ' fps';
            
            this.t_fps = 0;
            this.fps = 0;
        }


        this.t_fps += delta;
        this.fps++;
    }
}