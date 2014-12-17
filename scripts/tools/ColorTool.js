window.ColorTool = function(scene, colorPlane)
{
    this.scene = scene;
    this.colorPlane = colorPlane;
    this.update = function(enabled, position)
    {
        if(enabled)
        {
            colorPlane.material.uniforms.depth.value = position.z;
        }
    }
};
