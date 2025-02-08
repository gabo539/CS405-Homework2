# Project 3 Report by Ralf-Gabriel Porębski (Student No. 36168)

## Task 1

The goal of this task was to implement the "draw" method in the "Scene node" class to ensure that transformations like as scaling, rotation, and translation, are correctly passed from parent nodes to child nodes in a hierarchical scene graph. The implementation focuses on correctly propagating these transformations using matrix multiplications.

To begin, I retrieved the current transformation matrix of the node using "this.trs.getTransformationMatrix()". If the node had a parent, I combined the parent’s transformation matrix with the current node’s matrix by multiplying them together. 

After calculating the transformation matrix, I updated the model matrix by multiplying it with the current transformation. Following this, I recalculated the model-view matrix to account for the updated transformations. Using these new matrices, I also recalculated the Model-View-Projection-matrix and the normal matrix, which depends on the model-view matrix. Using these new matrices, I also recalculated the Model-View-Projection-matrix and the normal matrix, which depends on the model-view matrix. The normal matrix was updated by multiplying the existing normal matrix with the current transformation matrix to propagate the transformations at the current node level.

Once all matrices were updated, I used them to draw the current node’s mesh. To ensure that the child nodes inherit the transformations correctly, I then called the "draw" method recursively on all child nodes and passed the updated matrices further down. 

## Task 2

### Diffuse lighting

I calculated it using the dot product between the surface normal and the light direction, as follows: diff = max(dot(normal, lightdir), 0.0); 

The max-function is important here because it prevents negative values, ensuring that light intensity does not drop below zero.

### Specular lighting

I used the Phong reflection model to simulate highlights and reflective properties of surfaces. The calculation involves determining the reflection vector of the light and the viewing direction.

The "viewDir" is the direction from the fragment to the camera, while "reflectDir" is the direction of the reflected light. The "phongExp"" parameter controls the sharpness of the highlights, where higher values result in smaller, sharper highlights. This approach successfully creates the illusion of glossy or metallic surfaces that reflect light dynamically.

"spec" calculates the specular lighting by measuring how closely the view direction aligns with the reflected light direction. The dot product is clamped to zero in order to avoid negative values. Raising it to the power of phongExp creates a sharp or soft highlight, depending on the surface's shininess. 



## Task 3

To add Mars to the solar system, I first created a MeshDrawer instance for Mars. I then set up its mesh  and applied the Mars texture using the setTextureImg function with the link https://i.imgur.com/Mwsa16j.jpeg.

For transformations, I created a new TRS instance (marsTrs) and set its translation to (-6, 0, 0). I scaled Mars uniformly to 0.35 using marsTrs.setScale(0.35, 0.35, 0.35).

Finally, I added Mars to the scene graph as a child of the Sun using marsNode = new SceneNode(marsMeshDrawer, marsTrs, sunNode);.
