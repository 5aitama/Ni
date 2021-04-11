import IMathComponent from "./IMathComponent";
import Number2 from "./Number2";

/**
 * Class that group three number together and allow you to
 * perform some operation on it. Usefull for things like
 * `3D Vector`.
 */
export default class Number3 implements IMathComponent {

    x: number = 0;
    y: number = 0;
    z: number = 0;

    /**
     * Create new instance of Number2.
     * 
     * @param x First component value
     * @param y Second component value
     */
    constructor(x: number = 0, y?: number, z?: number) {
        if(y == undefined && z == undefined)
        {
            this.x = x;
            this.y = x;
            this.z = x;
        } else {
            this.x = x;
            this.y = y == undefined ? 0 : y;
            this.z = z == undefined ? 0 : z;
        }
    }

    public rawData() {
        return [this.x, this.y, this.z];
    }

    /**
     * Perform a basic addition on each property.
     * 
     * @param xyz A `number` or `Number2` or `Number3` to
     *           add.
     */
    public add(xyz: number | Number2 | Number3) {
        if(xyz instanceof Number2) {
            this.x += xyz.x;
            this.y += xyz.y;
        } else if(xyz instanceof Number3) {
            this.x += xyz.x;
            this.y += xyz.y;
            this.z += xyz.z;
        } else {
            this.x += xyz;
            this.y += xyz;
            this.z += xyz;
        }

        return this;
    }

    /**
     * Perform a basic substraction on each property.
     * 
     * @param xyz A `number` or `Number2` or `Number3` to
     *           substract.
     */
    public sub(xyz: number | Number2 | Number3) {

        if(xyz instanceof Number2) {
            this.x -= xyz.x;
            this.y -= xyz.y;
        } else if(xyz instanceof Number3) {
            this.x -= xyz.x;
            this.y -= xyz.y;
            this.z -= xyz.z;
        } else {
            this.x -= xyz;
            this.y -= xyz;
            this.z -= xyz;
        }

        return this;
    }

    /**
     * Perform a basic multiplication on each property.
     * 
     * @param xyz A `number` or `Number2` or `Number3` to
     *           multiply.
     */
    public mul(xyz: number | Number2 | Number3) {
        if(xyz instanceof Number2) {
            this.x *= xyz.x;
            this.y *= xyz.y;
        } else if(xyz instanceof Number3) {
            this.x *= xyz.x;
            this.y *= xyz.y;
            this.z *= xyz.z;
        } else {
            this.x *= xyz;
            this.y *= xyz;
            this.z *= xyz;
        }

        return this;
    }
}