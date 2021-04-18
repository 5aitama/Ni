import IComponent from "./IComponent";
import IMatrix from "./IMatrix";
import Number4 from "./Number4";

export default class Mat4x4<V extends Number4> implements IComponent, IMatrix<Mat4x4<V>, V> {
    
    private mat: number[] = [];

    constructor(matrix?: number[] | Mat4x4<V>) {
            this.mat = matrix ? (Array.isArray(matrix) ? matrix : matrix.mat) : [];
    }

    /**
     * Create an identity matrix.
     * @returns Identity matrix.
     */
    static identity<T extends Number4>() {
        return new Mat4x4<T>([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ]);
    }

    getRow(index: number) {
        return new Number4(
            this.mat[index * 4    ], 
            this.mat[index * 4 + 1], 
            this.mat[index * 4 + 2],
            this.mat[index * 4 + 3],
        ) as V;
    }

    getColumn(index: number): V {
        return new Number4(
            this.mat[index     ], 
            this.mat[index + 4 ],
            this.mat[index + 8 ],
            this.mat[index + 12],
        ) as V;
    }

    setRow(index: number, vec: V | number[]) {
        if(Array.isArray(vec)) {
            this.mat[index * 4    ] = vec[0];
            this.mat[index * 4 + 1] = vec[1];
            this.mat[index * 4 + 2] = vec[2];
            this.mat[index * 4 + 3] = vec[3];
        } else {
            this.mat[index * 4    ] = vec.x;
            this.mat[index * 4 + 1] = vec.y;
            this.mat[index * 4 + 2] = vec.z;
            this.mat[index * 4 + 3] = vec.w;
        }
    }

    setColumn(index: number, vec: V | number[]) {
        if(Array.isArray(vec)) {
            this.mat[index     ] = vec[0];
            this.mat[index + 4 ] = vec[1];
            this.mat[index + 8 ] = vec[2];
            this.mat[index + 12] = vec[3];
        } else {
            this.mat[index     ] = vec.x;
            this.mat[index + 4 ] = vec.y;
            this.mat[index + 8 ] = vec.z;
            this.mat[index + 12] = vec.w;
        }
    }

    mul(mat: Mat4x4<V> | V): Mat4x4<V> | V {
        if(mat instanceof Number4) {
            return new Number4(
                this.getRow(0).dot(mat), 
                this.getRow(1).dot(mat),
                this.getRow(2).dot(mat),
                this.getRow(3).dot(mat),
            ) as V;
        } else {
            const m00 = this.getRow(0).dot(mat.getColumn(0));
            const m01 = this.getRow(0).dot(mat.getColumn(1));
            const m02 = this.getRow(0).dot(mat.getColumn(2));
            const m03 = this.getRow(0).dot(mat.getColumn(3));
            
            const m10 = this.getRow(1).dot(mat.getColumn(0));
            const m11 = this.getRow(1).dot(mat.getColumn(1));
            const m12 = this.getRow(1).dot(mat.getColumn(2));
            const m13 = this.getRow(1).dot(mat.getColumn(3));

            const m20 = this.getRow(2).dot(mat.getColumn(0));
            const m21 = this.getRow(2).dot(mat.getColumn(1));
            const m22 = this.getRow(2).dot(mat.getColumn(2));
            const m23 = this.getRow(2).dot(mat.getColumn(3));

            const m30 = this.getRow(3).dot(mat.getColumn(0));
            const m31 = this.getRow(3).dot(mat.getColumn(1));
            const m32 = this.getRow(3).dot(mat.getColumn(2));
            const m33 = this.getRow(3).dot(mat.getColumn(3));

            return new Mat4x4<V>([
                m00, m01, m02, m03,
                m10, m11, m12, m13,
                m20, m21, m22, m23,
                m30, m31, m32, m33,
            ]);
        }
    }

    flat(): number[] {
        return this.mat;
    }
}