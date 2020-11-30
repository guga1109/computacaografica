
var scene;
var camera;
var renderer;

var criaGround = function(){
    textureLoader = new THREE.TextureLoader();
    groundTexture = textureLoader.load('assets/grass.jpg');
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(250, 250);
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;

    ground = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(100, 100, 10),
        new THREE.MeshBasicMaterial({map: groundTexture})
    );

    ground.rotation.x -= Math.PI / 2;
    ground.position.y =-2;

    scene.add(ground);
}

var loadObj = function(assetName, scale, rotationX, rotationY, rotationZ){
    objLoader = new THREE.OBJLoader();

    objLoader.load(
        'assets/' + assetName + ".obj",
        function(object){
            objCarregado = object;
            objCarregado.scale.x = scale;
            objCarregado.scale.y = scale;
            objCarregado.scale.z = scale;

            objCarregado.position.z = 0;
            objCarregado.position.x = 0;
            objCarregado.position.y = -2;
            objCarregado.rotation.x = rotationX;
            objCarregado.rotation.z = rotationY;
            objCarregado.rotation.y = rotationZ;
            scene.add(objCarregado)
        }
    );
}

var init = function() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 

                                60                                          // angulo
                                ,window.innerWidth / window.innerHeight     //aspect
                                ,0.1                                       // Near
                                ,1000                                      // Far
                            );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.criaGround();
    this.loadObj("cavalo", 0.2, 4.5, 4.5, 0);
    this.loadObj("porco", 10, 4.5, 4.5, 0);
    this.loadObj("pato", 0.09, 4.5, 4.5, 0);
    this.loadObj("elefante", 0.09, 4.5, 4.5, 0);
    this.loadObj("penguin", 10, 4.5, 4.5, 5);

    //Iluminação
    spotLight = new THREE.SpotLight( 0xffffff);
    scene.add(spotLight);
    spotLight.position.set(100,100,100);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2000;
    spotLight.shadow.mapSize.height = 2000;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 99;
    spotLight.shadow.camera.fov = 40;

   
	camera.position.set( 0, 20, 100 );

    

    //Essas linhas criam o gridView, lembrando que ele basicamente Ã© sÃ³ uma grade de linhas no eixo X
    //scene.add( new THREE.GridHelper( 400, 40 ) );
  
    render();

    document.addEventListener('keydown', onKeyDown );  
};

var ci = 0
var render = function() {
    requestAnimationFrame( render );

    renderer.render( scene, camera );
};

var onKeyDown = function(e){
    if(e.keyCode == 37){
       camera.position.x+=-0.1;
    }
    if(e.keyCode == 39){
        camera.position.x+=+0.1;
    }
    if(e.keyCode == 38){
        camera.position.y+=+0.1;
    }
    if(e.keyCode == 40){
        camera.position.y+=-0.1;
    }
    if(e.keyCode == 81){
        camera.position.z+=-0.1;
    }
    if(e.keyCode == 65){
        camera.position.z+=+0.1;
    }
    if(e.keyCode == 32){
        camera.rotation.y+=+0.1;
    }
}

window.onload = this.init;