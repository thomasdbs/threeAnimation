import * as THREE from 'three';
import TweenMax from 'gsap';
import threeOrbitControls from './utils/OrbitControls';
import Stats from 'stats.js';
import Particles from './particles';
import Lights from './lights';
import './index.css';

const projectDetail = document.querySelector('#projectDetail');
const projectDescription = document.querySelector('#projectDescription');
const colorPlayer = document.querySelector('#colorPlayer');
const audio = document.querySelector('#music');
const audioPlayer = document.querySelector('#audioPlayer');
const competence = document.querySelector('.competence');


let changeColor = 0;
colorPlayer.onclick = () => {
    (changeColor == 0) ? changeColor = 1 : changeColor = 0;
}


audio.play();
audioPlayer.onclick = () => {
    if(!audio.paused) {
        audio.pause();
        audioPlayer.classList.remove("soundPlaying");
    }else {
        audio.play();
        audioPlayer.classList.add("soundPlaying");
    }
}

// attach orbit controls to THREE
// const OrbitControls = threeOrbitControls(THREE);

// stats
// const stats = new Stats();
// document.body.appendChild(stats.domElement);

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

let touchableProject = true;
projectDetail.style.width=`80%`;
projectDetail.style.marginLeft=`10%`;
projectDetail.style.marginRight=`10%`;
projectDetail.style.left=`0`;
projectDetail.onclick = () => {

    if (touchableProject == true) {
        TweenMax.to(camera.position, 3, {
            x: '0',
            y: '-25',
            z: '100',
        });
        TweenMax.to(projectDetail, 3, {
            marginTop: '+=10%',
        });
        TweenMax.to(projectDescription, 3, {
            opacity: '1',
        });
        TweenMax.to(colorPlayer, 3, {
            top: '50px',
        });
        projectDescription.style.display='block';
        competence.style.display='none';
        touchableProject = false;
    }else {
        TweenMax.to(camera.position, 3, {
            x: '0',
            y: '0',
            z: '50',
        });
        TweenMax.to(projectDetail, 3, {
            marginTop: '-50px',
        });
        colorPlayer.style.top='auto';
        colorPlayer.style.bottom='30px';
        projectDescription.style.display='none';
        competence.style.display='block';
        projectDescription.style.opacity=0;
        touchableProject = true;
    }

}

// controls
// const controls = new OrbitControls(camera, renderer.domElement);


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

let hsl = 0;
let animation = true;
const animate = timestamp => {

    if(animation == true){
        loadAnimation();
        animation = false;
    }

    if (changeColor == 1) {
        document.querySelectorAll('.white').forEach(c => {
            c.style.color = `hsl(${hsl},50%,70%)`;
        });
    }else {
        document.querySelectorAll('.white').forEach(c => {
            c.style.color = `hsl(${hsl},100%,100%)`;
        });
    }

    if (hsl <=360) {
        document.querySelector('.psoload .center').style.borderColor=`hsl(${hsl},50%,80%)`;
        hsl+=0.5;
    }else {
        hsl = 0;
    }
    // stats.begin();

    renderer.render(scene, camera);
    // stats.end();
    requestAnimationFrame(animate);
};
animate();
