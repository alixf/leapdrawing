window.ColorTool = function(scene, colorPlane)
{
    this.scene = scene;
    this.colorPlane = colorPlane;
    this.firstcall = true;
    this.initialDepth = 0.;
    this.initialV = 0;
    this.update = function(enabled, fingerPosition)
    {
        if(enabled)
        {
            if(firstcall)
            {
	    	colorPlane.position.set(fingerPosition.x, fingerPosition.y, fingerPosition.z);
                initialDepth = fingerPosition.z;
		initialV = 0.4;
	        colorPlane.material.uniforms.V.value = initialV;
                firstcall = false;
            }
            else
            {
                 if (fingerPosition.z < initialDepth)
			{
                          depthVariation = initialDepth - fingerPosition.z;
                          if (depthVariation < 0.)
	         	       {   	
				depthVariation = -depthVariation;
		 	       }
	 		}
                 new_V = initialV + depthVariation/10.;
                 if(new_V > 0.4 && new_V < 1.1)
           	 	colorPlane.material.uniforms.V.value = new_V;
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
