window.ColorTool = function(scene, colorPlane)
{
    this.scene = scene;
    this.colorPlane = colorPlane;
    this.firstcall = true;
    this.initialDepth = 0.;
    this.update = function(enabled, position)
    {
        if(enabled)
        {
            colorPlane.material.uniforms.depth.value = position.z;
            if(firstcall)
            {
                colorPlane.position.set(position.x, position.y, position.z);
                initialDepth = position.z;
                firstcall = false;
            }
            else
            {
                depthvalue = initialDepth - position.z;
                if (depthvalue < 0.)
                {   	
                    depthvalue = -depthvalue;
                }
                if(depthvalue!=initialDepth)
                colorPlane.material.uniforms.depth.value = depthvalue;
            }
            colorPlane.material.uniforms.alpha.value = 1.;
        }
        else
        {
            colorPlane.material.uniforms.alpha.value = 0.;
            firstcall = true;
        }
    }
};
