import Number2 from "./Math/Number2";
import Number3x3 from "./Math/Number3x3";

export default class Transform2D {

    /** The world position in 2D space */
    private position: Number2;

    /** The rotation */
    private rotation: number;

    /** The scale */
    private scale: Number2;

    /** The transform matrix. */
    private modelMatrix: Number3x3;

    /** Indicate if the matrix need to be recalculate. */
    private needRecalculateMatrix: boolean = true;

    /**
     * Create new instance of `Transform2D`
     * @param position The position.
     * @param rotation The rotation.
     * @param scale The scale.
     */
    constructor(position: Number2 = new Number2(0), rotation: number = 0, scale: Number2 = new Number2(1)) {
        this.position   = position;
        this.scale      = scale;
        this.rotation   = rotation;

        this.modelMatrix = new Number3x3(Number3x3.identity())
        this.recalculateModelMatrix();
    }

    /**
     * Get the position.
     * @returns The position.
     */
    public getPosition() {
        return this.position;
    }

    /**
     * Set the position.
     * @param position New position.
     */
    public setPosition(position: Number2) {
        this.position = position;
        this.needRecalculateMatrix = true;
    }

    /**
     * Get the rotation angle (in radian).
     * @returns The rotation.
     */
    public getRotation() {
        return this.rotation;
    }

    /**
     * Set the rotation angle.
     * @param angle The rotation angle (in radian).
     */
    public setRotation(angle: number) {
        this.rotation = angle;
        this.needRecalculateMatrix = true;
    }

    /**
     * Get the scale.
     * @returns The scale.
     */
    public getScale() {
        return this.scale;
    }

    /**
     * Set the scale.
     * @param scale The new scale.
     */
    public setScale(scale: Number2) {
        this.scale = scale;
        this.needRecalculateMatrix = true;
    }

    /**
     * Get the model matrix.
     * @returns The model matrix.
     */
    getModelMatrix() {
        if(this.needRecalculateMatrix)
            this.recalculateModelMatrix();
        
        return this.modelMatrix;
    }

    /**
     * Recalculate the current model matrix.
     */
    private recalculateModelMatrix() {
        const t = Number3x3.tMatrix(this.position);
        const r = Number3x3.rMatrix(this.rotation);
        const s = Number3x3.sMatrix(this.scale);

        this.modelMatrix = Number3x3.mul(t, Number3x3.mul(r, s)) as Number3x3;
        this.needRecalculateMatrix = false;
    }
}