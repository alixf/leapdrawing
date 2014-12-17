window.LightTool = function(scene, pointLight, meshLight)
{
    this.update = function(enabled, position)
    {        
        if(enabled)
        {            
            meshLight.position.set(position.x, position.y, position.z);
            pointLight.position.set(position.x, position.y, position.z);
            meshLight.updateMatrix();            
        }
    }
};