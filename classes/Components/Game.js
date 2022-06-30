class Game {
	constructor() {
		this.pixelSize = 4;
		this.updateRate = 1000 / 60;
		this.objects = new Set();
	}

	getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}

class gameObject {
	constructor({ game, html, data }) {
		this.game = game;
		this.html = html;
		this.element = document.createElement("div");
		this.hasCollision = data?.hasCollision || false;
		this.destructable = data?.destructable || false;
		this.sprite = data?.sprite || false;
		this.position = data?.position || { x: 0, y: 0 };
		this.velocity = data?.velocity || { x: 0, y: 0 };
		this.size = data?.size || { x: 0, y: 0 };
	}

	renderElement() {
		document.getElementById(this.html?.parent || "map").append(this.element);
	}

	loadEvents() {
		this.onLoad?.();

		if (typeof this.onUpdate === "function") {
			setInterval(() => this.onUpdate(), Game.updateRate);
		}

		if (typeof this.onAnimation === "function") {
			const iteration = () => {
				this.onAnimation();
				window.requestAnimationFrame(iteration);
			};

			iteration();
		}
	}
}

class Entity extends gameObject {
	constructor({ game, html, data }) {
		super({ game, html, data });
		this.stats = data?.stats || {};
	}

	onUpdate() {
		console.log(update);
	}
}

const game = new Game();
