window.LightTool = function(scene, PointLight)
{
    this.update = function(enabled, position)
    {        
        if(enabled)
        {
            var newObject = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), new THREE.MeshLambertMaterial({color : PointLight.intensity}));
            newObject.position.set(fingerPosition.x, fingerPosition.y, fingerPosition.z);
            PointLight.position.set(fingerPosition.x, fingerPosition.y, fingerPosition.z);
            newObject.updateMatrix();
            scene.add(newObject);   
        }        
    }
};
