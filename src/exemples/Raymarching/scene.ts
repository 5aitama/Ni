import Material, { 
    Uniform, 
    UniformType 
} from '../../engine/Core/Genesis/Material';

import Transform2D  from '../../engine/Components/Transform2D';
import SceneBase    from '../../engine/Core/Genesis/Scene';
import Shader       from '../../engine/Core/Genesis/Shader';
import Number2      from '../../engine/Core/Math/Number2';
import Number3      from '../../engine/Core/Math/Number3';
import Number3x3    from '../../engine/Core/Math/Number3x3';
import GameObject2D from '../../engine/GameObjects/GameObject2D';
import Mesh2D       from '../../engine/Meshes/Mesh2D';

export default class Scene extends SceneBase {

    runtimeCreated = false;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas)
    }

    async onUpdate(time: number) {
        await super.onUpdate(time);

        const gameObject = this.getGameObject('full-screen-quad');

        if(gameObject) {
            const transform = gameObject.getComponent(Transform2D);
            
            const screenSize = this.getSize();

            transform?.setPosition(this.mousePosition);
            transform?.setRotation(time / 1000);
            // transform?.setScale(new Number2(3));

            const material = gameObject.getComponent(Material);

            material?.setUniform('p_mat'        , new Uniform(Number3x3.projection(screenSize), UniformType.Float3x3Array));
            material?.setUniform('iTime'        , new Uniform([ time / 1000 ], UniformType.Float));
            material?.setUniform('iResolution'  , new Uniform([ screenSize.x, screenSize.y ], UniformType.Float2));
            material?.setUniform('blendForce'   , new Uniform([ 5 ], UniformType.Float));
        }

        if(!this.runtimeCreated) {
            // Quad vertices...
            const vertices = [
                new Number2(-1.0, -1.0),
                new Number2(-1.0,  1.0),
                new Number2( 1.0,  1.0),
                new Number2( 1.0, -1.0),
            ];

            // Quad indices...
            const indices = [
                new Number3(0, 1, 2), 
                new Number3(0, 2, 3) 
            ];

            // Create the mesh from the vertex & index array...
            const mesh = new Mesh2D(vertices, indices);

            // Retrieve the vertex shader source...
            const vshader = await fetch('/exemples/Raymarching/shaders/raymarching.vert')
                .then(response => response.text());
            
            // Retrieve the fragment shader source...
            const fshader = await fetch('/exemples/Raymarching/shaders/raymarching.frag')
                .then(response => response.text());

            // Create material from the vertex & fragment shader sources...
            const material = new Material(new Shader(vshader, fshader));
            
            // The position, scale and rotation of our quad...
            const position  = new Number2(0);
            const scale     = new Number2(100);
            const rotation  = 0;

            // Add our quad game object to the scene...
            this.addGameObject('full-screen-quad', new GameObject2D(position, rotation, scale, mesh, material));

            this.runtimeCreated = true;
        }
    }
}

export class Scene2 extends SceneBase {

    runtimeCreated = false;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas)
    }

    async onUpdate(time: number) {
        await super.onUpdate(time);

        const gameObject = this.getGameObject('full-screen-triangle');

        if(gameObject) {
            const transform = gameObject.getComponent(Transform2D);
            
            const screenSize = this.getSize();

            transform?.setPosition(this.mousePosition);
            transform?.setRotation(time / 1000);
            // transform?.setScale(new Number2(3));

            const material = gameObject.getComponent(Material);

            material?.setUniform('p_mat'        , new Uniform(Number3x3.projection(screenSize), UniformType.Float3x3Array));
            material?.setUniform('iTime'        , new Uniform([ time / 1000 ], UniformType.Float));
            material?.setUniform('iResolution'  , new Uniform([ screenSize.x, screenSize.y ], UniformType.Float2));
            material?.setUniform('blendForce'   , new Uniform([ 5 ], UniformType.Float));
        }

        if(!this.runtimeCreated) {
            // Quad vertices...
            const vertices = [
                new Number2(-1.0, -1.0),
                new Number2( 0.0,  1.0),
                new Number2( 1.0, -1.0),
            ];

            // Quad indices...
            const indices = [
                new Number3(0, 1, 2), 
            ];

            // Create the mesh from the vertex & index array...
            const mesh = new Mesh2D(vertices, indices);

            // Retrieve the vertex shader source...
            const vshader = await fetch('/exemples/Raymarching/shaders/raymarching.vert')
                .then(response => response.text());
            
            // Retrieve the fragment shader source...
            const fshader = await fetch('/exemples/Raymarching/shaders/raymarching.frag')
                .then(response => response.text());

            // Create material from the vertex & fragment shader sources...
            const material = new Material(new Shader(vshader, fshader));
            
            // The position, scale and rotation of our quad...
            const position  = new Number2(0);
            const scale     = new Number2(100);
            const rotation  = 0;

            // Add our quad game object to the scene...
            this.addGameObject('full-screen-triangle', new GameObject2D(position, rotation, scale, mesh, material));

            this.runtimeCreated = true;
        }
    }
}