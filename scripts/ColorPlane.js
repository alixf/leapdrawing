window.ColorPlane = function()
{
    function getFileContent(url)
    {
        return $.ajax({type: "GET",  url: url, async: false}).responseText;
    }
    
    var geometry = new THREE.PlaneGeometry( 5, 5, 32 );
    var uniforms = { V : { type: 'f', value: 0.4 },
		     alpha : {type: 'f', value: 0. } };
    var material = new THREE.ShaderMaterial( {
	                transparent: true,
			uniforms: uniforms,
			vertexShader:   getFileContent("shaders/colorPlane.vert"),
                        fragmentShader: getFileContent("shaders/colorPlane.frag")
                	});
    plane_color = new THREE.Mesh(geometry, material);                             
    plane_color.renderDepth = 1000.0;
    plane_color.position.set(0,0, -1000);
    return plane_color;

   
};
