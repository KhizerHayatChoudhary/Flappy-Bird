import PowerUp from "./PowerUps.js";
import ImageName from "../enums/ImageName.js";

export default class Invincibility extends PowerUp {
    constructor(x, y) {
        super(x, y,ImageName.Invincible);
        this.invincibilityDuration = 3; // how many seconds power up lasts
        
    }

    activate(bird) {
        bird.isInvincible = true; // Grant invincibility
        bird.invincibilityTimer = this.invincibilityDuration; 
    }

    render(images) {
        // Render the invincibility-specific sprite (or reuse bike for now)
        super.render(images);
    }

    update() {
        // Specific update logic for Invincibility (if needed), else reuse PowerUp logic
        super.update();
    }


}