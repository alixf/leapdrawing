window.LightTool = function(scene)
{
	this.scene = scene;
    this.enabled = false;
    
    this.lightList = [];
    this.lightMeshList = [];
    
    this.startIndice = 0;
	var vec = new THREE.Vector3(0,0,0);
    this.selectedLight = null;
    
    this.begin = function()
    {
        this.enabled = true;

        if(voxelMode)
        {
            this.startIndice =    Math.floor(cursorPosition.x*2 + gridSize.x/2) * gridSize.y * gridSize.z
                                + Math.floor(cursorPosition.y*2) * gridSize.z
                                + Math.floor(cursorPosition.z*2 + gridSize.z/2) ;

            if(grid3D[this.startIndice] == null)
            {                
                var vec = new THREE.Vector3(Math.floor(cursorPosition.x*2)/2+0.25, 
                                            Math.floor(cursorPosition.y*2)/2+0.25, 
                                            Math.floor(cursorPosition.z*2)/2+0.25);
                                
                // Create pointlight
                var pointLight = new THREE.PointLight(0xffffff, 1.0, 10);
                var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
                var material = new THREE.MeshBasicMaterial({color : pointLight.color});
                
                pointLight.position.set(vec.x, vec.y, vec.z);
                scene.add(pointLight);
                this.lightList.push(pointLight);
                
                // Create light mesh
                var lightMesh = new THREE.Mesh( geometry, material);
                pointLight.add(lightMesh);
                this.lightMeshList.push(lightMesh);
                
                this.selectedLight = pointLight;
                
                grid3D[this.startIndice] = pointLight;                      

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
            else
            {                
                this.selectedLight = grid3D[this.startIndice];
            }
        }
        else
        {
            var vec = new THREE.Vector3();

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
                // Create pointlight
                var pointLight = new THREE.PointLight(0xffffff, 1.0, 10);
                pointLight.position.set(cursorPosition.x, cursorPosition.y, cursorPosition.z);
                scene.add(pointLight);
                this.lightList.push(pointLight);
                
                // Create light mesh
                var lightMesh = new THREE.Mesh( new THREE.SphereGeometry(0.2, 32, 32), 
                                                new THREE.MeshBasicMaterial({color : pointLight.color}));
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
                
                // Undo creation
                historyManager.register(function(scene, obj) { return function()
                {
                    scene.remove(obj);
                }}(scene, this.selectedLight));
            }
        }        

            
        // Undo move
        historyManager.register(function(obj, x, y, z) { return function()
        {
            obj.position.set(x, y, z);
        }}(this.selectedLight, cursorPosition.x, cursorPosition.y, cursorPosition.z));
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
            if(voxelMode)
            {                
                var indice =  Math.floor(cursorPosition.x*2 + gridSize.x/2) * gridSize.y * gridSize.z
                            + Math.floor(cursorPosition.y*2) * gridSize.z
                            + Math.floor(cursorPosition.z*2 + gridSize.z/2);

                if(indice != this.startIndice)
                {
                    if(grid3D[indice] == null)
                    {
                        var vec = new THREE.Vector3(Math.floor(cursorPosition.x*2)/2+0.25, 
                                                    Math.floor(cursorPosition.y*2)/2+0.25, 
                                                    Math.floor(cursorPosition.z*2)/2+0.25);

                        grid3D[indice] = grid3D[this.startIndice];
                        grid3D[this.startIndice] = null;
                        this.startIndice = indice;
                        this.selectedLight.position.set(vec.x, vec.y, vec.z);                        
                    }  
                }                          
            }
            else
            {
                this.selectedLight.position.set(cursorPosition.x, cursorPosition.y, cursorPosition.z);
            }
        }
    }
};