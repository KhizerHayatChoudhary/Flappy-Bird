import PowerUp from "./PowerUps.js";
import ImageName from "../enums/ImageName.js";

export default class SlowMotion extends PowerUp {
    constructor(x, y) {
        super(x, y, ImageName.SlowMotion); 
        this.decreaseSpeedByPercent = 0.5; // Slow game to 50% of normal speed
        this.durationSlowMotion = 3; // lasts for 3 seconds
    }

    activate(state) {
        state.slowMotionActive = true; // Activate slow motion
        state.slowMotionTimer = this.durationSlowMotion; 

        // Reduce game speed 
        state.gameSpeedModifier = this.decreaseSpeedByPercent; 
        
    }
}