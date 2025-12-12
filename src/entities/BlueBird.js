import Bird from "./Bird.js";
import SoundName from "../enums/SoundName.js";
import { sounds } from "../globals.js";
import ImageName from "../enums/ImageName.js";

export default class BlueBird extends Bird {
    constructor(x, y) {
        super(x, y);
        this.baseGravity=0.25;
        this.gravity = this.baseGravity; // Higher gravity for challenge
        this.glideDuration = 1; // Glide lasts for 2 seconds
        this.glideTimer = 0; // Timer for active glide duration
        this.glideActive = false; // Flag to indicate glide mode
        this.lift=-6;
        this.glideCooldown = 3; // Cooldown duration in seconds
        this.cooldownTimer = 0; // Timer to track cooldown
        this.GlidingDownSpeed=0.1;
        
    }

    handleInput(input) {
        if (
            (input.isKeyPressed("G") ||input.isKeyPressed("g")) && // Glide key pressed
            this.glideTimer <= 0 &&    // Glide not active
            this.cooldownTimer <= 0    // Cooldown complete
        ) {
            this.glideActive = true; // Activate glide
            this.glideTimer = this.glideDuration; // Set glide duration
            this.cooldownTimer = this.glideCooldown; // Start cooldown
            
        }

        if (input.isKeyPressed(" ")) {
            sounds.play(SoundName.Flap);
            this.velocity = this.lift; // Normal lift input
            this.gravity=this.baseGravity;
            if(this.glideActive){
                this.glideActive = false;
            this.cooldownTimer = this.glideCooldown;
            this.glideTimer = 0; 
            }
            
        }
    }

    update(dt, speedModifier = 1) {
        if (this.glideActive) {
            this.gravity = 0; // Disable gravity during glide
            this.velocity = this.GlidingDownSpeed; // Stop vertical movement
            this.glideTimer -= dt;

            if (this.glideTimer <= 0) {
                this.glideActive = false; // End glide
                this.gravity = this.baseGravity; // Restore gravity
   
            }
        }

        // Manage cooldown timer
        if (this.cooldownTimer > 0) {
            this.cooldownTimer -= dt;
        }

        super.update(dt, speedModifier); // Call parent update method
    }

    render(images, spriteName) {
        
        if(this.cooldownTimer > 0  ){
            
            images.render(ImageName.HourGlass, 10,  10, 25, 25);
        }
        super.render(images, spriteName); // Render the bird sprite

    }
}
