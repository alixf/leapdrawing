window.CloneTool = function(scene)
{
    this.scene = scene;
    this.update = function(enabled, position)
    {
        if(enabled)
        {
            var newObject = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshLambertMaterial({color : 0x00ff00}));
            newObject.position.set(fingerPosition.x, fingerPosition.y, fingerPosition.z);
            newObject.updateMatrix();
            scene.add(newObject);   
        }
    }
};
