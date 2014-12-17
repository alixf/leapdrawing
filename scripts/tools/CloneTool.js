window.CloneTool = function(scene)
{
    this.scene = scene;
    this.update = function(enabled, position)
    {
        if(enabled)
        {
            var newObject = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 8), new THREE.MeshLambertMaterial({color : 0x00ff00}));
            newObject.position.set(position.x, position.y, position.z);
            newObject.updateMatrix();
            scene.add(newObject);   
        }
    }
    
    this.begin = function()
    {
        console.log("begin");
    }
    
    this.end = function()
    {
        console.log("end");
    }
};
