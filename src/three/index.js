import * as THREE from 'three';
import TweenMax from 'gsap';
import threeOrbitControls from './utils/OrbitControls';
import Stats from 'stats.js';
import Particles from './particles';
import Lights from './lights';
import './index.css';

// attach orbit controls to THREE
const OrbitControls = threeOrbitControls(THREE);

// stats
const stats = new Stats();
document.body.appendChild(stats.domElement);

// scene, renderer, camera, mesh (geometry + material)
const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
// enbale the drawing of shadows
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

//Scene
const scene = new THREE.Scene();

//Lumiere ambiante
const light = new THREE.AmbientLight(0xE7E7E7);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 0, 50);

// controls
const controls = new OrbitControls(camera, renderer.domElement);


const particles = Particles();
particles.group.position.set(0,0,0);
scene.add(particles.group);

function loadAnimation() {
    let i = 0;
    const interval = setInterval(() => {
        if (i <= 300) {
            particles.particles[i].circlePoints(i);
            i++;
        } else clearInterval(interval);
    }, 10);

}

let animation = true;
const animate = timestamp => {

    if(animation == true){
		loadAnimation();
        animation = false;
    }
    stats.begin();

    renderer.render(scene, camera);
    stats.end();
    requestAnimationFrame(animate);
};
animate();
