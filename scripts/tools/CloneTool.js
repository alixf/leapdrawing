window.CloneTool = function(scene)
{
    this.scene = scene;
    this.enabled = false;
    this.newObject = null;
    
    this.begin = function()
    {
        this.enabled = true;
        this.newObject = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshLambertMaterial({color : 0x00ff00}));
        scene.add(this.newObject);
        this.newObject.position.set(cursorPosition.x, cursorPosition.y, cursorPosition.z);
        this.newObject.updateMatrix();
        
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
            this.newObject.position.set(cursorPosition.x, cursorPosition.y, cursorPosition.z);
            this.newObject.updateMatrix();
        }
    }
};
