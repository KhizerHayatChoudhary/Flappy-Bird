import State from "../../lib/State.js";
import Bird from "../entities/Bird.js";
import Pipe from "../objects/Pipe.js";
import { images, input, stateMachine, canvas, context,timer, selectedBird,sounds,currentBackground,toggleBackground } from "../globals.js";
import { getRandomPositiveInteger } from "../../lib/Random.js";
import GameStateName from "../enums/GameStateName.js";
import YellowBird from "../entities/YellowBird.js";
import BlueBird from "../entities/BlueBird.js";
import RedBird from "../entities/RedBird.js";
import Invincibility from "../objects/Invincibility.js";
import DoublePoints from "../objects/DoublePoints.js";
import SlowMotion from "../objects/SlowMotion.js";
import Easing from "../../lib/Easing.js";
import SoundName from "../enums/SoundName.js";
import BirdTypeName from "../enums/BirdTypeName.js";
import ImageName from "../enums/ImageName.js";
import BirdColorName from "../enums/BirdColorName.js";

export default class PlayState extends State {
    constructor() {
        super();
        this.birdTypes = [YellowBird, BlueBird, RedBird ];
        this.birdOptions = [ BirdTypeName.YellowBird,BirdTypeName.BlueBird,BirdTypeName.RedBird];
        this.bird = null;
        this.pipes = [];
        this.powerUps = [];
        this.pipeInterval = 120;
        this.pipeGap = 100;
        this.frame = 0;
        this.score = 0;
        this.gameOver = false;
        this.invincibility = false;
        this.invincibilityTimer = 0;
		this.doublePointsActive = false; // Track if double points is active
    	this.doublePointsTimer = 0;
		this.slowMotionActive = false; // Track if slow motion is active
    	this.slowMotionTimer = 0; // Timer for slow motion
    	this.gameSpeedModifier = 1;
        this.groundX = 0; // Ground position for scrolling
        this.groundWidth = canvas.width; // Canvas width for seamless rendering
        this.textColor="black";
        this.chanceOfPowerUp = 0.2;
    }

    enter() {
        this.initializeGame();
        this.startGroundTween();
        
        
    }

    initializeGame() {
        if(this.birdOptions[0]==selectedBird.color){
            const BirdClass = this.birdTypes[0];
            this.bird = new BirdClass(130, 220);
        }else if(this.birdOptions[1]==selectedBird.color){
            const BirdClass = this.birdTypes[1];        
            this.bird = new BirdClass(130, 220);
        }else{
            const BirdClass = this.birdTypes[2];    
            this.bird = new BirdClass(130, 220);
        }
        
        this.pipes = [];
        this.powerUps = [];
        this.frame = 0;
        this.score = 0;
        this.gameOver = false;
        this.invincibility = false;
        this.invincibilityTimer = 0;
		
    }
    startGroundTween() {
        
        timer.tween(
            this,
            { groundX: -this.groundWidth }, // Move the ground to the left
            5, // Duration in seconds
            Easing.linear,
            () => {
                
                // Reset position after tween finishes for seamless loop
                this.groundX = 0;
                this.startGroundTween(); // Restart for continuous scrolling
            }
        );
    }

    update(dt) {
        
        //is game started
        if (!this.gameStarted) {
            this.handleStartInput();
            return;
        }
        //checks if user wants to pause/unpause game
		if (input.isKeyPressed("P") || input.isKeyPressed("p")) {
			this.paused= !this.paused;
			return;
		}
        //checks if game is paused , if it is then leave method
		if(this.paused){
			return
		} 
        //checks if player died      		
        if (this.gameOver) {
            stateMachine.change(GameStateName.GameOver, { score: this.score });
            this.gameStarted = false;
            return;
        }
        
        this.bird.handleInput(input);
        this.bird.update(dt,this.gameSpeedModifier);
        this.UpdateTimersForPowerUps(dt);
        this.UpdatePowerUps();

        window.gameObjects = [...this.pipes, ...this.powerUps];

        if (this.bird.checkCollision(canvas.height)) {
            sounds.play(SoundName.Hit);
            this.gameOver = true;
			this.allPowerUpsOff();
        }        
        this.spawnPipes();
        this.updatePipes();
        this.checkCollisions();
    }
    //checks if bird collided with powerup or not
    UpdatePowerUps(){
        this.powerUps = this.powerUps.filter((powerUp) => {
			powerUp.update();
	
			// Check collision with the bird
			if (powerUp.checkCollision(this.bird)) {
				if (powerUp instanceof DoublePoints) {
					powerUp.activate(this); // Activate double points
				}
				if (powerUp instanceof Invincibility) {
					this.activateInvincibility(); // Activate invincibility
				}
				if (powerUp instanceof SlowMotion) {
					powerUp.activate(this); // Activate double points
				}
				return false; // Remove power-up after collision
			}
	
			// Keep the power-up if no collision
			return true;
		});
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
    //resets all powerups
	allPowerUpsOff(){
		this.InvincibilityTimer=0;
		this.slowMotionTimer=0;
		this.doublePointsTimer=0;

	}
    //updates timers for all powerups
    UpdateTimersForPowerUps(dt){
        // Update invincibility timer
        if (this.invincibility) {
			
            this.invincibilityTimer -= dt;
            if (this.invincibilityTimer <= 0) {
                this.invincibility = false; // Turn off invincibility
            }
        }

        //update doublePoints Timer
		if (this.doublePointsActive) {
			this.doublePointsTimer -= dt;
			if (this.doublePointsTimer <= 0) {
				this.doublePointsActive = false; // Turn off double points
				
			}
		}

        //update Slowmotion Timer
		if (this.slowMotionActive) {
			this.slowMotionTimer -= dt;
			this.pipeGap = 250;
			if (this.slowMotionTimer <= 0) {
				
				this.slowMotionActive = false;
				this.gameSpeedModifier = 1; // Reset game speed to normal
				this.pipeGap=100;
				
			}
		}
    }
    //activates invincibility
    activateInvincibility() {
        this.invincibility = true;
        this.invincibilityTimer = 3; // Set invincibility for 3 seconds
    }
    //checks if user started the game or not
    handleStartInput() {
        if (input.isKeyPressed(" ")) {
            this.gameStarted = true;
        }
    }

    spawnPipes() {
        this.frame++;
        if (this.frame % this.pipeInterval === 0) {
            const pipeHeight = getRandomPositiveInteger(
                50,
                canvas.height - this.pipeGap - 100
            );
            this.pipes.push(new Pipe(canvas.width, pipeHeight, this.pipeGap));

            // Randomly decide to spawn a power-up (e.g., 20% chance)
            if (Math.random() < this.chanceOfPowerUp) {
                this.spawnPowerUp(pipeHeight);
            }
        }
    }

    //spawns different powerups Randomly
    spawnPowerUp(pipeHeight) {
        const powerUpY = pipeHeight + this.pipeGap / 2 - 16; // Centered in the gap

    	// Randomly spawn either Invincibility or DoublePoints
		const powerUpTypes = [Invincibility, DoublePoints, SlowMotion];
		const PowerUpType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
		if (PowerUpType == Invincibility && this.invincibility){
			return
		}
		if (PowerUpType == DoublePoints && this.doublePointsActive){
			return
		}
		if (PowerUpType == SlowMotion && this.slowMotionActive){
			return
		}
    	const powerUp = new PowerUpType(canvas.width + 16, powerUpY);

    	this.powerUps.push(powerUp);
        
    }

    updatePipes() {
        this.pipes = this.pipes.filter((pipe) => {
            pipe.update();
            // Check if the bird has passed the middle of the pipe's gap
            if(pipe.x == canvas.width/2){
                this.addScore();
            }
            if (pipe.isOffScreen()) {
                return false;
            }
            return true;
        });
    }

    addScore() {
        sounds.play('point')
		let addedScore=0;
        if (selectedBird.color == "yellowbird") {
            addedScore++;
        } else if (selectedBird.color == "bluebird") {
            addedScore += 2;
        } else if (selectedBird.color == "redbird") {
            addedScore += 3;
        }

		if(this.doublePointsActive){
			this.score += addedScore * 2;
		}
		else{
			this.score += addedScore;
		}
    }

    checkCollisions() {
        this.pipes.forEach((pipe) => {
            if (pipe.checkCollision(this.bird)) {
                if (!this.invincibility) {
                    sounds.play(SoundName.Hit);
                    this.gameOver = true;
					this.allPowerUpsOff();
                }
            }
        });
    }

    render() {
		
        images.render(currentBackground, 0, 0, canvas.width, canvas.height);
        this.pipes.forEach((pipe) => pipe.render(images));
        images.render(ImageName.Ground, this.groundX, canvas.height - 50, canvas.width, 50);
        images.render(ImageName.Ground, this.groundX + this.groundWidth, canvas.height - 50, canvas.width, 50);
		
        this.powerUps.forEach((powerUp) => powerUp.render(images));
        //this.updateTextColor();
        
        context.strokeStyle = "#000"; // Black outline
        context.lineWidth = 4; // Outline thickness
        context.fillStyle = "black";
        if (!this.gameStarted) {
            context.font = "bold 22px ARIAL";
            context.textAlign="center";
            //context.strokeText('Press "SPACE" to START', canvas.width / 2, canvas.height / 2 + 80);
        	context.fillText('Press "SPACE" to START', canvas.width / 2, canvas.height / 2 + 80);
            
			images.render(ImageName.Tap, 90, 210 , 111, 73.5 );
        } else {
            context.font = "32px FlappyBirdyNumbers";
            context.strokeText(`${this.score}`, 144, 35);
            context.fillText(`${this.score}`, 144, 35);
        }
		this.bird.render(images, selectedBird.color);

		if(this.doublePointsActive)
		{
			images.render(ImageName.DoublePoints, 240,  10, 18, 18);
		}
		if(this.invincibility){
			images.render(ImageName.Invincible, 260,  10, 18, 18);
		}
		if(this.slowMotionActive){
			images.render(ImageName.SlowMotion, 220,  10, 18, 18);
		}

		if(this.paused){
			
			context.font = "bold 16px ARIAL";
            context.textAlign="center";
            
			context.fillText("Game is Paused", canvas.width / 2, canvas.height / 3 + 80);
        	context.fillText("Press P to Resume", canvas.width / 2, canvas.height / 2 + 80);
		}
    }
}
