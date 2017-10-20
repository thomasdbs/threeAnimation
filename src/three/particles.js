import * as THREE from 'three';
import TweenMax from 'gsap';

const material = color => new THREE.MeshPhongMaterial({
	color: color,
	side: THREE.DoubleSide,
	emissive: 0x000000,
	specular: 0xffffff,
	flatShading: true,
	transparent: true,
});

const geometry = radius => new THREE.SphereGeometry(radius, 8, 6);

class Particle {
	constructor() {
		this.group = new THREE.Group();
		const size = Math.random()/3+0.1;
		const up = new THREE.Mesh(geometry(size), material(0xFFFFFF));
		this.group.add(up);
		this.group.position.set(this.randomNumberExcluding(-50,50,-20,20), this.randomNumberExcluding(-30,30,-10,10), Math.random()*2);
	}

	randomNumberExcluding(min, max, minExcluded, maxExcluded) {
		const num = Math.floor(Math.random() * (max - min + 1)) + min;
		return (num >= minExcluded && num <= maxExcluded) ? this.randomNumberExcluding(min, max, minExcluded, maxExcluded) : num;
	}

	circlePoints(num) {
    const angle = Math.random() * Math.PI * 2;
    const minCircle = 15;
    const maxCircle = 35;
    const radius = minCircle + Math.random() * (maxCircle - minCircle);
	let delay = 8;

    TweenMax.to(this.group.position, 5, {
        x: () => {
            return Math.cos(angle) * radius;
        },
        y: () => {
            return Math.sin(angle) * radius;
        },
    });
	TweenMax.to(this.group.position, 5, {
        x: () => {
            return Math.cos(angle) * minCircle;
        },
        y: () => {
            return Math.sin(angle) * minCircle;
        },
    }).delay(delay);
	TweenMax.to(this.group.position, 5, {
        x: () => {
            return Math.cos(angle) * maxCircle;
        },
        y: () => {
            return Math.sin(angle) * maxCircle;
        },
    }).delay(delay*2);
	TweenMax.to(this.group.position, 5, {
        x: () => {
            return Math.cos(angle) * radius;
        },
        y: () => {
            return Math.sin(angle) * radius;
        },
    }).delay(delay*3);

	if (num%2 == 0) {
		TweenMax.to(this.group.position, 5, {
	        x: () => {
	            return Math.cos(angle) * minCircle;
	        },
	        y: () => {
	            return Math.sin(angle) * minCircle;
	        },
	    }).delay(delay*4);
	}else {
		TweenMax.to(this.group.position, 5, {
	        x: () => {
	            return Math.cos(angle) * maxCircle;
	        },
	        y: () => {
	            return Math.sin(angle) * maxCircle;
	        },
	    }).delay(delay*4);
	}

}

}

export default () => {
	const group = new THREE.Group();
	const particles = [];
	for (let i = 0; i <= 300; i++) {
		const p = new Particle();
		particles.push(p);
		group.add(p.group);
	}
	return { group, particles };
};
