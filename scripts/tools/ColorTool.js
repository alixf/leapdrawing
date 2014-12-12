window.ColorTool = function(scene, colorPlane)
{
    this.scene = scene;
    this.colorPlane = colorPlane;
    this.firstcall = true;
    this.initialDepth = 0.;
    this.update = function(enabled, fingerPosition)
    {
        if(enabled)
        {
	    if(firstcall)
            {
	    	colorPlane.position.set(fingerPosition.x, fingerPosition.y, fingerPosition.z);
                initialDepth = fingerPosition.z;
                firstcall = false;
            }
            else
            {
                 depthvalue = initialDepth - fingerPosition.z;
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
