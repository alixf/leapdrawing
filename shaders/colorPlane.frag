uniform float depth;
varying vec2 vUV;

void main() {
 float h = vUV.x * 360.;
 float s = vUV.y;
 float v = depth;

 
 float hi = mod(floor(h/60.), 6.);
 float f = h/60. - hi;
 float l = v * (1.-s);
 float m = v * (1.-f*s);
 float n = v * (1.-(1.-f)*s);

 float r = 0.;
 float g = 0.;
 float b = 0.;

 if(hi==0.) {
	r = v; g = n; b = l;
 }
 else if(hi==1.) {
	r = m; g = v; b = l;
 } 
 else if(hi==2.) {
	r = l; g = v; b = n;
 }
 else if(hi==3.) {
	r = l; g = m; b = v;
 }
 else if(hi==4.) {
 	r = n; g = l; b = v;
 }
 else {
	r = v; g = l; b = m;
 }
 
 gl_FragColor = vec4(r, g, b, 1);
//gl_FragColor = vec4(1, 0, 0, 1);
}
