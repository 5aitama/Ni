import Transform2D  from '../../engine/Components/Transform2D';
import SceneBase    from '../../engine/Core/Genesis/Scene';
import Shader       from '../../engine/Core/Genesis/Shader';
import GameObject2D from '../../engine/GameObjects/GameObject2D';
import { short2 }   from '../../engine/Core/Math/components/Vec2';
import Mat3x3       from '../../engine/Core/Math/components/Mat3x3';
import CircleMesh   from './CircleMesh';

import Material, { 
    Uniform, 
    UniformType 
} from '../../engine/Core/Genesis/Material';

export default class Scene extends SceneBase {

    constructor(canvas: HTMLCanvasElement) { super(canvas) }

    async onInit() {

        // Retrieve the vertex shader source...
        const vshader = await fetch('/exemples/Raymarching/shaders/raymarching.vert')
            .then(response => response.text());
        
        // Retrieve the fragment shader source...
        const fshader = await fetch('/exemples/Raymarching/shaders/raymarching.frag')
            .then(response => response.text());

        // Create material from the vertex & fragment shader sources...
        const material = new Material(new Shader(vshader, fshader));
        
        // The position, scale and rotation of our quad...
        const position  = new short2(0);
        const scale     = new short2(200 * devicePixelRatio);
        const rotation  = 0;

        // Create new circle mesh...
        const mesh = new CircleMesh(1, 64);

        // Add our quad game object to the scene...
        this.addGameObject('full-screen-quad', new GameObject2D(position, rotation, scale, mesh, material));

    }

    async onUpdate() {
        await super.onUpdate();

        const gameObject = this.getGameObject('full-screen-quad');

        if(gameObject) {
            const transform = gameObject.getComponent(Transform2D);
            const screenSize = this.getSize();

            // Update the position of our circle on the screen...
            transform?.setPosition(this.mousePosition);
            // Update the rotation of our circle (don't see but is just for testing...)
            transform?.setRotation(this.time / 1000);

            // Update uniforms of the circle shader...
            const material = gameObject.getComponent(Material);

            // Update the projection matrix
            material?.setUniform('p_mat'        , new Uniform(Mat3x3.projection(screenSize), UniformType.Float3x3Array));
            
            // For the raymarching (see more in the shader code...)
            material?.setUniform('iTime'        , new Uniform(this.time / 1000, UniformType.Float));
            material?.setUniform('iResolution'  , new Uniform(screenSize, UniformType.Float2));
            material?.setUniform('blendForce'   , new Uniform(5, UniformType.Float));
        }
    }
}