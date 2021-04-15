/**
 *  
 */

import IMathComponent from "./IMathComponent";
import math from "./Math";
import Number2 from "./Number2";
import Number3 from "./Number3";

/**
 * A simple 3x3 matrix.
 */
export default class Number3x3 implements IMathComponent, IMatrix<Number2, number, Number2> {

    /**
     * Matrix data.
     */
    data: number[] = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ];

    /**
     * Create new 3x3 matrix.
     * 
     * @param m The matrix data. Can be an array of number 
     *          that contain raw matrix data or another `Number3x3`.
     */
    constructor(m?: number[] | Number3x3) {
        if(m) {
            if(Array.isArray(m)) {
                if(m.length !== 9)
                    throw new Error(`Can't create Matrix3x3: The size of the array must be equal to 9 !`);
                this.data = m;
            } else {
                this.data = m.data;
            }
        }
    }

    /**
     * Create a rotation matrix.
     * @param angle The rotation angle in radian.
     * @returns A rotation matrix.
     */
    public static rMatrix(angle: number) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        return new Number3x3([
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
    public static sMatrix(scale: Number2) {
        return new Number3x3([
            scale.x, 0      , 0,
            0      , scale.y, 0,
            0      , 0      , 1,
        ]);
    }

    /**
     * Create a translation matrix.
     * @param translation The translation.
     * @returns A translation matrix.
     */
    public static tMatrix(translation: Number2) {
        return new Number3x3([
            1, 0, translation.x,
            0, 1, translation.y,
            0, 0, 1            ,
        ]);
    }
    
    /**
     * Translate this matrix.
     * @param by translation amount.
     */
    public translate(by: Number2): void {
        this.data = Number3x3.mul(this, by).rawData();
    }

    /**
     * Rotate this matrix.
     * @param by rotation angle in radian.
     */
    public rotate(by: number): void {
        const rMatrix = new Number3x3([
             Math.cos(by), Math.sin(by), 0,
            -Math.sin(by), Math.cos(by), 0,
             0           , 0           , 1,
        ]);

        this.data = Number3x3.mul(this, rMatrix).rawData();
    }

    /**
     * Scale this matrix.
     * @param by scale factor.
     */
    public scale(by: Number2): void {

        const sMatrix = new Number3x3([
            by.x, 0   , 0,
            0   , by.y, 0,
            0   , 0   , 1,
       ]);

       this.data = Number3x3.mul(this, sMatrix).rawData();

    }

    /**
     * Get matrix row.
     * @param index row index.
     * @returns The matrix row.
     */
    public getRow(index: number) {
        const i = index * 3;
        return new Number3(this.data[i], this.data[i + 1], this.data[i + 2]);
    }

    /**
     * Get matrix column.
     * @param index column index.
     * @returns The matrix column.
     */
    public getColumn(index: number) {
        return new Number3(this.data[index], this.data[index + 3], this.data[index + 6]);
    }

    /**
     * Get an identity matrix.
     * @returns An identity matrix.
     */
    public static identity() {
        return [
            1, 0, 0, 
            0, 1, 0, 
            0, 0, 1,
        ];
    }

    /**
     * Get the matrix raw data.
     * @returns The matrix raw data.
     */
    public rawData() {
        return this.data;
    }

    /**
     * Perform matrix multiplication.
     * @param a First matrix.
     * @param b Second matrix or vector2.
     * @returns 
     */
    public static mul(a: Number3x3, b: Number2 | Number3x3) {
        if(b instanceof Number3x3) {
            const rows = [
                a.getRow(0),
                a.getRow(1),
                a.getRow(2),
            ];

            const cols = [
                b.getColumn(0),
                b.getColumn(1),
                b.getColumn(2),
            ];

            return new Number3x3([
                math.dot(rows[0], cols[0]), math.dot(rows[0], cols[1]), math.dot(rows[0], cols[2]),
                math.dot(rows[1], cols[0]), math.dot(rows[1], cols[1]), math.dot(rows[1], cols[2]),
                math.dot(rows[2], cols[0]), math.dot(rows[2], cols[1]), math.dot(rows[2], cols[2]),
            ]);
        } else {
            const _b = new Number3(b.x, b.y, 1);

            const result = new Number3(
                math.dot(a.getRow(0), _b),
                math.dot(a.getRow(1), _b),
                math.dot(a.getRow(2), _b)
            );

            return new Number2(result.x, result.y);
        }
    }
}