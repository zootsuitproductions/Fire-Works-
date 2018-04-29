var sprite = [];
var element;//used for the different elements
var elemProp;//used for a JSON file with the elements' properties
var radio;

function preload() {
	elemProp = loadJSON("elementproperties.json");
};

function setup(){
	//change "i < #" to another number to change the amount of particles
	//anything greater than 1000 is usually slow
	for (var i = 0; i < 1000; i++) { 
		sprite[i] = new Sprite(); //creates many versions of the sprite
	}

	element = new Element();

	radio = createRadio();
	radio.option('Calcium', 0);
	radio.option('Cesium', 1);
	radio.option('Copper', 2);
	radio.option('Lead', 3);
	radio.option('Lithium', 4);
	radio.option('Sodium', 5);
	radio.style('width', '0px');
	radio.style('font-size', '40px');
	radio.style('font-family', 'arial')
	textAlign(BOTTOM);
	radio.position(10, 100);
}

function draw(){
	createCanvas(windowWidth, windowHeight);
	background(120, 84, 123);

	displayBurner();

	//displays the selected element
	val = radio.value();
	if (val) {
		element.display();
	}

	//displays every sprite (used for the flame)
	for (var i = 0; i < sprite.length; i++) {
		sprite[i].display();
		sprite[i].fall();
	}
}

//will only run if clicked on the burner
function mousePressed() {
	if (mouseX > windowWidth/2-40 && mouseX < windowWidth/2+40 && mouseY > windowHeight-300) {
		for (var i = 0; i < sprite.length; i++) {
			sprite[i].switch();
		}
	}
}

//constructor function for the different elements/materials
function Element() {
	this.x = [windowWidth/6, windowWidth/6];
	this.y = [windowHeight-350, windowHeight-350];	

	this.display = function() {
		fill(elemProp.elements[val].fillColor[0], elemProp.elements[val].fillColor[1], elemProp.elements[val].fillColor[2]);
		stroke(elemProp.elements[val].strokeColor[0], elemProp.elements[val].strokeColor[1], elemProp.elements[val].strokeColor[2]);

		//element can be dragged if mouse is pressed over it
		if (mouseIsPressed && mouseX > this.x[1]-70 && mouseX < this.x[1]+140 && mouseY > this.y[1]-70 && mouseY < this.y[1]+140) {
			rect(mouseX-25, mouseY-25, 50, 50);
			this.x[1] = mouseX-25;
			this.y[1] = mouseY-25;
		} else {
			rect(this.x[1], this.y[1], 50, 50);
		}
	}
}

function Sprite() {
	this.x = random(windowWidth/2-40, windowWidth/2+35); //sprite's x position
	this.y = windowHeight - 320; //random(0, windowHeight); //y position
	this.step = 20; //how fast they move left and right. Not currently being used.
	this.xVelocity = 0; //used for left/right movement.
	this.intertia = 1; //how fast the sprite accelerates/decelerates.
	this.yVelocity = 0; //used for falling.
	this.gravity = 1; //how quickly yVelocity increases. Higher = stronger gravity, vice versa.
	this.bounce = 0.3; //amount of original height sprite bounces to. 0 to 1.
	this.floor = random(295, 330); //sets how far from bottom is floor
	this.state = 0; //is flame on (0) or off (1)

	//draws the sprite
	this.display = function() {
		if (this.y < windowHeight-300) {
			let orng = int(random(1, 500));//used to make random orange flickers
			let size;
			if (orng === 1) {//if true, makes sprite orange and bigger
				fill(255, 120, 0);
				size = 10;
			} else {
				if (this.y < element.y[1]+random(50, 70) && element.y[1] < windowHeight-295 && this.x > element.x[1]-10 && this.x < element.x[1]+60 && val) {
					//if sprite is above element, changes color to element
					fill(elemProp.elements[val].flameColor[0], elemProp.elements[val].flameColor[1], elemProp.elements[val].flameColor[2]);
				} else {
					fill(50, 100/random(0.5, 1.5), 250/random(0.5, 1.5));
				}

				size = 6;
			}

			noStroke();
			rect(this.x+random(-10,10), this.y, size, size, 5);
		}
	}

	//invokes gravity. As long as the sprite is not on the "ground," it falls faster and faster.
	this.fall = function() {
		if (this.state === 1) {
			if (this.y + this.yVelocity >= windowHeight - this.floor) {
				this.y = windowHeight - this.floor;

				// makes the particle jump higher the closer it is to the center
				if (this.x < windowWidth/2) {
					this.yVelocity = random(10, this.x-windowWidth/2+100);
				} else {
					this.yVelocity = random(10, -this.x+windowWidth/2+100);
				}
				
				if (this.yVelocity > 1) {
					this.yVelocity = -this.yVelocity * this.bounce;
				} else {
					this.yVelocity = 0;
				}

			} else {
				this.yVelocity++;
				this.y += this.yVelocity;
			}
		} else {
			if (this.y + this.yVelocity >= windowHeight - 270) {
				this.y = windowHeight - 270;
			} else {
				this.yVelocity++;
				this.y += this.yVelocity;
			}
		}
	}

	//turns the bunsen burner on and off
	this.switch = function() {
		if (this.state === 1) {
			this.state = 0;
		} else {
			this.state = 1;
		}
	}
}

function displayBurner() {
	//intruction
	textSize(30);
	fill(255);
	text("Click on the burner", windowWidth/2+50, windowHeight-200);
	text("to turn it on", windowWidth/2+50, windowHeight-170);
	text("Select an element", 10, 50);
	text("and drag it to the", 10, 80);
	text("fire", 10, 110);

	stroke(130);
	strokeWeight(5);
	fill(150);
	//body of burner
	rect(windowWidth/2-30, windowHeight-250, 60, 300);

	//base of burner
	rect(windowWidth/2-100, windowHeight-20, 200, 20);
	bezier(windowWidth/2-70, windowHeight-20, windowWidth/2-40, windowHeight-40, windowWidth/2+40, windowHeight-40, windowWidth/2+70, windowHeight-20);

	//on/off knob
	stroke(100);
	fill(120);
	ellipse(windowWidth/2, windowHeight-150, 60);
	if (sprite[0].state === 1) {
		rect(windowWidth/2-10, windowHeight-180, 20, 59, 10);
	} else {
		rect(windowWidth/2-30, windowHeight-160, 60, 20, 10);
	}

	//tip of burner
	stroke(130, 134, 30);
	fill(150, 154, 40);
	beginShape();
	vertex(windowWidth/2-40, windowHeight-290);
	vertex(windowWidth/2+40, windowHeight-290);
	vertex(windowWidth/2+40, windowHeight-250);
	vertex(windowWidth/2+35, windowHeight-250);
	vertex(windowWidth/2+35, windowHeight-240);
	vertex(windowWidth/2-35, windowHeight-240);
	vertex(windowWidth/2-35, windowHeight-250);
	vertex(windowWidth/2-40, windowHeight-250);
	endShape(CLOSE);
}
