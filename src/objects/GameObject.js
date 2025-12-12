export default class GameObject {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.movementOfPipesEveryUpdate = 2;
	}

	update() {
		// Default update for GameObjects (e.g., pipes move left)
		this.x -= this.movementOfPipesEveryUpdate;
	}

	render(images, spriteName) {
		images.render(spriteName, this.x, this.y);
	}
}
