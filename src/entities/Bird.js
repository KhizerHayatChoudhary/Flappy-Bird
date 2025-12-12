import GameEntity from "./GameEntity.js";
import Animation from "../../lib/Animation.js";
import SoundName from "../enums/SoundName.js";
import { canvas, context, selectedBird,sounds } from "../globals.js";
import BirdTypeName from "../enums/BirdTypeName.js";

export default class Bird extends GameEntity {
    constructor(x, y) {
        super(x, y, 25.5, 18); // Width and height of bird sprite

        this.gravity = 0.2;
        this.lift = -6;
        this.velocity = 0;
        this.angle = 0; // Angle for tilting the bird
        this.color = selectedBird.color || BirdTypeName.YellowBird; // Selected bird color (default to yellowbird)

        this.isDying = false; // Dying state

        // Flapping animation using sprite names
        this.flapAnimation = new Animation(
            ["upflap", "midflap", "downflap"], // Animation frames
            0.1 // Switch frame every 0.1 seconds
        );
    }

    handleInput(input) {
        if (!this.isDying && input.isKeyPressed(" ")) {
            sounds.play(SoundName.Flap);
            this.velocity = this.lift; // Jump up
        }
    }

    update(dt, speedModifier = 1) {
        if (this.isDying) {
            this.velocity += this.gravity; // Apply gravity in dying state
            this.angle = Math.min(this.angle + 5, 90); // Gradually tilt downward
        } else {
            this.velocity += this.gravity * speedModifier;
            this.y += this.velocity * speedModifier;

            // Adjust tilt based on velocity
            if (this.velocity < 0) {
                this.angle = -25; // Tilt up when jumping
            } else {
                this.angle = Math.min(this.angle + 2, 45); // Gradually tilt down
            }

            // Update animation when not dying
            this.flapAnimation.update(dt);
        }

        // Prevent bird from going below the ground
        if (this.y > canvas.height - 50) {
            this.y = canvas.height - 50;
            this.die();
        }
    }

    render(images) {
        context.save();
        context.translate(this.x + this.width / 2, this.y + this.height / 2); // Translate to bird center
        context.rotate((Math.PI / 180) * this.angle); // Apply rotation
        context.translate(-this.width / 2, -this.height / 2);

        // Select correct sprite
        const spriteName = this.isDying
            ? `${this.color}downflap` // Dying state sprite
            : `${this.color}${this.flapAnimation.getCurrentFrame()}`;

        images.render(spriteName, 0, 0, this.width, this.height);
        context.restore();
    }

    die() {
        this.isDying = true; // Set bird to dying state
    }
    checkCollision(canvasHeight) {
		return this.y + this.height > canvasHeight - 50; // Ground collision
	}
}
