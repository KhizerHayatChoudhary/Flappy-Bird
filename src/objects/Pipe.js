import GameObject from "./GameObject.js";
import { canvas } from "../globals.js";
import ImageName from "../enums/ImageName.js";

export default class Pipe extends GameObject {
	constructor(x, y, gap) {
		super(x, y, 27, 300); // Width and height of pipe
		this.gap = gap; // Space between top and bottom pipes
	}

	isOffScreen() {
		return this.x + this.width < 0;
	}

	checkCollision(bird) {
		return (
			bird.x < this.x + this.width &&
			bird.x + bird.width > this.x &&
			(bird.y < this.y || bird.y + bird.height > this.y + this.gap)
		);
	}

	render(images) {
		 // Draw top pipe by tiling from the pipe's top position upward
        for (let y = this.y - this.height; y > -this.height; y -= this.height) {
            images.render(ImageName.PipeTop, this.x, y);
        }

    // Draw bottom pipe by tiling from the pipe's bottom position downward
        for (let y = this.y + this.gap; y < canvas.height; y += this.height) {
            images.render(ImageName.PipeBottom, this.x, y);
        }
	}
}