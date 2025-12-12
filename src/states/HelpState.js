import State from "../../lib/State.js";
import { context,sounds, canvas, input, images, stateMachine, currentBackground, toggleBackground,selectedBird } from "../globals.js";
import GameStateName from "../enums/GameStateName.js";
import BirdColorName from "../enums/BirdColorName.js";
import BirdTypeName from "../enums/BirdTypeName.js";
import SoundName from "../enums/SoundName.js";

export default class HelpState extends State {
    constructor() {
        super();
        this.textColor="black";
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
        // Render the dynamic background
        images.render(currentBackground, 0, 0, canvas.width, canvas.height);

        // Title
        //this.updateTextColor();
        context.fillStyle = this.textColor;
        context.strokeStyle = "#000"; // Black outline
        context.lineWidth = 5; // Outline thickness
        context.font = "bold 64px FlappyBirdy";
        context.textAlign = "center";
        
        context.fillText("HELP MENU", canvas.width / 2, 50);

        // Instructions
        context.font = "Bold 12px Arial";
        context.textAlign = "left";
        
      //  context.strokeText("- Press 'C' to toggle day/night theme", 20, 120);
     //   context.strokeText("- Press 'I' to open the information page", 20, 160);
      //  context.strokeText("- Press 'B' to open the bird selection menu", 20, 200);
      //  context.strokeText("- Press 'SPACE' at title screen to start game", 20, 240);
      //  context.strokeText("- Press 'T' to return to the title screen", 20, 280);
       // context.strokeText("- Press 'H' to open help menu", 20, 320);

        context.fillText("- Press 'C' to toggle day/night theme", 20, 120);
        context.fillText("- Press 'P' to pause the game during gameplay", 20, 160);
        context.fillText("- Press 'I' to open the information page", 20, 200);
        context.fillText("- Press 'B' to open the bird selection menu", 20, 240);
        context.fillText("- Press 'SPACE' at title screen to start game", 20, 280);
        context.fillText("- Press 'T' to return to the title screen", 20, 320);
        context.fillText("- Press 'H' to open help menu", 20, 360);

    }

    update() {
        // Toggle background if 'C' is pressed
        if (input.isKeyPressed("C") || input.isKeyPressed("c")) {
            toggleBackground();
        }

        // Return to Title Screen if 'T' is pressed
        if (input.isKeyPressed("T") || input.isKeyPressed("t")) {
            stateMachine.change(GameStateName.TitleScreen);
        }
        
        if (input.isKeyPressed("b") || input.isKeyPressed("B")) {
            stateMachine.change(GameStateName.BirdOption);
        }
        
        if (input.isKeyPressed("I") || input.isKeyPressed("i")) {
            stateMachine.change(GameStateName.InformationScreen);
        }
        
    }
}