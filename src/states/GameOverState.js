import State from "../../lib/State.js";
import { context, canvas, stateMachine,input,images ,highScore,currentBackground,toggleBackground} from "../globals.js";
import GameStateName from "../enums/GameStateName.js";
import ImageName from "../enums/ImageName.js";

export default class GameOverState extends State {
	constructor() {
		super();
		this.score = 0;
		this.changed=false;
	}

	enter(parameters) {
		this.score = parameters.score;
		if (this.score > highScore.value) {
            highScore.value = this.score;
			this.changed=true;
        }else{
			this.changed=false;
		}
	}

	render() {
		context.clearRect(0, 0, canvas.width, canvas.height); // Clear the screen

        // Background
        images.render(currentBackground, 0, 0, canvas.width, canvas.height);

        // Game Over Text
        context.font = "bold 22px Arial";
        context.fillStyle = 'rgba(252,161,70,255)';
        context.textAlign = "center";
		images.render(ImageName.GameOver, canvas.width /6, canvas.height / 3 - 40);
        // Display Current Score
        context.font = "bold 22px Arial";
		context.strokeText(`Your Score: ${this.score}`, canvas.width / 2, canvas.height / 2);
        context.fillText(`Your Score: ${this.score}`, canvas.width / 2, canvas.height / 2);

        // Display High Score
		if(this.changed){
			context.strokeText(`NEW High Score: ${highScore.value}`, canvas.width / 2, canvas.height / 2 + 30);
			context.fillText(`NEW High Score: ${highScore.value}`, canvas.width / 2, canvas.height / 2 + 30);
			
		}else{
			context.strokeText(`High Score: ${highScore.value}`, canvas.width / 2, canvas.height / 2 + 30);
			context.fillText(`High Score: ${highScore.value}`, canvas.width / 2, canvas.height / 2 + 30);
		}
		context.strokeText("Press SPACE to Restart", canvas.width / 2, canvas.height / 2 + 80);
        context.fillText("Press SPACE to Restart", canvas.width / 2, canvas.height / 2 + 80);
		
	}

	update() {
		if (input.isKeyPressed("C") || input.isKeyPressed("c")) {
			toggleBackground(); // Toggle background
		}
        if (input.isKeyPressed(" ")) {
            stateMachine.change(GameStateName.Transition, {
                fromState: this,
                toState: stateMachine.states[GameStateName.TitleScreen],
            });
        }
		if (input.isKeyPressed("H") || input.isKeyPressed("h")) {
            stateMachine.change(GameStateName.Help);
        }
    }
}
