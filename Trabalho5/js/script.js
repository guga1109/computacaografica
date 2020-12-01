var scene;
var camera;
var renderer;
var ground;
var objLoader;
var textureLoader;
var spotLight;
var obj; //objeto dinamico.

var cavalo = [];
var pato = [];
var porco = [];
var pinguin = [];
var elefante = [];

var guiFunction = function(){
	const gui = new dat.GUI();
	param = {
		animal: ""
	};    
	var chAnimal = gui.add(param, 'animal', ['cavalo', 'pato', 'porco', 'pinguin', 'elefante']).name("Animal");
	chAnimal.onChange(function(parametroQualquer){
		if (parametroQualquer == 'cavalo'){
			console.log(cavalo.position);
			camera.lookAt(cavalo.position);
		} else if (parametroQualquer == 'porco'){
			console.log(porco.position);
			camera.lookAt(porco.position);
		} else if (parametroQualquer == 'porco'){
			console.log(pinguin.position);
			camera.lookAt(pinguin.position);
		} else if (parametroQualquer == 'elefante'){
			console.log(elefante.position);
			camera.lookAt(elefante.position);
		} else if (parametroQualquer == 'pato'){
			console.log(pato.position);
			camera.lookAt(pato.position);
		}
	});
	gui.open();
};

var criaGround = function (){
	textureLoader = new THREE.TextureLoader();
	groundTexture = textureLoader.load('assets/grass.jpg');
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
	groundTexture.repeat.set(20, 20);
	groundTexture.anisotropy = 16;
	groundTexture.encoding = THREE.sRGBEncoding;
	ground = new  THREE.Mesh(
		new THREE.PlaneGeometry(1050, 1050, 25,25),
		new THREE.MeshBasicMaterial({map : groundTexture})
	);
	ground.rotation.x -= Math.PI / 2;
	ground.position.y=-2;
	scene.add(ground);
};

var loadObj = function(){
	objLoader = new THREE.OBJLoader();
	objLoader.load('assets/cavalo.obj', function(object) {
		cavalo = object;
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.material.color.setHex("0x003484");
			}
		});
		cavalo.position.z = 20;
		cavalo.position.x = 20;
        cavalo.position.y = -2;
        cavalo.rotation.x = 4.7;
        cavalo.scale.z = 0.2;
        cavalo.scale.x = 0.2;
        cavalo.scale.y = 0.2;
		cavalo.castShadow = true;
		scene.add(cavalo);    
	}, function(andamento) {
		console.log((andamento.loaded / andamento.total *100) + "% pronto!");
	}, function (error) { console.log(error); });
	objLoader.load('assets/pato.obj', function(object) {
		pato = object;
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.material.color.setHex("0xde4c84");
			}
		});
		pato.position.z = 10;
		pato.position.x = 20;
        pato.position.y = -2;
        pato.scale.x = 0.09;
        pato.scale.y = 0.09;
        pato.scale.z = 0.09;
        pato.rotation.x = 4.6;
		pato.castShadow = true;
		scene.add(pato);    
	}, function(andamento) {
		console.log((andamento.loaded / andamento.total *100) + "% pronto!");
	}, function (error) { console.log(error); });
	objLoader.load('assets/elefante.obj', function(object) {
		elefante = object;
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.material.color.setHex("0x4cc01e");
			}
		});
		elefante.position.z = 10;
		elefante.position.x = -150;
		elefante.position.y = 0;
		elefante.castShadow = true;
		scene.add(elefante);    
	}, function(andamento) {
		console.log((andamento.loaded / andamento.total *100) + "% pronto!");
	}, function (error) { console.log(error); });
	objLoader.load('assets/porco.obj', function(object) {
		porco = object;
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.material.color.setHex("0xba812d");
			}
		});
		porco.position.z = 10;
		porco.position.x = -80;
        porco.position.y = 5;
        porco.scale.y = 30;
        porco.scale.x = 30;
        porco.scale.z = 30;
        porco.rotation.x = 4.7;
        porco.rotation.y = 25.3;
		porco.castShadow = true;
		scene.add(porco);    
	}, function(andamento) {
		console.log((andamento.loaded / andamento.total *100) + "% pronto!");
	}, function (error) { console.log(error); });
	objLoader.load('assets/pinguin.obj', function(object) {
		pinguin = object;
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.material.color.setHex("0x69456a");
			}
		});
		pinguin.position.z = -20;
		pinguin.position.x = -20;
		pinguin.position.y = 20;
		pinguin.castShadow = true;
		scene.add(pinguin);    
	}, function(andamento) {
		console.log((andamento.loaded / andamento.total *100) + "% pronto!");
	}, function (error) { console.log(error); });
}

var init = function() {
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xcce0ff);
	camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 140);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	loadObj();

	spotLight = new THREE.SpotLight(0xffffff);
	scene.add(spotLight);
	spotLight.position.set(100, 100, 100);
	spotLight.castShadow = true;
	spotLight.shadow.mapSize.width = 100;
	spotLight.shadow.mapSize.height = 100;
	spotLight.shadow.camera.near = 1;
	spotLight.shadow.camera.far = 99;
	spotLight.shadow.camera.fov = 40;

	renderer.shadowMap.enable = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;

	scene.add(new THREE.AmbientLight(0xffffff));

	criaGround();
	guiFunction();
	render();
};

var render = function() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
};

window.onload = this.init;

function toRadians(angle) {
	return angle * (Math.PI / 180);
}