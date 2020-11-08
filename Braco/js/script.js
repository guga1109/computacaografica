//Nome: Gustavo Bevilacqua

var scene;
var camera;
var renderer;
var braco1;
var pivot2;
var velocidadeCuboX = 0.1;
var velocidadeCuboY = 0.1;

var criaCubo = function() {
	var geometry = new THREE.BoxGeometry(2, 10, 2);
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

	var geometry2 = new THREE.SphereGeometry(2, 32, 32);
	var material2 = new THREE.MeshBasicMaterial( { color: 0xffffff } );
	var material3 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );

	ombro = new THREE.Mesh(geometry2, material3);
	braco = new THREE.Mesh(geometry, material);

	braco.position.y -= 5;

	cotovelo = new THREE.Mesh(geometry2, material2);
	antebraco = new THREE.Mesh(geometry, material);

	antebraco.position.y -= 6;
	cotovelo.position.y -= 6;

	braco.add(cotovelo);
	ombro.add(braco);
	cotovelo.add(antebraco);
	cotovelo.rotation.z = 12;

	pivot1 = new THREE.Group();
	pivot1.position.set(0,0,0);
	pivot1.add(ombro);

	scene.add(pivot1);
};

var render = function() {
	requestAnimationFrame(render);
	animaCubo();
	renderer.render(scene, camera);
};

var animaCubo = function() {
	matrizRotacao = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0,1,0,1), Math.PI/30.0)
};

var cliquePressionado = false;

var onMouseMove = function(e){
	if (cliquePressionado){
		var deltaMovimento = {
			x: e.offsetX - posicaoMouser.x,
			y: e.offsetY - posicaoMouser.y,
		}

		ombro.rotation.y += toRadians(deltaMovimento.y*1.5);
	}

	posicaoMouser = {
		x: e.offsetX,
		y: e.offsetY
	};
}

var init = function() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000);

	document.addEventListener('keydown', keyDownHandler, false);

	document.addEventListener('mousedown', onMouseDown);
	document.addEventListener('mouseup', onMouseUp);
	document.addEventListener('mousemove', onMouseMove);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	camera.position.z = 100;

	this.criaCubo();

	camera.position.z = 100;

	render();
};

var ci = 0;
var rotationVelocity = 0.1;

var onMouseDown = function(e){
	cliquePressionado = true;
}

var onMouseUp = function(e){
	cliquePressionado = false;
}

function keyDownHandler(event) {
	if (event.keyCode == 38){
		if (pivot1.rotation.x > -2.60)
			pivot1.rotation.x -= rotationVelocity;
	}
	else if (event.keyCode == 40){
		if (pivot1.rotation.x < 0.1)
			pivot1.rotation.x += rotationVelocity;
	}
	else if (event.keyCode == 37){
		if (cotovelo.rotation.z > 10.40)
			cotovelo.rotation.z -= rotationVelocity;
	}
	else if (event.keyCode == 39){
		if (cotovelo.rotation.z < 12.49)
		cotovelo.rotation.z += rotationVelocity;
	}
}

function toRadians(angle){
	return angle * (Math.PI / 180);
}

window.onload = this.init;
