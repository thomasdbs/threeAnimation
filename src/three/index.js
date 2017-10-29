import * as THREE from 'three';
import TweenMax from 'gsap';
import threeOrbitControls from './utils/OrbitControls';
import Stats from 'stats.js';
import Particles from './particles';
import Lights from './lights';
import SliderTransition from './ball';
import './index.css';

const projectDetail = document.querySelector('#projectDetail');
const descriptionProjet = document.querySelector('#projectDescription');
const colorPlayer = document.querySelector('#colorPlayer');
const audio = document.querySelector('#music');
const audioPlayer = document.querySelector('#audioPlayer');
const next = document.querySelector('#next');
const previous = document.querySelector('#previous');
const accrocheProjet = document.querySelector('#accrocheProjet');
const competence = document.querySelector('.competence');
const nomProjet = document.querySelector('.nomProjet');
const iconeMenu = document.querySelector('#iconeMenu');
const menu = document.querySelector('.menu');
const menuContent = document.querySelector('.menu-content');
const projet1 = document.querySelector('.projet1');
const projet2 = document.querySelector('.projet2');
const projet3 = document.querySelector('.projet3');
const projet4 = document.querySelector('.projet4');
const projet5 = document.querySelector('.projet5');
const projet6 = document.querySelector('.projet6');
const projet7 = document.querySelector('.projet7');
const projet = document.querySelector('.projet');
const htmlBalise = document.querySelector('html');

let interval = null;
let numProjet = 1;

let animationParticles = null;

const projets = {
    '1': [
        'Ville de Nantes',
        "Galerie photos<br>Pont d'Orléans<br>+",
        "<h4>Test projet 1</h4><p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</p><h4>Test 2</h4><p>ceci est le deuxième test</p><p class='button'>FERMER</p>",
        "Galerie photos sur le pont d'Orléans"
    ],
    '2': [
        'Beer Pong responsable',
        "Jeu multi-screen<br>Prévention<br>+",
        "<h4>Test projet 2</h4><p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</p><h4>Test 2</h4><p>ceci est le deuxième test</p><p class='button'>FERMER</p>",
        "Jeu multi-screen mettant en avant les dangers de l'alcool"
    ]
};



//Variable qui définit si on ouvre ou ferme le menu
let touchableMenu = 'in';

//Code éxécuté lorsqu'on clique sur l'icone du menu
iconeMenu.onclick = () => {
    let delay=0;
    //Si on veut ouvrir le menu
    if (touchableMenu == 'in') {
        //Si on avait la description de l'article déroulée, on la referme
        if (descriptionProjet.style.display=='block') {
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
            competence.style.display='block';
            delay=3;
        }
        //On grossi la boule
        projectDetail.style.display = 'none';
        projectDescription.style.display = 'none';
        TweenMax.to(sliderTransition.group.position, 1.5+delay, {
            z: '38',
        });
        TweenMax.to(sliderTransition.group.rotation, 6.5+delay, {
            x: Math.PI,
            y: Math.PI,
            z: Math.PI,
        });
        //Quand la boule est grosse, on charge le menu
        const timeout1 = setTimeout(() => {
            menu.style.display='block';
            menu.style.opacity='1';
            nomProjet.innerHTML = "Menu";
        }, 1500+delay*1000);
        touchableMenu = 'out';
    }
    //Si on ferme le menu
    else {
        menu.style.display='none';
        menu.style.opacity='0';
        projectDetail.style.display = 'block';
        TweenMax.to(sliderTransition.group.position, 3, {
            z: '0',
        });
        nomProjet.innerHTML = projets[`${numProjet}`][0];
        accrocheProjet.style.display= 'block';
        accrocheProjet.innerHTML = projets[`${numProjet}`][1];
        descriptionProjet.innerHTML = projets[`${numProjet}`][2];
        touchableMenu = 'in';
    }

}



// Fonction appelée quand on clique sur un item du menu
projet1.onclick = () => { redirection(1); }
projet2.onclick = () => { redirection(2); }

//Fonction appelée quand on clique sur un item du menu, qui affiche le projet sélectionné
const redirection = num => {
    next.style.display='block';
    previous.style.display='block';
    numProjet = num;
    projectDetail.style.display = 'block';
    menu.style.display='none';
    menu.style.opacity='0';
    TweenMax.to(sliderTransition.group.position, 3, {
        z: '0',
    });
    nomProjet.innerHTML = projets[`${numProjet}`][0];
    accrocheProjet.style.display= 'block';
    accrocheProjet.innerHTML = projets[`${numProjet}`][1];
    descriptionProjet.innerHTML = projets[`${numProjet}`][2];
    touchableMenu = 'in';
    loadAnimation();
}

// Création du menu
let menuTitle = 1;
let menuDescription = 1;
document.querySelectorAll('.menuTitle').forEach(m => { m.innerHTML = projets[`${menuTitle}`][0]; menuTitle ++; });
document.querySelectorAll('.menuDescription').forEach(m => { m.innerHTML = projets[`${menuDescription}`][3]; menuDescription ++; });

let changeColor = 0;
colorPlayer.onclick = () => { (changeColor == 0) ? changeColor = 1 : changeColor = 0; }

nomProjet.innerHTML = projets[`${numProjet}`][0];
accrocheProjet.innerHTML = projets[`${numProjet}`][1];
descriptionProjet.innerHTML = projets[`${numProjet}`][2];

next.onclick = () => { numProjet++; colorBall(); }
previous.onclick = () => { numProjet--; colorBall(); }

const colorBall = () => {
    let delay=0;
    if (descriptionProjet.style.display=='block') {
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
        descriptionProjet.style.display='none';
        competence.style.display='block';
        descriptionProjet.style.opacity=0;
        touchableProject = true;
        delay=3;
    }
    const sliderTransition = SliderTransition();
    scene.add(sliderTransition.group);
    TweenMax.to(sliderTransition.group.position, 3+delay, {
        z: '38',
    });
    TweenMax.to(sliderTransition.group.rotation, 6.5+delay, {
        x: Math.PI,
        y: Math.PI,
        z: Math.PI,
    });
    TweenMax.to(sliderTransition.group.position, 3+delay, {
        z: '0',
    }).delay(3.5+delay);
    const timeout1 = setTimeout(() => {
        nomProjet.innerHTML = projets[`${numProjet}`][0];
        accrocheProjet.innerHTML = projets[`${numProjet}`][1];
        descriptionProjet.innerHTML = projets[`${numProjet}`][2];
    }, 3000+delay*1000);
    const timeout2 = setTimeout(() => {
        scene.remove(sliderTransition.group);
    }, 6000+delay*1000);
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


const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

//Scene
const scene = new THREE.Scene();

//Lumiere ambiante
const light = new THREE.AmbientLight(0xE7E7E7);
scene.add(light);

let sliderTransition = SliderTransition();
scene.add(sliderTransition.group);

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
            x: '2',
            y: '-25',
            z: '100',
        });
        TweenMax.to(projectDetail, 3, {
            marginTop: '+=10%',
        });
        TweenMax.to(descriptionProjet, 3, {
            opacity: '1',
        });
        TweenMax.to(colorPlayer, 3, {
            top: '50px',
        });
        descriptionProjet.style.display='block';
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
        descriptionProjet.style.display='none';
        competence.style.display='block';
        descriptionProjet.style.opacity=0;
        touchableProject = true;
    }

}

// controls
// const controls = new OrbitControls(camera, renderer.domElement);


const particles = Particles();
particles.group.position.set(0,0,0);
scene.add(particles.group);

animationParticles = () => {
    let intervalParticles = 0;

    interval = setInterval(() => {
        if (intervalParticles <= 300) {
            particles.particles[intervalParticles].circlePoints(intervalParticles);
            intervalParticles++;
        } else clearInterval(interval);
    }, 10);
}

let hsl = 0;
let animation = true;
const animate = timestamp => {

    if(animation == true){
        animationParticles();
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
