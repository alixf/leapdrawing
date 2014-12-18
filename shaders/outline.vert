void main()
{ 
    float offset = 2.0;
    vec4 pos = modelViewMatrix * vec4( position + normal * offset, 1.0 );
    gl_Position = projectionMatrix * pos;
}
