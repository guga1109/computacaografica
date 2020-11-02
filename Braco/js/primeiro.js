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
	braco1 = new THREE.Mesh(geometry, material);

	var geometry2 = new THREE.SphereGeometry(2, 32, 32);
	var material2 = new THREE.MeshBasicMaterial( { color: 0xffffff } );
	var material3 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );

	cotovelo = new THREE.Mesh(geometry2, material2);
	cotovelo.position.y -= 5;
	braco1.add(cotovelo);

	braco2 = new THREE.Mesh(geometry, material);
	ombro = new THREE.Mesh(geometry2, material3);
	braco2.position.y -= 6;
	ombro.position.y -= 5;
	braco2.add(ombro);

	pivot1 = new THREE.Group();
	pivot1.position.set(0,0,0);
	pivot1.add(braco2);

	pivot2 = new THREE.Group();
	pivot2.position.set(0, 0, 0);
	pivot2.add(braco1);

	pivot1.add(pivot2);

	scene.add(pivot1);
	braco1.position.y += pivot2.position.x+5;
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

		pivot2.rotation.x += toRadians(deltaMovimento.y*1)*0.5;
		pivot2.rotation.y += toRadians(deltaMovimento.x*1)*0.5;
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
	if (event.keyCode == 32){
		if (pivot2.rotation.z > 1.7 || pivot2.rotation.z < -1){
			rotationVelocity *=-1;
		}
		pivot2.rotation.z += rotationVelocity;
	}
	else if (event.keyCode == 13){
		if (pivot1.rotation.z > 1.7 || pivot1.rotation.z < -1){
			rotationVelocity *= -1;
		}
		pivot1.rotation.z += rotationVelocity;
	}
}

function toRadians(angle){
	return angle * (Math.PI / 180);
}

window.onload = this.init;
