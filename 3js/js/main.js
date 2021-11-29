window.onload = ()=>{

// the three basic elements of every THREE project. These are ALWAYS there.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

// configure and attach the renderer, ultimately a 3d context canvas element.
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// add geometry and material to the geometry
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial();
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// position the camera in the scene
camera.position.z = 1.75;

// add an optional light
const light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 5, 5, 5 );
scene.add( light );

// regularly refresh the scene display
function animate() {
    // animate on visible axis
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    //actually refresh
	renderer.render( scene, camera );

	requestAnimationFrame( animate ); 
}
animate();

}