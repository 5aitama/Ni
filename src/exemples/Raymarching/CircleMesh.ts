import { float2 }   from "../../engine/Core/Math/components/Vec2";
import { ubyte3 }   from "../../engine/Core/Math/components/Vec3";
import Mesh2D       from "../../engine/Meshes/Mesh2D"

export default class CircleMesh extends Mesh2D {

    /**
     * Create new circle.
     * @param radius The circle radius.
     * @param resolution The circle resolution.
     */
    constructor(radius: number, resolution: number) {
        const step    = 360 / resolution;
        const deg2rad = 0.0174533;

        const vertices : float2[] = [
            new float2(0, 0),
        ];

        const indices : ubyte3[] = [];

        for(let i = 0; i <= resolution; i ++) {
            const x = Math.cos(i * step * deg2rad) * radius;
            const y = Math.sin(i * step * deg2rad) * radius;

            vertices.push(new float2(x, y));

            if(i > 0) indices.push(new ubyte3(0, i - 1, i));
        }

        indices.push(new ubyte3(0, resolution, 1));

        super(vertices, indices);
    }
}