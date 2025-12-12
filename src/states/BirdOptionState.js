import State from "../../lib/State.js";
import { context, canvas, stateMachine,input,images,selectedBird ,currentBackground,toggleBackground} from "../globals.js";
import GameStateName from "../enums/GameStateName.js";
import BirdTypeName from "../enums/BirdTypeName.js";
import ImageName from "../enums/ImageName.js";
import BirdColorName from "../enums/BirdColorName.js";


export default class BirdOptionState extends State {
	constructor() {
		super();
		this.birdOptions = [BirdTypeName.BlueBird, BirdTypeName.RedBird, BirdTypeName.YellowBird];
        this.colors= [BirdColorName.Blue,BirdColorName.Red,BirdColorName.Yellow];
        this.currentSelection = 0;
        this.selectionBoxX=8;
        this.selectionBoxy=12;
        
	}   

	render() {
        images.render(currentBackground, 0, 0, canvas.width, canvas.height);
		context.fillStyle = this.colors[this.currentSelection];

        // for the top section
		context.font = "Bold 52px FlappyBirdy";
		context.textAlign = "center";
        context.fillText(`PICK YOUR BIRD`, 150, 130);

        //for the bottom section
        context.font = "Bold 26px FlappyBirdy";
        context.fillText(`PRESS ENTER TO SELECT`, 150, 330);
        context.fillText(`PRESS T TO GO TO TITLE SCREEN`, 150, 360);
        context.fillText(`PRESS I TO GO TO INFORMATION SCREEN`, 150, 390);

        //to display the birds
        this.birdOptions.forEach((bird, index) => {
            const xPosition = (canvas.width / 4) * (index + 1);
            const yPosition = canvas.height / 2;
            if (index === this.currentSelection) {
                context.strokeStyle = this.colors[this.currentSelection]; // Highlight selected bird
                context.lineWidth = 4;
                context.strokeRect(xPosition - this.selectionBoxX, yPosition - this.selectionBoxy, 40, 40); // Draw a box
            }
            images.render(bird, xPosition, yPosition);
        });
		
		
		
	}

	update() {
        if (input.isKeyPressed("C") || input.isKeyPressed("c")) {
            toggleBackground(); // Toggle background
        }
        if (input.isKeyPressed("ArrowRight")) {
            this.currentSelection = (this.currentSelection + 1) % this.birdOptions.length;
        } else if (input.isKeyPressed("ArrowLeft")) {
            this.currentSelection =
                (this.currentSelection - 1 + this.birdOptions.length) % this.birdOptions.length;
        }

        // Confirm selection with Enter
        if (input.isKeyPressed("Enter")) {
            selectedBird.color = this.birdOptions[this.currentSelection];
            stateMachine.selectedBird = selectedBird; // Save selection globally
            stateMachine.change(GameStateName.TitleScreen);
        }
		if (input.isKeyPressed("T") || input.isKeyPressed("t")) {
			stateMachine.change(GameStateName.TitleScreen);
		}
        if (input.isKeyPressed("i") || input.isKeyPressed("I")) {
			stateMachine.change(GameStateName.InformationScreen);
		}
        if (input.isKeyPressed("H") || input.isKeyPressed("h")) {
            stateMachine.change(GameStateName.Help);
        }

        
	}
}