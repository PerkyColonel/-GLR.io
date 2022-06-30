class Entity {
	constructor(Position) {
		this.position = Position == undefined ? { x: 0, y: 0 } : Position;
		this.velocity = { x: 0, y: 0 };
		this.size = { x: 16, y: 16 };
		this.loadEvents();
	}

	loadEvents() {
		setInterval(() => {
			this.onUpdate(), 1000 / 60;
		});

		if (typeof this?.onAnimate === "function") {
			const appel = () => {
				this?.onAnimate();
				window.requestAnimationFrame(appel);
			};

			appel();
		}
	}

	movePosition(duration = 1000) {
		let x = this.position.x;
		let y = this.position.y;
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		this.element.animate(
			[
				{ transform: `translate3d(${x}px, ${y}px, 0)` },
				{
					transform: `translate3d(${this.position.x}px, ${this.position.y}px, 0)`,
				},
			],
			{
				duration: duration,
				iterations: 1,
			}
		);
		this.element.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0)`;

		this.velocity.x = 0;
		this.velocity.y = 0;
	}
}

class Speler extends Entity {
	constructor() {
		super();
		this.jumpDelay = 0;
		this.jumpCooldown = 100;
		this.view = "right";
		this.element = document.createElement("div");
		this.className = "speler";
		this.keys = new Set();

		window.addEventListener("keydown", (e) => this.keys.add(e.key));
		window.addEventListener("keyup", (e) => this.keys.delete(e.key));

		this.initElement();
	}

	initElement() {
		this.element.className = this.className;
		this.renderElement();
	}

	renderElement() {
		document.getElementById("canvas").appendChild(this.element);
	}

	onUpdate() {
		if (this.keys.has("a")) {
			this.velocity.x--;
		}
		if (this.keys.has("s")) {
			this.velocity.y++;
		}
		if (this.keys.has("d")) {
			this.velocity.x++;
		}
		if (this.keys.has("w")) {
			this.velocity.y--;
		}
		if (this.keys.has(" ")) {
			if (this.jumpDelay <= 0) {
				this.movePosition(this.jumpCooldown);
				this.jumpDelay = this.jumpCooldown;
			}
		}
		this.jumpDelay--;
	}
}

const speler = new Speler();
