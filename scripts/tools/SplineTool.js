window.SplineTool = function(scene)
{
    this.scene = scene;
    this.enabled = false;
    this.posArray = [new THREE.Vector3(0,0,0)];
    this.curve = new THREE.SplineCurve3(this.posArray);
    this.geometry = new THREE.TubeGeometry(this.curve, this.curve.points.length);
    this.currentObj = null;
    
    this.lastPosition = new THREE.Vector3();
    
    this.begin = function()
    {
        this.enabled = true;
        
        console.log(mainColor.r+";"+mainColor.g+";"+mainColor.b);
        var material = new THREE.MeshLambertMaterial({color : mainColor.getHex(), side : THREE.DoubleSide});
                
        this.posArray = [];
        this.lastPosition.set(cursorPosition.x, cursorPosition.y, cursorPosition.z);
        this.posArray.push(new THREE.Vector3(cursorPosition.x, cursorPosition.y, cursorPosition.z));
        this.curve = new THREE.SplineCurve3(this.posArray);
        this.geometry = new THREE.TubeGeometry(this.curve, this.curve.points.length, 0.5, 16);
        
        this.currentObj = new THREE.Mesh(this.geometry, material);
        scene.add(this.currentObj);
        
        
        // Undo creation
        historyManager.register(function(scene, obj) { return function()
        {
            scene.remove(obj);
        }}(scene, this.currentObj));

    }
    
    this.end = function()
    {
        this.enabled = false;
        this.currentObj = null;
        console.log(this.posArray.length);
        this.posArray = [];
    }
    
    this.update = function()
    {
        if(this.enabled)
        {
            if(new THREE.Vector3(cursorPosition.x, cursorPosition.y, cursorPosition.z).distanceTo(this.lastPosition) > 0.5)
            {
                this.lastPosition.set(cursorPosition.x, cursorPosition.y, cursorPosition.z);
                this.posArray.push(new THREE.Vector3(cursorPosition.x, cursorPosition.y, cursorPosition.z));
                
                this.curve = new THREE.SplineCurve3(this.posArray);
                this.geometry = new THREE.TubeGeometry(this.curve, this.curve.points.length, 0.5, 16);
                this.currentObj.geometry = this.geometry;
            }
        }
    }
};