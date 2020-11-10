//Nome: Gustavo Bevilacqua

var scene;
var camera;
var renderer;
var cube;
var velocidadeCuboX = 0.1;
var velocidadeCuboY = 0.1;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;

var criaCubo = function() {
	var geometry = new THREE.BoxGeometry(10, 10, 10);
	red = new THREE.Color(1, 0, 0);
	green = new THREE.Color(0, 1, 0);
	blue = new THREE.Color(0, 0, 1);

	var colors = [red, green, blue];

	for (var i = 0; i < 3; i++){
		geometry.faces[4*i].color = colors[i];
		geometry.faces[4*i+1].color = colors[i];
		geometry.faces[4*i+2].color = colors[i];
		geometry.faces[4*i+3].color = colors[i];
	}

	var material = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: true});

	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
};

var render = function() {
	requestAnimationFrame(render);
	animaCubo();
	renderer.render(scene, camera);
};

var animaCubo = function() {
	matrizRotacao = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0,1,0,1), Math.PI/30.0)

	if (rightPressed && !(this.cube.position.x >= 60))
		this.cube.position.x += velocidadeCuboX;
	else if (leftPressed && !(this.cube.position.x <= -60))
		this.cube.position.x -= velocidadeCuboX;
	else if (upPressed && !(this.cube.position.y >= 35))
		this.cube.position.y += velocidadeCuboY;
	else if (downPressed && !(this.cube.position.y <= -35))
		this.cube.position.y -= velocidadeCuboY;
	else if (spacePressed){
		this.cube.rotation.y += 0.1;
	}
};

var init = function() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000);

	document.addEventListener('keydown', keyDownHandler, false);
	document.addEventListener('keyup', keyUpHandler, false);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	camera.position.z = 100;

	criaCubo();

	render();
};

function keyDownHandler(event) {
    if(event.keyCode == 39) {
        rightPressed = true;
    }
    else if(event.keyCode == 37) {
        leftPressed = true;
    }
    if(event.keyCode == 40) {
    	downPressed = true;
    }
    else if(event.keyCode == 38) {
    	upPressed = true;
	}
	if (event.keyCode == 32)
		spacePressed = true;
}

function keyUpHandler(event) {
    if(event.keyCode == 39) {
        rightPressed = false;
    }
    else if(event.keyCode == 37) {
        leftPressed = false;
    }
    if(event.keyCode == 40) {
    	downPressed = false;
    }
    else if(event.keyCode == 38) {
    	upPressed = false;
	}
	if (event.keyCode == 32)
		spacePressed = false;
}

window.onload = this.init;