window.CameraTool = function(camera)
{
    this.camera = camera;
    this.update = function(enabled, position)
    {
        if(enabled)
        {
            this.camera.position.set(fingerPosition.x*3, fingerPosition.y*2, fingerPosition.z*2);
            this.camera.lookAt(new THREE.Vector3(0,0,0));
        }
    }
};
