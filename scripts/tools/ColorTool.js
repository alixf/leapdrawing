window.ColorTool = function(scene, colorPlane)
{
    this.scene = scene;
    this.colorPlane = colorPlane;
    this.update = function(enabled, position)
    {
        if(enabled)
        {
	    colorPlane.position.set(fingerPosition.x, fingerPosition.y, fingerPosition.z);
            colorPlane.material.uniforms.depth.value = fingerPosition.z;
            colorPlane.material.uniforms.depth.alpha = 1.;
        }
	else
	{
	    colorPlane.material.uniforms.depth.alpha = 0.;
	}	
    }
};
