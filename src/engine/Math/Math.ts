import Number2 from "./Number2";

export default class Math {

    static dot(a: Number2, b: Number2) {
        return (a.x * b.x) + (a.y * b.y);
    }

}