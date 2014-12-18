window.LightTool = function(scene)
{
	this.scene = scene;
    this.enabled = false;
    
    this.lightList = [];
    this.lightMeshList = [];
    
	var vec = new THREE.Vector3(0,0,0);
    this.selectedLight = null;
    
    this.begin = function()
    {
        this.enabled = true;
        for(var i = 0; i < this.lightList.length; ++i)
        {
            vec.subVectors(this.lightList[i].position, cursorPosition);
            if(vec.lengthSq() < 0.49)
            {
                this.selectedLight = this.lightList[i];
                break;
            }
        }

        if(i == this.lightList.length)
        {
            var pointLight = new THREE.PointLight(0xffffff, 1.0, 10);
            pointLight.position.set(cursorPosition.x, cursorPosition.y, cursorPosition.z);
            scene.add(pointLight);
            this.lightList.push(pointLight);
            
            var lightMesh = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), new THREE.MeshBasicMaterial({color : pointLight.color}));
            pointLight.add(lightMesh);
            this.lightMeshList.push(lightMesh);
            
            this.selectedLight = pointLight;
            
            // Update scene materials
            function updateChildren(o)
            {
                for(var i = 0; i < o.children.length; ++i)
                {
                    if(o.children[i].material != null)
                        o.children[i].material.needsUpdate = true;
                    updateChildren(o.children[i]);
                }
            }
            updateChildren(scene);
        }
    }
    
    this.end = function()
    {
        this.enabled = false;
        this.selectedLight = null;
    }

    this.update = function()
    {        
        if(this.enabled)
        {
            this.selectedLight.position.set(cursorPosition.x, cursorPosition.y, cursorPosition.z);
        }
    }
};