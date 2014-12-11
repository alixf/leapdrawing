window.ColorPlane = function()
{
    function getFileContent(url)
    {
        return $.ajax({type: "GET",  url: url, async: false}).responseText;
    }
    
    var geometry = new THREE.PlaneGeometry( 5, 5, 32 );
    var uniforms = { depth: { type: 'f', value: 0. },
		     alpha : {type: 'f', value: 0. } };
    var material = new THREE.ShaderMaterial( {
			uniforms: uniforms,
			vertexShader:   getFileContent("shaders/colorPlane.vert"),
                        fragmentShader: getFileContent("shaders/colorPlane.frag")
                	});

    plane_color = new THREE.Mesh(geometry, material);                             
    plane_color.renderDepth = 1000.0;
    return plane_color;

   
};
