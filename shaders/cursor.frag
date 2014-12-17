uniform float r;
uniform float g;
uniform float b;
uniform float alpha;
varying vec2 vUV;

void main() {

 gl_FragColor = vec4(r, g, b, alpha);

}
