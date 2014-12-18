window.Skydome = function(texture1, texture2)
{
    function getFileContent(url)
    {
        return $.ajax({type: "GET",  url: url, async: false}).responseText;
    }
    
    var geometry = new THREE.SphereGeometry(500, 64, 64);
    var uniforms = { texture: { type: 't', value: texture1 } };
    var uniforms2 = { texture: { type: 't', value: texture2 } };

    skyMat[0] = new THREE.ShaderMaterial( {
                      uniforms:       uniforms,
                      vertexShader:   getFileContent("shaders/skydome.vert"),
                      fragmentShader: getFileContent("shaders/skydome.frag")
                    });
    skyMat[1] = new THREE.ShaderMaterial( {
                      uniforms:       uniforms2,
                      vertexShader:   getFileContent("shaders/skydome.vert"),
                      fragmentShader: getFileContent("shaders/skydome.frag")
                    });

    skydome = new THREE.Mesh(geometry, skyMat[0]);
    skydome.scale.set(-1, 1, 1);
    skydome.rotation.order = 'XZY';
    skydome.renderDepth = 1000.0;
    return skydome;
};