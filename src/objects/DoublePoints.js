import PowerUp from "./PowerUps.js";
import ImageName from "../enums/ImageName.js";

export default class DoublePoints extends PowerUp {
    constructor(x, y) {
        super(x, y, ImageName.DoublePoints); // Use a specific image name "doublePoints"
    }

    activate(state) {
        state.doublePointsActive = true; // Activate double points
        state.doublePointsTimer = 2; // Duration: 2 seconds
        
    }
}