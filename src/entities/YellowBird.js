import Bird from "./Bird.js";
import SoundName from "../enums/SoundName.js";
import { sounds } from "../globals.js";

export default class YellowBird extends Bird {
    constructor(x, y) {
        super(x, y);
        this.gravity = 0.2; // Default gravity
        this.lift = -6; // Default lift
        this.recoveryBoost = -7; // Stronger upward boost
    }

    handleInput(input) {
        if (input.isKeyPressed(" ")) {
            sounds.play(SoundName.Flap);
            this.velocity = this.recoveryBoost; // Stronger boost upward
        }
        
    }

    update(dt, speedModifier = 1) {
        
        super.update(dt, speedModifier); // Maintain base behavior
    }
}