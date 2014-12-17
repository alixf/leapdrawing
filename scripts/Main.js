window.onload = function()
{
    function getFileContent(url)
    {
        return $.ajax({type: "GET",  url: url, async: false}).responseText;
    }
    window.input = new InputManager(document);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    scene.add(camera);
    skydome = new Skydome(THREE.ImageUtils.loadTexture('assets/skydome.jpg'));
    scene.add(skydome);

    var material = new THREE.MeshBasicMaterial({color : 0xffffff, transparent : true, opacity : 0.5});
    var cursor = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
    scene.add(cursor);

    camera.position.y += 5;
    camera.position.z += 10;
    camera.lookAt(new THREE.Vector3(0,0,0));
    var initialCamQuaternion = new THREE.Quaternion();
    initialCamQuaternion.copy(camera.quaternion);

    var gridHelper = new THREE.GridHelper(10, 0.5);
    scene.add(gridHelper);
    scene.add(new THREE.AxisHelper(1.5));

    var yArrow = new THREE.ArrowHelper(new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,0), 1, 0xFFFF00);
    scene.add(yArrow);    

    //var directionalLight2 = new THREE.DirectionalLight(0x777777, 1.0); directionalLight2.position.set(1, 0, 1); scene.add(directionalLight2);
    //var directionalLight3 = new THREE.DirectionalLight(0x555555, 1.0); directionalLight3.position.set(1, 1, 0); scene.add(directionalLight3);
    //var ambientLight = new THREE.AmbientLight( 0x333333 ); scene.add(ambientLight);

    fingerPosition = {x : 0, y : 0, z : 0};
    cursorPosition = {x : 0, y : 0, z : 0};
    canMoveCursor = true;
    
    var tools = [];
    
    
    var HistoryManager = function()
    {
        this.commands = [];
        this.undo = function()
        {
            var command = this.commands.pop();
            if(command != null)
                command();
        };
        this.register = function(command)
        {
            this.commands.push(command);
        }
    }
    historyManager = new HistoryManager();
    
    // Tools
    var cloneTool = new CloneTool(scene);
    input.register(cloneTool, "A".charCodeAt(0));
    tools.push(cloneTool);
    
    var cubeTool = new CubeTool(scene);
    input.register(cubeTool, "B".charCodeAt(0));
    tools.push(cubeTool);
    
    var cameraTool = new CameraTool(camera);
    input.register(cameraTool, "C".charCodeAt(0));
    tools.push(cameraTool);

    var lightTool = new LightTool(scene);
    input.register(lightTool, "L".charCodeAt(0));
    tools.push(lightTool);

    var colorPlane = new ColorPlane();
    scene.add(colorPlane);
    var colorTool = new ColorTool(scene, cursor, camera, initialCamQuaternion, colorPlane);
    input.register(colorTool, "P".charCodeAt(0));
    tools.push(colorTool);
    

    var renderer = new THREE.WebGLRenderer({antialiasing: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

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
        
        cursorPosition = new THREE.Vector3(fingerPosition.x, fingerPosition.y, fingerPosition.z);
        camera.lookAt(new THREE.Vector3(0,camera.position.y,0));
        cursorPosition.applyQuaternion(camera.quaternion);
        camera.lookAt(new THREE.Vector3(0,0,0));
        
        if(canMoveCursor)
        {
            cursor.position.set(cursorPosition.x, cursorPosition.y, cursorPosition.z);
            yArrow.position.set(cursor.position.x, 0, cursor.position.z);   
        }
        
        for(i = 0; i < tools.length; ++i)
            tools[i].update();
        
        renderer.render(scene, camera);
    };
    
    var doingGesture = false;
    var output = document.getElementById('output');
    var controller = Leap.loop({enableGestures: true}, function(frame)
    {
        if(frame.valid)
        {
            if(frame.hands.length > 0)
            {
                var indexPosition = frame.hands[0].indexFinger.tipPosition;
                var finger = {x:indexPosition[0]/25, y:indexPosition[1]/50, z:indexPosition[2]/25};
                window.fingerPosition = finger;
            }
            if(frame.gestures.length > 0)
            {
                frame.gestures.forEach(function(gesture)
                {
                    switch (gesture.type)
                    {
                    case "swipe":
                            
                        if(!doingGesture)
                        {
                            doingGesture = true;
                            if(gesture.direction[0] < 0) // Left swipe
                            {
                                historyManager.undo();
                            }
                        }
                        break;
                    }
                });
            }
            else if(doingGesture)
            {
                doingGesture = false;
            }
        }
    });

    render();
};
