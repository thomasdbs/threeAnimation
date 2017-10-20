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
		const size = Math.random();
		const up = new THREE.Mesh(geometry(size), material(0xFFFFFF));
		// const angle = Math.PI*2;
		// const minCircle = 20;
		// const maxCircle = 40;
		// const radius = minCircle + Math.random() * (maxCircle - minCircle);
		// const test = Math.random() * angle;
		this.group.add(up);
		// this.group.position.set(Math.cos(test)*radius, Math.sin(test)*radius, Math.random()*4);
		this.group.position.set(this.randomNumberExcluding(-100,100,-50,50), this.randomNumberExcluding(-60,60,-30,30), Math.random()*2);
	}

	randomNumberExcluding(min, max, minExcluded, maxExcluded) {
		const num = Math.floor(Math.random() * (max - min + 1)) + min;
		return (num >= minExcluded && num <= maxExcluded) ? this.randomNumberExcluding(min, max, minExcluded, maxExcluded) : num;
	}

	circlePoints() {
    const angle = Math.random() * Math.PI * 2;
    const minCircle = 20;
    const maxCircle = 50;
    const radius = minCircle + Math.random() * (maxCircle - minCircle);

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
    }).delay(8);
	TweenMax.to(this.group.position, 5, {
        x: () => {
            return Math.cos(angle) * maxCircle;
        },
        y: () => {
            return Math.sin(angle) * maxCircle;
        },
    }).delay(16);
	TweenMax.to(this.group.position, 5, {
        x: () => {
            return Math.cos(angle) * radius;
        },
        y: () => {
            return Math.sin(angle) * radius;
        },
    }).delay(24);
}

}

export default () => {
	const group = new THREE.Group();
	const particles = [];
	for (let i = 0; i <= 400; i++) {
		const p = new Particle();
		particles.push(p);
		group.add(p.group);
	}
	return { group, particles };
};
