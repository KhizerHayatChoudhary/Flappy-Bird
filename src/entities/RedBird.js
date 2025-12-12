import Bird from "./Bird.js";
import { context, canvas, stateMachine,input,images,selectedBird,sounds } from "../globals.js";
import SoundName from "../enums/SoundName.js";
import ImageName from "../enums/ImageName.js";

export default class RedBird extends Bird {
    constructor(x, y) {
        super(x, y);
        this.gravity = 0.3; // Harder difficulty: Higher gravity
        this.lift = -6; // Weaker upward lift
        this.dashSpeed = 50; // Forward dash effect (distance)
        this.dashCooldown = 3; // Cooldown duration (in seconds)
        this.dashTimer = 0; // Timer to track cooldown
    }

    handleInput(input) {
        // To Activate dash , if press D and if the cooldown is done
        if ((input.isKeyPressed("D") || input.isKeyPressed("d")) && this.dashTimer <= 0) {
            this.triggerDashEffect();
            this.dashTimer = this.dashCooldown; 
            sounds.play(SoundName.Dash);
        }

        // Normal jump movement
        if (input.isKeyPressed(" ")) {
            sounds.play(SoundName.Flap);
            this.velocity = this.lift;
        }
    }

    update(dt, speedModifier = 1) {
        if (this.dashTimer > 0) {
            this.dashTimer -= dt; // Countdown dash cooldown
        }

        super.update(dt, speedModifier); // Maintain base behavior
    }

    triggerDashEffect() {
        // Access game objects (pipes and power-ups)
        const gameObjects = window.gameObjects || [];

        // Shift each object 50 pixels to the left in game object
        gameObjects.forEach((object) => {
            object.x -= this.dashSpeed;
        });

    }
    render(images, spriteName) {
        
        if(this.dashTimer > 0  ){
            
            images.render(ImageName.HourGlass, 10,  10, 25, 25);
        }
        super.render(images, spriteName); // Render the bird sprite

    }
}