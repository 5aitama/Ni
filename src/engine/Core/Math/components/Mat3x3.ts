import IComponent from "./IComponent";
import IMatrix from "./IMatrix";
import Number2 from "./Number2";
import Number3 from "./Number3";

export default class Mat3x3<V extends Number3> implements IComponent, IMatrix<Mat3x3<V>, V> {
    
    private mat: number[] = [];

    constructor(matrix?: number[] | Mat3x3<V>) {
            this.mat = matrix ? (Array.isArray(matrix) ? matrix : matrix.mat) : [];
    }

    /**
     * Create an identity matrix.
     * @returns Identity matrix.
     */
    static identity<T extends Number3>() {
        return new Mat3x3<T>([
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ]);
    }

    /**
     * Create a translation matrix.
     * @param translation The translation.
     * @returns A translation matrix.
     */
     public static tMatrix(translation: Number2) {
        return new Mat3x3([
            1            ,             0, 0,
            0            ,             1, 0,
            translation.x, translation.y, 1,
        ]);
    }

    /**
     * Create a rotation matrix.
     * @param angle The rotation angle in radian.
     * @returns A rotation matrix.
     */
     static rMatrix<T extends Number3>(angle: number) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        return new Mat3x3<T>([
            cos, sin, 0,
           -sin, cos, 0,
            0  , 0  , 1,
       ]);
    }

    /**
     * Create a scale matrix.
     * @param scale The scale.
     * @returns A scale matrix.
     */
     public static sMatrix<T extends Number3>(scale: Number2) {
        return new Mat3x3<T>([
            scale.x, 0      , 0,
            0      , scale.y, 0,
            0      , 0      , 1,
        ]);
    }

    public static projection<T extends Number2>(size: T) {
        const w =  2 / size.x;
        const h = -2 / size.y;
        
        return new Mat3x3([
             w, 0, 0,
             0, h, 0,
            -1, 1, 1,
        ]);
    }

    getRow(index: number) {
        return new Number3(
            this.mat[index * 3    ], 
            this.mat[index * 3 + 1], 
            this.mat[index * 3 + 2],
        ) as V;
    }

    getColumn(index: number): V {
        return new Number3(
            this.mat[index    ], 
            this.mat[index + 3],
            this.mat[index + 6],
        ) as V;
    }

    setRow(index: number, vec: V | number[]) {
        if(Array.isArray(vec)) {
            this.mat[index * 3    ] = vec[0];
            this.mat[index * 3 + 1] = vec[1];
            this.mat[index * 3 + 2] = vec[2];
        } else {
            this.mat[index * 3    ] = vec.x;
            this.mat[index * 3 + 1] = vec.y;
            this.mat[index * 3 + 2] = vec.z;
        }
    }

    setColumn(index: number, vec: V | number[]) {
        if(Array.isArray(vec)) {
            this.mat[index    ] = vec[0];
            this.mat[index + 3] = vec[1];
            this.mat[index + 6] = vec[2];
        } else {
            this.mat[index    ] = vec.x;
            this.mat[index + 3] = vec.y;
            this.mat[index + 6] = vec.z;
        }
    }

    mul(mat: Mat3x3<V> | V): Mat3x3<V> | V {
        if(mat instanceof Number3) {
            return new Number3(
                this.getRow(0).dot(mat), 
                this.getRow(1).dot(mat),
                this.getRow(2).dot(mat),
            ) as V;
        } else {
            const m00 = this.getRow(0).dot(mat.getColumn(0));
            const m01 = this.getRow(0).dot(mat.getColumn(1));
            const m02 = this.getRow(0).dot(mat.getColumn(2));
            
            const m10 = this.getRow(1).dot(mat.getColumn(0));
            const m11 = this.getRow(1).dot(mat.getColumn(1));
            const m12 = this.getRow(1).dot(mat.getColumn(2));

            const m20 = this.getRow(2).dot(mat.getColumn(0));
            const m21 = this.getRow(2).dot(mat.getColumn(1));
            const m22 = this.getRow(2).dot(mat.getColumn(2));

            return new Mat3x3<V>([
                m00, m01, m02,
                m10, m11, m12,
                m20, m21, m22,
            ]);
        }
    }

    flat(): number[] {
        return this.mat;
    }
}