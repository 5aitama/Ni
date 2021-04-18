import IComponent from "./IComponent";

export default interface IMatrix<M extends IComponent, V extends IComponent> {
     
     /**
      * Get a matrix row.
      * @param index The row index.
      */
     getRow(index: number) : V;

     /**
      * Set a matrix row.
      * @param index The row index.
      * @param vec The row value.
      */
     setRow(index: number, vec: V | number[]) : void;

     /**
      * Get a matrix column.
      * @param index The column index.
      */
     getColumn(index: number) : V;

     /**
      * Set a matrix column.
      * @param index The column index.
      * @param vec The column value.
      */
     setColumn(index: number, vec: V | number[]) : void;

     /**
      * Multiply the matrix by matrix or vector `mat`.
      * @param mat Multiplicative matrix..
      */
      mul(mat: M | V): M | V;
}