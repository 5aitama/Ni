
export default class Render {
    /**
     * Called before rendering the
     * object in the scene.
     * @param gl The context.
     */
    onBeforeRender(gl: WebGLRenderingContext)
    { /* ... */ }

    /**
     * Called when the object need to
     * render in the scene.
     * @param gl The context.
     */
    onRender(gl: WebGLRenderingContext)
    { /* ... */ }

    /**
     * Called after the object was
     * rendering.
     * @param gl The context.
     */
    onAfterRender(gl: WebGLRenderingContext)
    { /* ... */ }
}