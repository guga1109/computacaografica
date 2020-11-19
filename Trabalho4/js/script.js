
var scene;
var camera;
var renderer;

var velocity = 0.1;


var createACube = function() {
    var material = new THREE.MeshBasicMaterial( { color: 0x5d0000, vertexColors: false } );
    var material2 = new THREE.MeshBasicMaterial( { color: 0x1263de, vertexColors: false } );
    var material3 = new THREE.MeshBasicMaterial( { color: 0xde8912, vertexColors: false } );

    forma1 = new THREE.Mesh( new THREE.ConeBufferGeometry(6, 8, 16), material );
    forma2 = new THREE.Mesh( new THREE.DodecahedronBufferGeometry(7, 2), material2 );
    forma3 = new THREE.Mesh( new THREE.IcosahedronBufferGeometry(7), material3 );

    scene.add(forma1);
    scene.add(forma2);
    forma2.position.x += 20;
    scene.add(forma3);
    forma3.position.x -= 20;
};

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

    this.createACube();

   
	camera.position.set( 0, 20, 100 );

    

    //Essas linhas criam o gridView, lembrando que ele basicamente Ã© sÃ³ uma grade de linhas no eixo X
    //scene.add( new THREE.GridHelper( 400, 40 ) );
  

    
   /*Para criar o plano */
   const ground = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 100, 100, 10 ),
        new THREE.MeshBasicMaterial( { color: 0xffffff})
    ); //Cria a forma plana

    ground.rotation.x = - Math.PI / 2; // rotaciona para que ela fique paralela ao eixo X
    ground.position.y-=6; // Posiciona o ground abaixo da nossa figura.
    scene.add( ground );


    render();

    document.addEventListener('keydown', onKeyDown );  
};

var ci = 0
var render = function() {
    requestAnimationFrame( render );

    renderer.render( scene, camera );
};

var rotationVelocity = 0.1;

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

function toRadians(angle) {
	return angle * (Math.PI / 180);
}