window.CameraTool = function(camera)
{
    this.camera = camera;
    this.enabled = false;
    
    this.begin = function()
    {
        this.enabled = true;
        canMoveCursor = false;
    }
    
    this.end = function()
    {
        this.enabled = false;
        canMoveCursor = true;
    }
    
    this.update = function()
    {
        if(this.enabled)
        {
            this.camera.position.set(fingerPosition.x*2, fingerPosition.y*2, fingerPosition.z*2);
            this.camera.lookAt(new THREE.Vector3(cursorPosition.x, cursorPosition.y, cursorPosition.z));
        }
    }
};
