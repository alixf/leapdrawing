window.ColorTool = function(scene, cursor, camera, initialCamQuaternion, colorPlane)
{
    this.scene = scene;
    this.camera = camera;
    this. initialCamQuaternion =  initialCamQuaternion;
    this.colorPlane = colorPlane;
    this.firstcall = true;
    this.initialDepth = 0.;
    this.initialV = 0.5;
    this.camX = camera.position.x;
    this.camY = camera.position.y;
    this.camZ = camera.position.z;
    this.camQuaternion = camera.quaternion;

    this.begin = function()
    {
        this.enabled = true;
        this.camX = camera.position.x;
	this.camY = camera.position.y;
	this.camZ = camera.position.z;
	this.camQuaternion = camera.quaternion;
	camera.position.set(0, 5, 10);
		    
	colorPlane.position.set(fingerPosition.x, fingerPosition.y, fingerPosition.z);
	//colorPlane.position.applyQuaternion(initialCamQuaternion);
        initialDepth = fingerPosition.z;
	initialV = 0.5;
	colorPlane.material.uniforms.V.value = initialV;
        
    }
    
    this.update = function()
    {
        if(this.enabled)
        {			   
	    colorPlane.position.set(colorPlane.position.x , colorPlane.position.y, cursor.position.z);
	    
	    depthVariation = initialDepth - cursor.position.z;
            if (depthVariation < 0.)
	    {   	
		depthVariation = -depthVariation;
	    }
            if (cursor.position.z < initialDepth)
	    {
	        new_V = initialV + depthVariation/10.;
                if(new_V <= 1.)
           	    colorPlane.material.uniforms.V.value = new_V;
	    }
            if (cursor.position.z > initialDepth)
	    {			  
	        new_V = initialV - depthVariation/10.;
                if(new_V >= 0.)
           	    colorPlane.material.uniforms.V.value = new_V;
	    }
			  
        
            colorPlane.material.uniforms.alpha.value = 1.;
	    
	    
	    if (fingerPosition.x>=colorPlane.position.x-2.5 && fingerPosition.x<=colorPlane.position.x+2.5 && fingerPosition.y>=colorPlane.position.y-2.5 && fingerPosition.y<=colorPlane.position.y+2.5)
	    {
		    
		h = (Math.abs(colorPlane.position.x-2.5 - fingerPosition.x)/5.) * 360;
		s = Math.abs(colorPlane.position.y-2.5 - fingerPosition.y)/5.;
		v = colorPlane.material.uniforms.V.value;
		hi = Math.floor(h/60.) % 6;
		f = h/60. - hi;
		l = v * (1.-s);
		m = v * (1.-f*s);
		n = v * (1.-(1.-f)*s);

		r = 0.;
		g = 0.;
		b = 0.;
		if(hi==0.) {
			r = v; g = n; b = l;
		}
		else if(hi==1.) {
			r = m; g = v; b = l;
		} 
		else if(hi==2.) {
			r = l; g = v; b = n;
		}
		else if(hi==3.) {
			r = l; g = m; b = v;
		}
		else if(hi==4.) {
			r = n; g = l; b = v;
		}
		else {
			r = v; g = l; b = m;
		}
	        cursor.material.opacity = 1.;
		cursor.material.color.setRGB(r,g,b);
	  }
	  else
	  {
		cursor.material.opacity = 0.5;
		cursor.material.color.setRGB(1,1,1);
	  }
	  
        }
        
	    
    }
          
    this.end = function()
    {
        this.enabled = false;
		colorPlane.position.set(0,0, -1000);
		camera.position.set(this.camX, this.camY, this.camZ);
	        colorPlane.material.uniforms.alpha.value = 0.;
		cursor.material.opacity = 0.5;
		cursor.material.color.setRGB(1,1,1);
    }
        
    
};
