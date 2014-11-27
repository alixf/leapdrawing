window.onload = function()
{
    var renderer = new THREE.WebGLRenderer({antialiasing: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.input = new InputManager(document);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    skydome = new Skydome(THREE.ImageUtils.loadTexture('assets/skydome.jpg'));
    //scene.add(skydome);

    var material = new THREE.MeshBasicMaterial({color : 0xffffff, transparent : true, opacity : 0.5});
    var cursor = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
    scene.add(cursor);

    camera.position.z += 10;
    camera.position.y += 5;

    var gridHelper = new THREE.GridHelper(10, 0.5);     
    scene.add(gridHelper);

    var yArrow = new THREE.ArrowHelper(new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,0), 1, 0xFFFF00);
    scene.add(yArrow);
    
    var directionalLight = new THREE.DirectionalLight(0xAAAAAA, 0.5); directionalLight.position.set(0, 1, 0); scene.add(directionalLight);
    var directionalLight2 = new THREE.DirectionalLight(0x777777, 0.5); directionalLight2.position.set(1, 0, 1); scene.add(directionalLight2);
    var directionalLight3 = new THREE.DirectionalLight(0x555555, 0.5); directionalLight3.position.set(1, 1, 0); scene.add(directionalLight3);
    var light = new THREE.AmbientLight( 0x333333 ); // soft white light
    scene.add(light);

    fingerPosition = {x : 0, y : 0, z : 0};

    var render = function()
    {
        requestAnimationFrame(render);

        speed = 0.1;
        if(input.isKeyDown(38)) // Up
            fingerPosition.z -= speed;
        if(input.isKeyDown(40)) // Down
            fingerPosition.z += speed;
        if(input.isKeyDown(37)) // Left
            fingerPosition.x -= speed;
        if(input.isKeyDown(39)) // Right
            fingerPosition.x += speed;
        if(input.isKeyDown(96)) // 1
            fingerPosition.y -= speed;
        if(input.isKeyDown(97)) // 0
            fingerPosition.y += speed;

        cursor.position.set(fingerPosition.x, fingerPosition.y, fingerPosition.z);
        yArrow.position.set(fingerPosition.x, 0, fingerPosition.z);

        if(input.isKeyDown(65))
        {
            var newCube = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshLambertMaterial({color : 0x00ff00}));
            newCube.position.set(fingerPosition.x, fingerPosition.y, fingerPosition.z);
            newCube.updateMatrix();
            scene.add(newCube);
        }
        if(input.isKeyDown(67)) // Camera
        {
            camera.position.set(fingerPosition.x*3, fingerPosition.y*2, fingerPosition.z*2);
            camera.lookAt(new THREE.Vector3(0,0,0));
        }

        renderer.render(scene, camera);
    };

    var output = document.getElementById('output');
    Leap.loop(function(frame)
    {
        if(frame.hands.length > 0)
        {
            var indexPosition = frame.hands[0].indexFinger.tipPosition;
            var finger = {x:indexPosition[0]/25, y:indexPosition[1]/50, z:indexPosition[2]/25};
            window.fingerPosition = finger;
        }
    });

    render();
};