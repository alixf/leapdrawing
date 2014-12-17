window.CubeTool = function(scene)
{
    this.scene = scene;
    this.enabled = false;
    this.newObject = null;
    this.startPosition = new THREE.Vector3();
    
    this.begin = function()
    {
        this.enabled = true;
    
        this.startPosition.set(cursorPosition.x, cursorPosition.y, cursorPosition.z);
        
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshLambertMaterial({color : 0x00ff00});
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        this.newObject = cube;
        
        /*// Undo creation
        historyManager.register(function(scene, obj) { return function()
        {
            scene.remove(obj);
        }}(scene, this.newObject));*/
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