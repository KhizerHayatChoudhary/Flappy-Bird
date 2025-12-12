import State from "../../lib/State.js";
import { context, canvas, stateMachine, input, images ,currentBackground,toggleBackground} from "../globals.js";
import GameStateName from "../enums/GameStateName.js";
import BirdTypeName from "../enums/BirdTypeName.js";
import ImageName from "../enums/ImageName.js";
import PowerUpName from "../enums/PowerUpName.js";
import BirdColorName from "../enums/BirdColorName.js";

export default class InformationScreenState extends State {
    constructor() {
        super();
        this.birdOptions = [BirdTypeName.YellowBird,BirdTypeName.BlueBird,BirdTypeName.RedBird ];
        this.birdDescriptions = [
            "Easy difficulty bird. Gravity: 100%\nPoints per pipe: 1\nAbility: Quick Recovery - Stronger upward lift on tap.", // Yellow Bird
            "Medium difficulty bird. Gravity: 125%\nPoints per pipe: 2\nAbility: Glide - Hold 'G' to glide for 2 secs.\n(cooldown 3s)",   // Blue Bird
            "Hard difficulty bird. Gravity: 150%\nPoints per pipe: 3\nAbility: Dash - Press 'D' to dash forward.\n(cooldown 3s)" // Red Bird
             
        ];
        this.powerUpOptions = [PowerUpName.Invincible, PowerUpName.DoublePoints, PowerUpName.SlowMotion];
        this.powerUpDescriptions = [
            "Invincibility: Pass through pipes safely for 3 secs.",
            "Double Points: Double your score for 2 secs.",
            "Slow Motion: Slow down the game for 3 secs."
        ];
        this.colors = [BirdColorName.Yellow,BirdColorName.Blue, BirdColorName.Red ];
        this.currentSelection = 0; // Used to display birds sequentially
    }

    render() {
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear screen
        images.render(currentBackground, 0, 0, canvas.width, canvas.height);

        // Title and instructions
        context.fillStyle = "Black";
        context.font = "bold 32px FlappyBirdy";
        context.textAlign = "center";
        context.fillText(`BIRD AND POWER-UP INFORMATION`, canvas.width / 2, 50);


        // Render Bird Information
        this.renderBirdInformation();

        // Render Power-Up Information
        this.renderPowerUpInformation();
    }

    renderBirdInformation() {
        const startY = 80; // Starting Y-coordinate for bird section
        const birdX = 15; // X-coordinate for bird images
        const infoX = 70; // X-coordinate for text descriptions

        context.font = "bold 10px Arial";
        context.textAlign = "left";

        for (let i = 0; i < this.birdOptions.length; i++) {
            // Render bird images
            images.render(this.birdOptions[i], birdX, startY + i * 70, 50, 40);

            // Render bird descriptions next to the images
            context.fillStyle = this.colors[i];
            const lines = this.birdDescriptions[i].split("\n"); // Split description into lines
            lines.forEach((line, index) => {
                context.fillText(line, infoX, startY + i * 70 +10 + index * 15);
            });
        }
    }

    renderPowerUpInformation() {
        const startY = 300; // Y-coordinate for power-up section
        const powerUpX = 15; // X-coordinate for power-up images
        const infoX = 70; // X-coordinate for text descriptions

        context.font = "bold 9px Arial";
        context.textAlign = "left";

        for (let i = 0; i < this.powerUpOptions.length; i++) {
            // Render power-up images
            images.render(this.powerUpOptions[i], powerUpX, startY + i * 50, 40, 40);

            // Render power-up descriptions next to the images
            context.fillStyle = "black";
            context.fillText(this.powerUpDescriptions[i], infoX, startY + i * 50 + 25);
        }
    }

    update() {
        if (input.isKeyPressed("C") || input.isKeyPressed("c")) {
            toggleBackground(); // Toggle background
        }
        // Return to Title Screen
        if (input.isKeyPressed("T") || input.isKeyPressed("t")) {
            stateMachine.change(GameStateName.TitleScreen);
        }
        if (input.isKeyPressed("b") || input.isKeyPressed("B")) {
            stateMachine.change(GameStateName.BirdOption);
        }
        if (input.isKeyPressed("H") || input.isKeyPressed("h")) {
            stateMachine.change(GameStateName.Help);
        }
        
    }
    }
