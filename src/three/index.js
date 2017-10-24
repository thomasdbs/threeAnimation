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

const projets = {
    '1': [
        'Projet1',
        "Création d'un site web<br>Awwwards<br>+",
        "<h4>Test projet 1</h4><p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</p><h4>Test 2</h4><p>ceci est le deuxième test</p><p class='button'>FERMER</p>"
    ],
    '2': [
        'Projet2',
        "Création d'un site web<br>2<br>+",
        "<h4>Test projet 2</h4><p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</p><h4>Test 2</h4><p>ceci est le deuxième test</p><p class='button'>FERMER</p>"
    ],
    '3': [
        'Projet3',
        "Création d'un site web<br>2<br>+",
        "<h4>Test projet 2</h4><p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</p><h4>Test 2</h4><p>ceci est le deuxième test</p><p class='button'>FERMER</p>"
    ],
    '4': [
        'Projet4',
        "Création d'un site web<br>2<br>+",
        "<h4>Test projet 2</h4><p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</p><h4>Test 2</h4><p>ceci est le deuxième test</p><p class='button'>FERMER</p>"
    ],
    '5': [
        'Projet5',
        "Création d'un site web<br>2<br>+",
        "<h4>Test projet 2</h4><p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</p><h4>Test 2</h4><p>ceci est le deuxième test</p><p class='button'>FERMER</p>"
    ],
    '6': [
        'Projet6',
        "Création d'un site web<br>2<br>+",
        "<h4>Test projet 2</h4><p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</p><h4>Test 2</h4><p>ceci est le deuxième test</p><p class='button'>FERMER</p>"
    ],
    '7': [
        'Projet7',
        "Création d'un site web<br>2<br>+",
        "<h4>Test projet 2</h4><p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</p><h4>Test 2</h4><p>ceci est le deuxième test</p><p class='button'>FERMER</p>"
    ]
};

let touchableMenu = 'in';
iconeMenu.onclick = () => {

    // console.log(projets.length);
    if (touchableMenu == 'in') {
        next.style.display='none';
        previous.style.display='none';
        menu.style.display='block';
        projet.style.opacity='0';
        htmlBalise.style.overflow='hidden';
        TweenMax.to(menu, 3, {
            opacity: '0.6',
        });
        touchableMenu = 'out';
    }else {
        next.style.display='block';
        previous.style.display='block';
        projet.style.opacity='1';
        htmlBalise.style.overflow='auto';
        htmlBalise.style.overflowX='hidden';
        TweenMax.to(menu, 3, {
            opacity: '0',
        });
        const timeout1 = setTimeout(() => {
            menu.style.display='none';
        }, 3000);
        touchableMenu = 'in';
    }
}

projet1.onclick = () => { redirection(1); }
projet2.onclick = () => { redirection(2); }
projet3.onclick = () => { redirection(3); }
projet4.onclick = () => { redirection(4); }
projet5.onclick = () => { redirection(5); }
projet6.onclick = () => { redirection(6); }
projet7.onclick = () => { redirection(7); }

const redirection = num => {
    next.style.display='block';
    previous.style.display='block';
    projet.style.opacity='1';
    htmlBalise.style.overflow='auto';
    htmlBalise.style.overflowX='hidden';
    TweenMax.to(menu, 3, {
        opacity: '0',
    });
    const timeout1 = setTimeout(() => {
        menu.style.display='none';
    }, 3000);
    touchableMenu = 'in';
    numProjet = num;
    nomProjet.innerHTML = projets[`${numProjet}`][0];
    accrocheProjet.innerHTML = projets[`${numProjet}`][1];
    descriptionProjet.innerHTML = projets[`${numProjet}`][2];
}

let changeColor = 0;
colorPlayer.onclick = () => {
    (changeColor == 0) ? changeColor = 1 : changeColor = 0;
}

nomProjet.innerHTML = projets[`${numProjet}`][0];
accrocheProjet.innerHTML = projets[`${numProjet}`][1];
descriptionProjet.innerHTML = projets[`${numProjet}`][2];

next.onclick = () => {
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
        z: '47',
    });
    TweenMax.to(sliderTransition.group.rotation, 6.5+delay, {
        x: Math.PI,
        y: Math.PI,
        z: Math.PI,
    });
    TweenMax.to(sliderTransition.group.position, 3+delay, {
        z: '0',
    }).delay(3.5+delay);
    numProjet++;
    const timeout1 = setTimeout(() => {
        nomProjet.innerHTML = projets[`${numProjet}`][0];
        accrocheProjet.innerHTML = projets[`${numProjet}`][1];
        descriptionProjet.innerHTML = projets[`${numProjet}`][2];
    }, 3000+delay*1000);
    const timeout2 = setTimeout(() => {
        scene.remove(sliderTransition.group);
    }, 6000+delay*1000);}

    previous.onclick = () => {
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
            z: '47',
        });
        TweenMax.to(sliderTransition.group.rotation, 6.5+delay, {
            x: Math.PI,
            y: Math.PI,
            z: Math.PI,
        });
        TweenMax.to(sliderTransition.group.position, 3+delay, {
            z: '0',
        }).delay(3.5+delay);
        numProjet--;
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

    function loadAnimation(value) {
        let i = 0;

        interval = setInterval(() => {
            if (value) {
                clearInterval(interval);
            }
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
