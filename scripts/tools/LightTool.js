window.LightTool = function(scene, pointLight, meshLight)
{
    this.update = function(enabled, position)
    {        
        if(enabled)
        {            
            meshLight.position.set(fingerPosition.x, fingerPosition.y, fingerPosition.z);
            pointLight.position.set(fingerPosition.x, fingerPosition.y, fingerPosition.z);
            meshLight.updateMatrix();            
        }        
    }
};
