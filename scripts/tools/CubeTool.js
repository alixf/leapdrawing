window.CubeTool = function(scene)
{
    this.scene = scene;
    this.enabled = false;
    this.newObject = null;
    this.startIndice = 0;
    
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
                
                var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
                var material = new THREE.MeshLambertMaterial({color : mainColor.getHex()});
                var cube = new THREE.Mesh(geometry, material);
                scene.add(cube);
                this.newObject = cube;
                grid3D[this.startIndice] = cube;
                this.newObject.position.set(vec.x, vec.y, vec.z);
                this.newObject.updateMatrix();
            }
            else
            {                
                this.newObject = grid3D[this.startIndice];
            }
        }
        else
        {
            var vec = new THREE.Vector3(cursorPosition.x, cursorPosition.y, cursorPosition.z);
                
            var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
            var material = new THREE.MeshLambertMaterial({color : 0x00ff00});
            var cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            this.newObject = cube;
                
        }
        
        // Undo creation
        historyManager.register(function(scene, obj) { return function()
        {
            scene.remove(obj);
        }}(scene, this.newObject));
    }
    
    this.end = function()
    {
        this.enabled = false;
        this.newObject = null;        
    }
    
    this.update = function()
    {
        if(this.enabled)
        {
            if(voxelMode)
            {                
                var vec = new THREE.Vector3(Math.floor(cursorPosition.x*2)/2+0.25, 
                                            Math.floor(cursorPosition.y*2)/2+0.25, 
                                            Math.floor(cursorPosition.z*2)/2+0.25);

                var indice =  Math.floor(cursorPosition.x*2 + gridSize.x/2) * gridSize.y * gridSize.z
                            + Math.floor(cursorPosition.y*2) * gridSize.z
                            + Math.floor(cursorPosition.z*2 + gridSize.z/2);

                if(indice != this.startIndice)
                {
                    if(grid3D[indice] == null)
                    {
                        grid3D[indice] = grid3D[this.startIndice];
                        grid3D[this.startIndice] = null;
                        this.startIndice = indice;
                        this.newObject.position.set(vec.x, vec.y, vec.z);
                        this.newObject.updateMatrix();                        
                    }  
                }                          
            }
            else
            {
                this.newObject.position.set(cursorPosition.x, cursorPosition.y, cursorPosition.z);
                this.newObject.updateMatrix();
            }            
        }
    }
};