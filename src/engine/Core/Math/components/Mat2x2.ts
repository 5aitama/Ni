import IComponent from "./IComponent";
import IMatrix from "./IMatrix";
import Number2 from "./Number2";

export default class Mat2x2<V extends Number2> implements IComponent, IMatrix<Mat2x2<V>, V> {
    
    mat: number[] = [];

    constructor(matrix?: number[] | Mat2x2<V>) {
        this.mat = matrix ? (Array.isArray(matrix) ? matrix : matrix.mat) : [];
    }

    /**
     * Create an identity matrix.
     * @returns Identity matrix.
     */
     static identity<T extends Number2>() {
        return new Mat2x2<T>([
            1, 0,
            0, 1,
        ]);
    }

    getRow(index: number) {
        return new Number2(this.mat[index * 2], this.mat[index * 2 + 1]) as V;
    }

    getColumn(index: number): V {
        return new Number2(this.mat[index], this.mat[index + 2]) as V;
    }

    setRow(index: number, vec: V | number[]) {
        this.mat[index * 2    ] = Array.isArray(vec) ? vec[0] : vec.x;
        this.mat[index * 2 + 1] = Array.isArray(vec) ? vec[1] : vec.y;
    }

    setColumn(index: number, vec: V | number[]) {
        this.mat[index    ] = Array.isArray(vec) ? vec[0] : vec.x;
        this.mat[index + 2] = Array.isArray(vec) ? vec[1] : vec.y;
    }

    mul(mat: Mat2x2<V> | V): Mat2x2<V> | V {
        if(mat instanceof Number2) {
            return new Number2(this.getRow(0).dot(mat), this.getRow(1).dot(mat)) as V;
        } else {

            const m00 = this.getRow(0).dot(mat.getColumn(0));
            const m01 = this.getRow(0).dot(mat.getColumn(1));
            const m10 = this.getRow(1).dot(mat.getColumn(0));
            const m11 = this.getRow(1).dot(mat.getColumn(1));

            return new Mat2x2<V>([
                m00, m01,
                m10, m11,
            ]);
            
        }
    }

    flat(): number[] {
        return this.mat;
    }
}