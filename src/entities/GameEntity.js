export default class GameEntity {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.velocity = 0;
		this.gravity = 0;
		this.lift = 0;
	}

	update(dt,speedModifier =1) {
		this.velocity += this.gravity * speedModifier;
    	this.y += this.velocity * speedModifier;
	}

	render(images, spriteName) {
		images.render(spriteName, this.x, this.y);
	}
}