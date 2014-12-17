window.onload = function()
{
    var renderer = new THREE.WebGLRenderer({antialiasing: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.input = new InputManager(document);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    scene.add(camera);
    skydome = new Skydome(THREE.ImageUtils.loadTexture('assets/skydome.jpg'));
    scene.add(skydome);

    var material = new THREE.MeshBasicMaterial({color : 0xffffff, transparent : true, opacity : 0.5});
    var cursor = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
    scene.add(cursor);

    camera.position.z += 10;
    camera.position.y += 5;

    var gridHelper = new THREE.GridHelper(10, 0.5);
    scene.add(gridHelper);
    scene.add(new THREE.AxisHelper(1.5));

    var yArrow = new THREE.ArrowHelper(new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,0), 1, 0xFFFF00);
    scene.add(yArrow);    

    //var directionalLight2 = new THREE.DirectionalLight(0x777777, 1.0); directionalLight2.position.set(1, 0, 1); scene.add(directionalLight2);
    //var directionalLight3 = new THREE.DirectionalLight(0x555555, 1.0); directionalLight3.position.set(1, 1, 0); scene.add(directionalLight3);
    //var ambientLight = new THREE.AmbientLight( 0x333333 ); scene.add(ambientLight);

    fingerPosition = {x : 0, y : 0, z : 0};
    
    var cloneTool = new CloneTool(scene);
    var cameraTool = new CameraTool(camera);
    var lightTool = new LightTool(scene);

    var colorPlane = new ColorPlane();
    scene.add(colorPlane);
    var colorTool = new ColorTool(scene, colorPlane);
    

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
        
        var cursorPosition = new THREE.Vector3(fingerPosition.x, fingerPosition.y, fingerPosition.z);
        camera.lookAt(new THREE.Vector3(0,camera.position.y,0));
        cursorPosition.applyQuaternion(camera.quaternion);
        camera.lookAt(new THREE.Vector3(0,0,0));
        
        cursor.position.set(cursorPosition.x, cursorPosition.y, cursorPosition.z);
        yArrow.position.set(cursor.position.x, 0, cursor.position.z);
        
        cloneTool.update(input.isKeyDown("A".charCodeAt(0)), cursorPosition);
        cameraTool.update(input.isKeyDown("C".charCodeAt(0)), fingerPosition);
        lightTool.update(input.isKeyDown("L".charCodeAt(0)), cursorPosition);
        colorTool.update(input.isKeyDown("P".charCodeAt(0)), cursorPosition);
        
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
