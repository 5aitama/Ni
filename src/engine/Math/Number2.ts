
/**
 * Class that group two number together and allow you to
 * perform some operation on it. Usefull for things like
 * `2D Vector` representation.
 */
export default class Number2 {

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
}