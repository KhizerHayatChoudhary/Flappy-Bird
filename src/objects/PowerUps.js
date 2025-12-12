import GameObject from "./GameObject.js";
import PlayState from "../states/PlayState.js";

export default class PowerUps extends GameObject {
    constructor(x, y,imageName) {
        super(x, y, 24, 24); // 24x24 is measurements of sprite for powerup
        this.imageName = imageName;
    }



    checkCollision(bird) {
		
			if(bird.x < this.x + this.width &&
			bird.x + bird.width > this.x &&
			(bird.y < this.y || bird.y + bird.height > this.y + this.gap))
            {
                return true;
            }
            return false;
		
	}
    render(images) {
        super.render(images, this.imageName); // Render using the default "bike" sprite
    }

    update() {
        super.update(); // Reuse the movement logic from GameObject
    }
}
