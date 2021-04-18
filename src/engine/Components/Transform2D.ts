
import Scene                        from "../Core/Genesis/Scene";
import Number2                      from "../Core/Math/components/Number2";
import Material, { Uniform, UniformType }    from "../Core/Genesis/Material";
import Mat3x3                    from "../Core/Math/components/Mat3x3";
import GameObjectBase               from "../Core/Base/GameObjectBase";
import ComponentBase                from "../Core/Base/ComponentBase";
import Number3 from "../Core/Math/components/Number3";

export default class Transform2D extends ComponentBase {

    /** The world position in 2D space */
    private position: Number2;

    /** The rotation */
    private rotation: number;

    /** The scale */
    private scale: Number2;

    /** The transform matrix. */
    private modelMatrix: Mat3x3<Number3>;

    /** Indicate if the matrix need to be recalculate. */
    private needRecalculateMatrix: boolean = true;

    /**
     * Create new instance of `Transform2D`
     * @param position The position.
     * @param rotation The rotation.
     * @param scale The scale.
     */
    constructor(position: Number2 = new Number2(0), rotation: number = 0, scale: Number2 = new Number2(1)) {
        super();

        this.position   = position;
        this.scale      = scale;
        this.rotation   = rotation;

        this.modelMatrix = new Mat3x3(Mat3x3.identity())
        this.recalculateModelMatrix();
    }

    onUpdate(_: Scene, gameObject: GameObjectBase) {
        if(this.needRecalculateMatrix) {
            this.recalculateModelMatrix();
        }
        
        if(gameObject.haveComponent(Material)) {
            gameObject.getComponent(Material)!.setUniform('m_mat', new Uniform(this.modelMatrix.flat(), UniformType.Float3x3Array));
        }
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
        const t = Mat3x3.tMatrix(this.position);
        const r = Mat3x3.rMatrix(this.rotation);
        const s = Mat3x3.sMatrix(this.scale);
        
        this.modelMatrix = s.mul(r.mul(t)) as Mat3x3<Number3>;
        this.needRecalculateMatrix = false;
    }
}