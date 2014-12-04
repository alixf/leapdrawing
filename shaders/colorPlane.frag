uniform float depth;
varying vec2 vUV;

void main() {
 gl_FragColor = vec4(vUV.x, vUV.y, depth, 1);	      
}
