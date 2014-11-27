window.Skydome = function(texture)
{
    var geometry = new THREE.SphereGeometry(500, 64, 64);
    var uniforms = { texture: { type: 't', value: texture } };

    var material = new THREE.ShaderMaterial( {
      uniforms:       uniforms,
      vertexShader:   document.getElementById('sky-vertex').textContent,
      fragmentShader: document.getElementById('sky-fragment').textContent
    });

    skydome = new THREE.Mesh(geometry, material);
    skydome.scale.set(-1, 1, 1);
    skydome.rotation.order = 'XZY';
    skydome.renderDepth = 1000.0;
    return skydome;
};