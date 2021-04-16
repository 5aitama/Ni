import Number2 from "./Number2";
import Number3 from "./Number3";

export default class Math {
    /**
     * Perform a dot product opeation.
     * @param a First vector
     * @param b Second vector
     * @returns The dot product of the vectors.
     */
    static dot(a: Number2 | Number3, b: Number2 | Number3) {
        if(a instanceof Number2 && b instanceof Number2)
            return (a.x * b.x) + (a.y * b.y);
        else if(a instanceof Number3 && b instanceof Number3)
            return (a.x * b.x) + (a.y * b.y) + (a.z * b.z);
        else
            throw new Error("Dot operation between these two vectors not implemented!");
    }

}