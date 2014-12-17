window.CameraTool = function(camera)
{
    this.camera = camera;
    this.update = function(enabled, position)
    {
        if(enabled)
        {
            this.camera.position.set(position.x*2, position.y*2, position.z*2);
            this.camera.lookAt(new THREE.Vector3(0,0,0));
        }
    }
};
