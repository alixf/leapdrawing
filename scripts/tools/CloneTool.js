window.CloneTool = function(scene)
{
    this.scene = scene;
    this.materials = []
    this.objects = []
    this.objects[0] = new THREE.SphereGeometry(0.5, 8, 8);
    this.materials[0] = new THREE.MeshLambertMaterial({color : 0x00ff00});
    this.update = function(enabled, position)
    {
        if(enabled)
        {
            var newObject = new THREE.Mesh(this.objects[0], this.materials[0]);
            newObject.position.set(position.x, position.y, position.z);
            newObject.updateMatrix();
            scene.add(newObject);
        }
    }
};
