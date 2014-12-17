window.LightTool = function(scene)
{
    this.lightList = [];
	this.scene = scene;	
    this.geometry = new THREE.SphereGeometry(0.2, 32, 32);
    this.material = new THREE.MeshBasicMaterial({color : 0xfffffff});

    var vec = new THREE.Vector3(0,0,0);

    this.update = function(enabled, position)
    {        
        if(enabled)
        {
        	for( i = 0; i < this.lightList.length; ++i)
        	{
        		vec.subVectors(this.lightList[i].position, position);
        		if(vec.lengthSq() < 0.49)
        		{
        			this.lightList[i].position.set(position.x, position.y, position.z); 
	    			//this.lightMeshList[i].position.set(position.x, position.y, position.z);
	    			break;
        		}
        	} 

        	if( i == this.lightList.length )
        	{        		
        		var pointLight = new THREE.PointLight(0xffffff, 1.0, 10);
                this.material.color = pointLight.color;
		    	var lightMesh = new THREE.Mesh(this.geometry, this.material);

		    	pointLight.position.set(position.x, position.y, position.z);
		    	lightMesh.position.set(position.x, position.y, position.z);

                pointLight.add(lightMesh);
		        scene.add(pointLight);
		    	
		    	this.lightList.push(pointLight);		    	
        	}
        }
    }
};