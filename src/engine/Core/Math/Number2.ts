import IMathComponent from "./IMathComponent";

/**
 * Class that group two number together and allow you to
 * perform some operation on it. Usefull for things like
 * `2D Vector`.
 */
export default class Number2 implements IMathComponent {

    x: number = 0;
    y: number = 0;

    /**
     * Create new instance of Number2.
     * 
     * @param x First component value
     * @param y Second component value
     */
    constructor(x: number = 0, y?: number) {
        if(y == undefined)
        {
            this.x = x;
            this.y = x;
        } else {
            this.x = x;
            this.y = y;
        }
    }

    public rawData() {
        return [this.x, this.y];
    }

    /**
     * Perform a basic addition on each property.
     * 
     * @param xy A `number` or another `Number2` 
     *           to add.
     */
    public add(xy: number | Number2) {
        if(xy instanceof Number2) {
            this.x += xy.x;
            this.y += xy.y;
        } else {
            this.x += xy;
            this.y += xy;
        }

        return this;
    }

    /**
     * Perform a basic substraction on each property.
     * 
     * @param xy A `number` or another `Number2` to 
     *           substract.
     */
    public sub(xy: number | Number2) {
        if(xy instanceof Number2) {
            this.x -= xy.x;
            this.y -= xy.y;
        } else {
            this.x -= xy;
            this.y -= xy;
        }

        return this;
    }

    /**
     * Perform a basic substraction on each property.
     * 
     * @param xy A `number` or another `Number2` to 
     *           substract.
     */
    public mul(xy: number | Number2) {
        if(xy instanceof Number2) {
            this.x *= xy.x;
            this.y *= xy.y;
        } else {
            this.x *= xy;
            this.y *= xy;
        }

        return this;
    }

    /**
     * Perform a basic division on each vector property.
     * 
     * @param xy A `number` or another `Number2` to divide.
     */
    public div(xy: number | Number2) {
        if(xy instanceof Number2) {
            this.x /= xy.x;
            this.y /= xy.y;
        } else {
            this.x /= xy;
            this.y /= xy;
        }

        return this;
    }

    /**
     * Make a copy of the current vector.
     * @returns The copy of the vector.
     */
    public copy() {
        return new Number2(this.x, this.y);
    }

    /**
     * Get normalized copy of this vector.
     * @returns Normalized vector.
     */
    public normalize() {
        return this.copy().div(Math.sqrt(this.x * this.x + this.y * this.y));
    }
}