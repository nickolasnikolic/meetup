const vshader = `
varying vec2 vUv;

// 2D Random
vec2 random () {
    return vec2(${Math.random()}, ${Math.random()});
}

void main() {	
  vUv = uv;
  gl_Position = vec4( random(), random() );
}
`
const fshader = `
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_random;

varying vec2 vUv;

// 2D Random
vec2 random () {
    return vec2(${Math.random()}, ${Math.random()});
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
vec4 noise (vec2 n) {
    vec2 f = ceil(n);
    vec2 r = random();
    vec2 u = f * f * (3.0 - 2.0 * f );

    // Mix 4 corners percentages
    return vec4( r, u );
}

void main() {
    vec2 v = vUv;
    gl_FragColor = noise(v);
}
`






const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0.1, 10 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const clock = new THREE.Clock();

const geometry = new THREE.PlaneGeometry( 1, 1 );
const uniforms = {
  u_color_a: { value: new THREE.Color(0xff0000) },
  u_color_b: { value: new THREE.Color(0x00ffff) },
  u_time: { value: 0.0 },
  u_mouse: { value:{ x:0.0, y:0.0 }},
  u_resolution: { value:{ x:0, y:0 }},
  u_random: { value: Math.random() }
}

const material = new THREE.ShaderMaterial( {
  uniforms: uniforms,
  vertexShader: vshader,
  fragmentShader: fshader
} );

const plane = new THREE.Mesh( geometry, material );
scene.add( plane );

camera.position.z = 1;

onWindowResize();
if ('ontouchstart' in window){
  document.addEventListener('touchmove', move);
}else{
  window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener('mousemove', move);
}

function move(evt){
  uniforms.u_mouse.value.x = (evt.touches) ? evt.touches[0].clientX : evt.clientX;
  uniforms.u_mouse.value.y = (evt.touches) ? evt.touches[0].clientY : evt.clientY;
}

animate();

function onWindowResize( event ) {
  const aspectRatio = window.innerWidth/window.innerHeight;
  let width, height;
  if (aspectRatio>=1){
    width = 1;
    height = (window.innerHeight/window.innerWidth) * width;
    
  }else{
    width = aspectRatio;
    height = 1;
  }
  camera.left = -width;
  camera.right = width;
  camera.top = height;
  camera.bottom = -height;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  uniforms.u_resolution.value.x = window.innerWidth;
  uniforms.u_resolution.value.y = window.innerHeight;
}

function animate() {
  requestAnimationFrame( animate );
  uniforms.u_time.value += clock.getDelta();
  uniforms.u_random += Math.random();
  renderer.render( scene, camera );
}