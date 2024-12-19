/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */

        var currentTransform = this.trs.getTransformationMatrix();
        
        if (this.parent) {

            currentTransform = MatrixMult(currentTransform, this.parent.trs.getTransformationMatrix());
        }
        
        var updatedModelMatrix = MatrixMult(modelMatrix, currentTransform);
        var updatedModelView = MatrixMult(modelView, currentTransform);
        var updatedMvp = MatrixMult(mvp, currentTransform);
        var updatedNormalMatrix = MatrixMult(normalMatrix, currentTransform);
        
        if (this.meshDrawer) {
            this.meshDrawer.draw(updatedMvp, updatedModelView, updatedNormalMatrix, updatedModelMatrix);
        }
        
        for (let child of this.children) {
            child.draw(updatedMvp, updatedModelView, updatedNormalMatrix, updatedModelMatrix);
        }
    }
}