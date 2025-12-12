import State from "../../lib/State.js";
import Bird from "../entities/Bird.js";
import { images, input, stateMachine, canvas, context, timer, selectedBird,currentBackground,toggleBackground,sounds } from "../globals.js";
import GameStateName from "../enums/GameStateName.js";
import Easing from "../../lib/Easing.js";
import ImageName from "../enums/ImageName.js";
import BirdTypeName from "../enums/BirdTypeName.js";
import BirdColorName from "../enums/BirdColorName.js";
import SoundName from "../enums/SoundName.js";



export default class TitleScreenState extends State {
    constructor() {
        super();
        this.groundX = 0; // Starting position of the ground
        this.groundWidth = canvas.width; // Store the canvas width for seamless scrolling
        this.textColor="black";
        this.themesongPlaying=false;
    }

    enter() {
        this.startGroundTween();
        if(!this.themesongPlaying){
            sounds.play(SoundName.Theme);
            this.themesongPlaying=true;
        }
        
    }

    startGroundTween() {
        timer.tween(
            this,
            { groundX: -this.groundWidth }, // Move ground to the left
            5, // Duration in seconds
			Easing.linear, // Use the Easing.linear function instead of null
			() => {
				// Reset position after tween finishes for seamless loop
				this.groundX = 0;
				this.startGroundTween(); // Restart the tween for continuous movement
			}
        );
    }

    update() {
        if (input.isKeyPressed("C") || input.isKeyPressed("c")) {
            toggleBackground(); // Toggle background
        }
        if (input.isKeyPressed("b") || input.isKeyPressed("B")) {
            stateMachine.change(GameStateName.BirdOption);
        }
        if (input.isKeyPressed(" ")) {
            sounds.stop(SoundName.Theme);
            this.themesongPlaying=false;
            stateMachine.change(GameStateName.Transition, {
                fromState: this,
                toState: stateMachine.states[GameStateName.Play],
            });
            
        }
        if (input.isKeyPressed("I") || input.isKeyPressed("i")) {
            stateMachine.change(GameStateName.InformationScreen);
        }
        if (input.isKeyPressed("H") || input.isKeyPressed("h")) {
            stateMachine.change(GameStateName.Help);
            
        }
    }
    updateTextColor(){
        if(selectedBird.color==BirdTypeName.YellowBird){
            this.textColor = BirdColorName.Yellow;   
        }else if(selectedBird.color==BirdTypeName.Blue){
            
            this.textColor = BirdColorName.Blue;
        }else if(selectedBird.color==BirdTypeName.Red){
            this.textColor = BirdColorName.Red;
        }
    }

    render() {
        
        images.render(currentBackground, 0, 0, canvas.width, canvas.height);
        //this.updateTextColor();
        
        // Render ground twice for seamless scrolling
        images.render(ImageName.Ground, this.groundX, canvas.height - 50, canvas.width, 50);
        images.render(ImageName.Ground, this.groundX + this.groundWidth, canvas.height - 50, canvas.width, 50);
        images.render(ImageName.MainMenu, 0, 0, 300, canvas.height - 190);
        images.render(selectedBird.color, canvas.width / 2 - 22, canvas.height / 2 + 61, 49, 35);
        
		context.font = "bold 18px Arial";
        context.strokeStyle = "#000"; // Black outline
        context.lineWidth = 5; // Outline thickness
        context.fillStyle="black";
        
        context.textAlign = "center";
		//context.strokeText('"H" for Help', canvas.width / 2 , canvas.height / 2 + 170);
        context.fillText('"H" for Help', canvas.width / 2 , canvas.height / 2 + 170);
        //context.strokeText('"Space" to Start', canvas.width / 2, canvas.height / 2 + 201);
        context.fillText('"Space" to Start', canvas.width / 2, canvas.height / 2 + 201);
        	
    }
}
