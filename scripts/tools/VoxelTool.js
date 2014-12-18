window.VoxelTool = function(scene, cursor, arrow)
{
    this.enabled = false;

    this.scene = scene;

    this.lines = [];
    this.cursor = cursor;
    this.arrow = arrow;

    this.geom = new THREE.Geometry();      
    this.material = new THREE.LineBasicMaterial({color : 0xe60096, linewidth: 2});
    this.dashedMaterial = new THREE.LineDashedMaterial({linewidth: 1, color : 0x64bebe, dashSize: 0.1, gapSize: 0.2});

    this.startIndice = 0;

    this.init = function()
    {    
        var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);        
        geometry.computeBoundingBox();

        var max = 10;
        var min = -10;
        var height = 10;

        // Box wireFrame
        var box = new THREE.Geometry();

            
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.min.x, geometry.boundingBox.min.y, geometry.boundingBox.min.z ), 
                            new THREE.Vector3( geometry.boundingBox.min.x, geometry.boundingBox.min.y, geometry.boundingBox.max.z )
                        );
        box.computeLineDistances();
        var line = new THREE.Line( box, this.material );
        this.lines[0] = line;
        scene.add( line );

        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.min.x, geometry.boundingBox.min.y, geometry.boundingBox.min.z ), 
                            new THREE.Vector3( geometry.boundingBox.min.x, geometry.boundingBox.max.y, geometry.boundingBox.min.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.material );
        this.lines[1] = line;
        scene.add( line );

        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.min.x, geometry.boundingBox.min.y, geometry.boundingBox.min.z ), 
                            new THREE.Vector3( geometry.boundingBox.max.x, geometry.boundingBox.min.y, geometry.boundingBox.min.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.material );
        this.lines[2] = line;
        scene.add( line );

        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.max.x, geometry.boundingBox.min.y, geometry.boundingBox.min.z ), 
                            new THREE.Vector3( geometry.boundingBox.max.x, geometry.boundingBox.min.y, geometry.boundingBox.max.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.material );
        this.lines[3] = line;
        scene.add( line );

        
        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.max.x, geometry.boundingBox.min.y, geometry.boundingBox.min.z ), 
                            new THREE.Vector3( geometry.boundingBox.max.x, geometry.boundingBox.max.y, geometry.boundingBox.min.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.material );
        this.lines[4] = line;
        scene.add( line );

        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.min.x, geometry.boundingBox.max.y, geometry.boundingBox.min.z ), 
                            new THREE.Vector3( geometry.boundingBox.max.x, geometry.boundingBox.max.y, geometry.boundingBox.min.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.material );
        this.lines[5] = line;
        scene.add( line );

        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.min.x, geometry.boundingBox.max.y, geometry.boundingBox.min.z ), 
                            new THREE.Vector3( geometry.boundingBox.min.x, geometry.boundingBox.max.y, geometry.boundingBox.max.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.material );
        this.lines[6] = line;
        scene.add( line );

        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.max.x, geometry.boundingBox.max.y, geometry.boundingBox.min.z ), 
                            new THREE.Vector3( geometry.boundingBox.max.x, geometry.boundingBox.max.y, geometry.boundingBox.max.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.material );
        this.lines[7] = line;
        scene.add( line );

        
        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.min.x, geometry.boundingBox.max.y, geometry.boundingBox.max.z ), 
                            new THREE.Vector3( geometry.boundingBox.max.x, geometry.boundingBox.max.y, geometry.boundingBox.max.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.material );
        this.lines[8] = line;
        scene.add( line );

        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.min.x, geometry.boundingBox.max.y, geometry.boundingBox.max.z ), 
                            new THREE.Vector3( geometry.boundingBox.min.x, geometry.boundingBox.min.y, geometry.boundingBox.max.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.material );
        this.lines[9] = line;
        scene.add( line );

        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.max.x, geometry.boundingBox.min.y, geometry.boundingBox.max.z ), 
                            new THREE.Vector3( geometry.boundingBox.min.x, geometry.boundingBox.min.y, geometry.boundingBox.max.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.material );
        this.lines[10] = line;
        scene.add( line );

        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.max.x, geometry.boundingBox.min.y, geometry.boundingBox.max.z ), 
                            new THREE.Vector3( geometry.boundingBox.max.x, geometry.boundingBox.max.y, geometry.boundingBox.max.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.material );
        this.lines[11] = line;
        scene.add( line );

        


        // Dashed Lines         
        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( min, geometry.boundingBox.min.y, geometry.boundingBox.min.z ), 
                            new THREE.Vector3( max, geometry.boundingBox.min.y, geometry.boundingBox.min.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.dashedMaterial );
        this.lines[12] = line;
        scene.add( line );

        
        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( min, geometry.boundingBox.min.y, geometry.boundingBox.max.z ), 
                            new THREE.Vector3( max, geometry.boundingBox.min.y, geometry.boundingBox.max.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.dashedMaterial );
        this.lines[13] = line;
        scene.add( line );

        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( min, geometry.boundingBox.max.y, geometry.boundingBox.min.z ), 
                            new THREE.Vector3( max, geometry.boundingBox.max.y, geometry.boundingBox.min.z )
                        );    
        box.computeLineDistances();    
        line = new THREE.Line( box, this.dashedMaterial );
        this.lines[14] = line;
        scene.add( line );

        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( min, geometry.boundingBox.max.y, geometry.boundingBox.max.z ), 
                            new THREE.Vector3( max, geometry.boundingBox.max.y, geometry.boundingBox.max.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.dashedMaterial );
        this.lines[15] = line;
        scene.add( line );       

        

        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.min.x, geometry.boundingBox.min.y, min ), 
                            new THREE.Vector3( geometry.boundingBox.min.x, geometry.boundingBox.min.y, max )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.dashedMaterial );
        this.lines[16] = line;
        scene.add( line );      
        
        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.max.x, geometry.boundingBox.min.y, min ), 
                            new THREE.Vector3( geometry.boundingBox.max.x, geometry.boundingBox.min.y, max )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.dashedMaterial );
        this.lines[17] = line;
        scene.add( line );      

        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.max.x, geometry.boundingBox.max.y, min ), 
                            new THREE.Vector3( geometry.boundingBox.max.x, geometry.boundingBox.max.y, max )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.dashedMaterial );
        this.lines[18] = line;
        scene.add( line );
      
        
        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.min.x, geometry.boundingBox.max.y, min ), 
                            new THREE.Vector3( geometry.boundingBox.min.x, geometry.boundingBox.max.y, max )
                        );
        box.computeLineDistances();       
        line = new THREE.Line( box, this.dashedMaterial );
        this.lines[19] = line;
        scene.add( line );

        
        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.max.x, 0, geometry.boundingBox.min.z ), 
                            new THREE.Vector3( geometry.boundingBox.max.x, height, geometry.boundingBox.min.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.dashedMaterial );
        this.lines[20] = line;
        scene.add( line );

        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.max.x, 0, geometry.boundingBox.max.z ), 
                            new THREE.Vector3( geometry.boundingBox.max.x, height, geometry.boundingBox.max.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.dashedMaterial );
        this.lines[21] = line;
        scene.add( line );

        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.min.x, 0, geometry.boundingBox.min.z ), 
                            new THREE.Vector3( geometry.boundingBox.min.x, height, geometry.boundingBox.min.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.dashedMaterial );
        this.lines[22] = line;
        scene.add( line );
        
        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.min.x, 0, geometry.boundingBox.max.z ), 
                            new THREE.Vector3( geometry.boundingBox.min.x, height, geometry.boundingBox.max.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.dashedMaterial );
        this.lines[23] = line;
        scene.add( line ); 

        // Bottom Square
        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.min.x, 0, geometry.boundingBox.min.z ), 
                            new THREE.Vector3( geometry.boundingBox.max.x, 0, geometry.boundingBox.min.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.material );
        this.lines[24] = line;
        scene.add( line );

        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.min.x, 0, geometry.boundingBox.min.z ), 
                            new THREE.Vector3( geometry.boundingBox.min.x, 0, geometry.boundingBox.max.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.material );
        this.lines[25] = line;
        scene.add( line );

        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.max.x, 0, geometry.boundingBox.min.z ), 
                            new THREE.Vector3( geometry.boundingBox.max.x, 0, geometry.boundingBox.max.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.material );
        this.lines[26] = line;
        scene.add( line );

        box = new THREE.Geometry(); 
        box.vertices.push(  new THREE.Vector3( geometry.boundingBox.min.x, 0, geometry.boundingBox.max.z ), 
                            new THREE.Vector3( geometry.boundingBox.max.x, 0, geometry.boundingBox.max.z )
                        );
        box.computeLineDistances();
        line = new THREE.Line( box, this.material );
        this.lines[27] = line;
        scene.add( line );        

        for(i = 0; i < this.lines.length; ++i)
        {
            this.geom.vertices.push(new THREE.Vector3(this.lines[i].geometry.vertices[0].x, this.lines[i].geometry.vertices[0].y, this.lines[i].geometry.vertices[0].z), 
                                    new THREE.Vector3(this.lines[i].geometry.vertices[1].x, this.lines[i].geometry.vertices[1].y, this.lines[i].geometry.vertices[1].z)
                                    );
        }

        for(i = 0; i < this.lines.length; ++i)
        {
            this.lines[i].visible = false;            
        }      
    }    
    
    this.begin = function()
    {
        if(this.enabled)
        {
            voxelMode = false;
            this.arrow.visible = true;
            this.cursor.visible = true;
            for(i = 0; i < this.lines.length; ++i)
            {
                this.lines[i].visible = false;
            }
        }   
        else
        {
            voxelMode = true;
            this.arrow.visible = false;
            this.cursor.visible = false;
            for(i = 0; i < this.lines.length; ++i)
            {
                this.lines[i].visible = true;
            }
        }

        this.enabled = !this.enabled;
    }
    
    this.end = function()
    {
        //this.enabled = false;        
    }

    this.update = function()
    {    
        if(this.enabled)
        {  
            var indice =  Math.floor(this.cursor.position.x*2 + gridSize.x/2) * gridSize.y * gridSize.z
                        + Math.floor(this.cursor.position.y*2) * gridSize.z
                        + Math.floor(this.cursor.position.z*2 + gridSize.z/2);

            if(indice != this.startIndice)
            {
                this.startIndice = indice;            

                var vec = new THREE.Vector3(Math.floor(this.cursor.position.x*2)/2+0.25, 
                                            Math.floor(this.cursor.position.y*2)/2+0.25, 
                                            Math.floor(this.cursor.position.z*2)/2+0.25);

                for(var i = 0; i < 12; ++i)
                {            
                    this.lines[i].geometry.vertices[0].set( this.geom.vertices[2*i].x + vec.x, 
                                                            this.geom.vertices[2*i].y + vec.y, 
                                                            this.geom.vertices[2*i].z + vec.z);
                    this.lines[i].geometry.vertices[1].set( this.geom.vertices[2*i+1].x + vec.x, 
                                                            this.geom.vertices[2*i+1].y + vec.y, 
                                                            this.geom.vertices[2*i+1].z + vec.z);                
                    this.lines[i].geometry.verticesNeedUpdate = true;
                }

                for(var i = 12; i < 16; ++i)
                {            
                    this.lines[i].geometry.vertices[0].set( this.geom.vertices[2*i].x, 
                                                            this.geom.vertices[2*i].y + vec.y, 
                                                            this.geom.vertices[2*i].z + vec.z);
                    this.lines[i].geometry.vertices[1].set( this.geom.vertices[2*i+1].x, 
                                                            this.geom.vertices[2*i+1].y + vec.y, 
                                                            this.geom.vertices[2*i+1].z + vec.z);                
                    this.lines[i].geometry.verticesNeedUpdate = true;                    
                }

                for(var i = 16; i < 20; ++i)
                {            
                    this.lines[i].geometry.vertices[0].set( this.geom.vertices[2*i].x + vec.x, 
                                                            this.geom.vertices[2*i].y + vec.y, 
                                                            this.geom.vertices[2*i].z);
                    this.lines[i].geometry.vertices[1].set( this.geom.vertices[2*i+1].x + vec.x, 
                                                            this.geom.vertices[2*i+1].y + vec.y, 
                                                            this.geom.vertices[2*i+1].z);                
                    this.lines[i].geometry.verticesNeedUpdate = true;
                }

                for(var i = 20; i < 28; ++i)
                {            
                    this.lines[i].geometry.vertices[0].set( this.geom.vertices[2*i].x + vec.x, 
                                                            this.geom.vertices[2*i].y, 
                                                            this.geom.vertices[2*i].z + vec.z);
                    this.lines[i].geometry.vertices[1].set( this.geom.vertices[2*i+1].x + vec.x, 
                                                            this.geom.vertices[2*i+1].y, 
                                                            this.geom.vertices[2*i+1].z + vec.z);                
                    this.lines[i].geometry.verticesNeedUpdate = true;
                }
            }
        }
    }
};