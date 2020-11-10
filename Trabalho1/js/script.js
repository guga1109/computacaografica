var scene;
var camera;
var renderer;
var sphere;
var velocidadeCuboX = 1;
var velocidadeCuboY = 1;

var criaEsfera = function() {
	var geometry = new THREE.SphereGeometry(5, 32, 32);
	var material = new THREE.MeshBasicMaterial({color: "blue"});

	sphere = new THREE.Mesh(geometry, material);
	scene.add(sphere);
};

var render = function() {
	requestAnimationFrame(render);
	animaCubo();
	renderer.render(scene, camera);
};

var animaCubo = function() {
	if (this.sphere.position.x >= 60 || this.sphere.position.x <= -60) {
		velocidadeCuboX = velocidadeCuboX * -1;
	}
	if (this.sphere.position.y >= 40 || this.sphere.position.y <= -40){
		velocidadeCuboY = velocidadeCuboY * -1;
	}
	this.sphere.position.x += velocidadeCuboX;
	this.sphere.position.y += velocidadeCuboY;
};

var init = function() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	camera.position.z = 100;

	criaEsfera();

	render();
};

window.onload = this.init;