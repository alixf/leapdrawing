window.LightTool = function(scene)
{
    this.lightList = [];
    this.lightMeshList = [];
	this.scene = scene;
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
	    			this.lightMeshList[i].position.set(position.x, position.y, position.z);
	    			break;
        		}
        	} 

        	if( i == this.lightList.length )
        	{        		
        		var pointLight = new THREE.PointLight(0xffffff, 1.0, 10); 	        
		    	var lightMesh = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), new THREE.MeshBasicMaterial({color : pointLight.color}));

		    	pointLight.position.set(position.x, position.y, position.z);
		    	lightMesh.position.set(position.x, position.y, position.z);

		        scene.add(pointLight);
		    	scene.add(lightMesh);
		    	this.lightList.push(pointLight);
		    	this.lightMeshList.push(lightMesh);
        	}

            //meshLight.updateMatrix();
        }
    }
};