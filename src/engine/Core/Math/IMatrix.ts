
interface IMatrix<T, R, S> {
    translate(by: T) : void;
    rotate(by: R) : void;
    scale(by: S) : void;
}