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
		this.group.position.set(this.randomNumberExcluding(-30,30,-10,10), this.randomNumberExcluding(-30,30,-10,10), Math.random()*4);
	}

	randomNumberExcluding(min, max, minExcluded, maxExcluded) {
		const num = Math.floor(Math.random() * (max - min + 1)) + min;
		return (num >= minExcluded && num <= maxExcluded) ? this.randomNumberExcluding(min, max, minExcluded, maxExcluded) : num;
	}

	move() {
		const angle = Math.PI*2;
		const minCircle = 20;
		const maxCircle = 40;
		const radius = minCircle + 1 * (maxCircle - minCircle);
		this.group.children.forEach(c => {
			TweenMax.to(c.position, 5, {
				x: () => {
					return Math.cos(angle)*radius;
				},
				y: () => {
					return Math.sin(angle)*radius;
				}
			});
		});
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
