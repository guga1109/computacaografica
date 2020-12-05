var scene;
var camera;
var renderer;
var controls;

var velocity = 0.1;

var ground;

var objLoader;
var textureLoader;

var spotLight;

var obj; //objeto dinamico.

var objCarregado = [];

var char = [];

const clock = new THREE.Clock();
var mixer,action;




var guiFunction = function(){
    const gui = new dat.GUI();

    var parametroQualquer;

    param = {
        animais: ""
    };    

    var chGeometry = gui.add(param, 'animais', ['Vaca', 'Ptero', 'Porco', 'Girafa', 'Panda', 'Cabrito', 'Veado' ]).name("Elementos");
    chGeometry.onChange(function(parametroQualquer){
        
        if (parametroQualquer == 'Vaca'){
            camera.lookAt(objCarregado[5].position);
        } else if (parametroQualquer == 'Ptero'){
            camera.lookAt(objCarregado[6].position);
        } else if (parametroQualquer == "Porco"){
            camera.lookAt(objCarregado[3].position);
        } else if (parametroQualquer == "Girafa"){
            camera.lookAt(objCarregado[1].position);
        } else if (parametroQualquer == "Panda"){
            camera.lookAt(objCarregado[0].position);
        } else if (parametroQualquer == "Cabrito"){
            camera.lookAt(objCarregado[2].position);
        } else if (parametroQualquer == "Veado"){
            camera.lookAt(objCarregado[4].position);
        }
        
    });
    
    gui.open();
   
};

var criaGround = function (){

    textureLoader = new THREE.TextureLoader();
    
    groundTexture = textureLoader.load('assets/textura/terrain/grasslight-big.jpg');
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 20, 20 );
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;
    material = new THREE.MeshBasicMaterial({map : groundTexture});
    
    material.normalMap =  textureLoader.load('assets/textura/terrain/grasslight-big-nm.jpg');

    ground = new  THREE.Mesh(
        new THREE.PlaneGeometry(1050, 1050, 25,25),
        material
    );

    ground.rotation.x -= Math.PI / 2;
    ground.position.y=-2;

    scene.add(ground);
};

var loadObj = function(){
    objLoader = new THREE.OBJLoader();
    fbxLoader = new THREE.FBXLoader();
    textureLoader = new THREE.TextureLoader();
 

    for (i=0; i<7; i++){
        objLoader.load(
            'assets/models/tree.obj', //arquivo que vamos carregar
            function(object){
                
                object.traverse( function ( child ) {
                            if ( child instanceof THREE.Mesh ) {
                                child.material.map = textureLoader.load("assets/textura/Wood.jpg");
                                //child.material.shininess = 0;
                            }
                        });

                object.scale.x =50;
                object.scale.y = 50;
                object.scale.z = 50;

                object.position.z = Math.random()*200*(Math.random() > 0.5 ? -1: 1);
                object.position.x = Math.random()*200*(Math.random() > 0.5 ? -1: 1);
                
                object.position.y = -1;


                //object.rotation.y += 1;

                object.castShadow = true;

                scene.add(object);    
            },//metodo, tudo deu certo
            function( andamento) {
                console.log((andamento.loaded / andamento.total *100) + "% pronto!");
            },//metodo executa enquanto carrega
            function (error){
                console.log("Deu caca: " + error);
            } //metodo deu merda
        );
    }

    fbxLoader.load(
        'assets/models/Panda.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[0] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/Panda_UV.png");
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 0.04;
            object.scale.y = 0.04;
            object.scale.z = 0.04;

            object.position.z = -45;
            object.position.x = 180;
            object.position.y = -2;


            object.rotation.y -= 0.3;

            object.castShadow = true;

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/Giraffe.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[1] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/Giraffe_UV.png");
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 0.2;
            object.scale.y = 0.2;
            object.scale.z = 0.2;

            object.position.z = -300;
            object.position.x = -50;
            object.position.y = 27;


            object.rotation.y -= 0.3;

            object.castShadow = true;

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/Goat.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[2] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/UVGoat.png");
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 0.02;
            object.scale.y = 0.02;
            object.scale.z = 0.02;

            object.position.z = -40;
            object.position.x = 90;
            object.position.y = -2;


            object.rotation.y -= 0.3;

            object.castShadow = true;

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/Pig.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[3] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/UVPig.png");
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 10;
            object.scale.y = 10;
            object.scale.z = 10;

            object.position.z = -20;
            object.position.x = -100;
            object.position.y = -2;


            object.rotation.y -= 0.3;

            object.castShadow = true;

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/Deer.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[4] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/UV_Deer.png");
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 0.05;
            object.scale.y = 0.05;
            object.scale.z = 0.05;

            object.position.z = 0;
            object.position.x = -50;
            object.position.y = -2;


            object.rotation.y -= 0.3;

            object.castShadow = true;

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/Cow.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[5] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/UVCow.png");
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 0.1;
            object.scale.y = 0.1;
            object.scale.z = 0.1;

            object.position.z = 0;
            object.position.x = 5;
            object.position.y = -2;


            object.rotation.y += 1;

            object.castShadow = true;

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/Pterodactyl.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[6] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/UV Pterodactyl.png");
                            child.material.normalMap = 
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 0.01;
            object.scale.y = 0.01;
            object.scale.z = 0.01;

            object.position.z = -20;
            object.position.x = 15;
            object.position.y = 35;


            object.rotation.y -= 1.25;
            object.rotation.x -= 0.85;
            object.rotation.z -= 0.15;


            object.castShadow = true;

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );
}

var init = function() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcce0ff );

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );

    renderer = new THREE.WebGLRenderer();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  

    //createACube();

    loadObj();
   
    camera.position.z = 100;
    camera.position.y = 30;


    //Iluminação 
    //Não se preocupe com essa parte por enquanto, apenas usem :)
    spotLight = new THREE.SpotLight( 0xffffff );
    scene.add(spotLight);
    spotLight.position.set( 100, 100, 100 );
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 100;
    spotLight.shadow.mapSize.height = 100;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 99;
    spotLight.shadow.camera.fov = 40;

    renderer.shadowMap.enable = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    scene.add(new THREE.AmbientLight( 0x888888 ));

    criaGround();

    guiFunction();
    
    scene.fog = new THREE.Fog( 0xcce0ff, 200, 500 );

    render();
    //  synchronizeCrossFade( ) ;
    


    document.addEventListener('keydown', onKeyDown ); 

    document.addEventListener('mousedown', onMouseDown ); //metodos de controle do mouser
    document.addEventListener('mouseup', onMouseUp ); 
    document.addEventListener('mousemove', onMouseMouse ); 
  
};

var ci = 0
var render = function() {
    requestAnimationFrame( render );

    const delta = clock.getDelta();

	if ( mixer ) mixer.update( delta );
    
   // controls.update();
    renderer.render( scene, camera );
};

var rotationVelocity = 0.1;

var onKeyDown = function(e){
    console.log(e.keyCode);
    if(e.keyCode == 37){
        obj.position.x-=velocity;
    }
    if(e.keyCode == 38){
        if (camera.position.y >=0)
            camera.position.y-= 1;
    }
    if(e.keyCode == 40){
        camera.position.y+= 1;
    }
    if (e.keyCode == 32){ //espaço -> rotação pelo pivo.
       camera.lookAt(objCarregado[1].position);
    }
    if(e.keyCode == 87){
        camera.position.z-= 0.5;
    }
    if(e.keyCode == 83){
        camera.position.z+= 0.5;
    }
    
}


var posicaoMouser = { //controla a posição do mouser
    x: 0,
    y: 0
};

var cliquePressionado = false; //para controlar o tempo que o cara esta pressionando o botao do mouser

var onMouseDown = function(e){
    cliquePressionado = true;
    //console.log("Apertou Clicou")
}


var onMouseUp = function(e){
    cliquePressionado = false;
  //  console.log("SOltou o clique");
}


var onMouseMouse = function (e){
    if (cliquePressionado){

        var deltaMovimento = {
            x: e.offsetX - posicaoMouser.x,
            y: e.offsetY - posicaoMouser.y,
        }

       camera.rotation.y += toRadians(deltaMovimento.x*0.1)*0.1;
    }

    posicaoMouser = {  //nova posição do mouser
        x : e.offsetX,
        y : e.offsetY
    };
}

window.onload = this.init;

function toRadians(angle) {
	return angle * (Math.PI / 180);
}

var stop = false;