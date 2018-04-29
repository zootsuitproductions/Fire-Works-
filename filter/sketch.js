/*
	"ISP Speed Index." Netflix, ispspeedindex.netflix.com/country/us/. Accessed 15
    	Dec. 2017.

    "Net Neutrality: What You Need to Know Now." Save the Internet, Free Press,
    	2017, www.savetheinternet.com/net-neutrality-what-you-need-know-now.
    	Accessed 15 Dec. 2017. 
*/

var radio;//used to make the radios
var mbps;//used to load the JSON file
var val;//for utilizing the radio value
var sprite = [];//blocks
var buttonEnd;
var buttonBegin;

function preload() {
	mbps = loadJSON("netspeeds.json");
};

function setup() {
	radio = createRadio();
	radio.option("September 2013", 0);
	radio.option("October 2013  ", 1);
	radio.option("November 2013 ", 2);
	radio.option("December 2013 ", 3);
	radio.option("January 2014  ", 4);
	radio.option("February 2014 ", 5);
	radio.option("March 2 0 1 4 ", 6);
	radio.option("April 2014    ", 7);
	radio.position(10, 400);
	radio.style("width", "140px");
	radio.style("font-family", "arial");
	textAlign(CENTER);

	for (var i = 0; i < 277; i++) {
		sprite[i] = new Sprite();
	};

	myLink = createA('https://www.savetheinternet.com/net-neutrality-what-you-need-know-now', 'If you don\'t know what');
	myLink.position(15, 565);
	myLink1 = createA('https://www.savetheinternet.com/net-neutrality-what-you-need-know-now', 'Net Neutrality is');
	myLink1.position(15, 580);
};

//alert("Works best in Firefox");

function draw() {
	createCanvas(windowWidth, windowHeight);
	background(100, 200, 255);

	noStroke();
	fill(204, 229, 255);
	rect(0, windowHeight - 20, windowWidth, 23);//floor. Purely asthetic; the sprites don't collide directly.

	//banner on top
	fill(70);
	rect(0, 0, windowWidth, 200);
	textAlign(CENTER);
	fill(255);
	textSize(100);
	text("https://netneutrality", windowWidth/2, 150);

	val = radio.value();

	//creates every block and gives them gravity
	for (var i = 0; i < sprite.length; i++) {
		sprite[i].fall();
		sprite[i].display();
	};

	if (val) {
		//once a radio has been selected, the appropriate blocks are made to fall up or down
		for (var i = 0; i < parseFloat(mbps.netflix[val].speed.toFixed(2)); i++) {
			sprite[i].floor = "up";
		};
		for (var i = parseFloat(mbps.netflix[val].speed.toFixed(2)); i < sprite.length; i++) {
			sprite[i].floor = "down";
		};
		//text telling the month and speed
		textAlign(LEFT);
		textSize(60);
		fill(204, 229, 255);
		noStroke();
		text(`Netflix's speed was ${mbps.netflix[val].speed/100} mbps`, 200, 400);
		text(`in ${mbps.netflix[val].date}.`, 200, 460);

		if (val === 5) {
			fill(204, 229, 255);
			textSize(80);
			text("This month Netflix agreed to Comcast's deal", 200, 520);
		};

		textSize(30);
		text("Each block represents 10 kilobytes.", 200, 500);
		text("Press any key to toss the blocks.", 200, windowHeight - 100);

		fill(200);
		text("\u{2B07} Speed that month \u{2B07}", 10, 190);// '\u{2B07}' makes a down arrow with unicode
	} else {//Introductory information for before a radio has been selected
		textSize(30);
		fill(204, 229, 255);
		noStroke();
		textAlign(LEFT);
		text("In October 2013, Netflix's speed on Comcast began slowing. Comcast was throttling its", 200, 300);
		text("consumers' access to Netflix to coerce the company into a network deal. In February", 200, 330);
		text("2014, Netflix agreed to the deal, and its speed on Comcast skyrocketed, even exceeding",200, 360);
		text("its original speed in September. It peaked in April 2014 at 2.77 mbps.", 200, 390);

		text("Press any key to toss the blocks. Select a month at left.", 200, 450);
		text("The green blocks represent that month's speed.", 200,480);
	};
};

//throws the blocks, mainly just for fun
function keyPressed() {
	for (var i = 0; i < sprite.length; i++) {
		sprite[i].tossed();
	};
};

function Sprite() {
	this.x = random(0, windowWidth-38); //sprite's x position
	this.y = random(5, 160); //y position
	this.yVelocity = 0; //used for falling.
	this.gravity = random(0.65, 0.85);//Higher gravity = greater acceleration. Every block has a different
	//gravity so that they don't fall in a line but they separate a bit

	this.yToss = 20; //max height sprite can be thrown.
	this.bounce = random(0.3, 0.5);//each block has a slightly different bounce factor
	this.floor = "down";//"up" tells the blocks to fall up, vice versa with "down"

	//variables to easily change the height of the "ground"
	this.up = random(224, 320);
	this.down = 43;//random(63, 95);

	//draws the sprite
	this.display = function() {
		stroke(255);
		strokeWeight(5);
		//changes the color and direction of the triangles based on where they fall
		if (this.floor === "down") {
			fill(255, 0, 150, 50);
			triangle(this.x-22, this.y-20, this.x, this.y+20, this.x+22, this.y-20);
		} else {
			fill(150, 255, 0, 50);
			triangle(this.x-22, this.y+20, this.x, this.y-20, this.x+22, this.y+20);
		};
		//rect(this.x, this.y, 30, 40);
	};

	//invokes gravity. As long as the sprite is not on the "ground," it falls faster and faster.
	this.fall = function() {
		if (this.floor === "down") {
			if (this.y + this.yVelocity >= windowHeight - this.down) {
				this.y = windowHeight - this.down;
				if (this.yVelocity > 1) {
					this.yVelocity = -this.yVelocity * this.bounce;
				} else {
					this.yVelocity = 0;
				};
			} else {
				this.yVelocity += this.gravity;
				this.y += this.yVelocity;
			};
		} else if (this.floor === "up") {
			if (this.y + this.yVelocity <= this.up) {
				this.y = this.up;
				if (this.yVelocity < 1) {
					this.yVelocity = -this.yVelocity * this.bounce;
				} else {
					this.yVelocity = 0;
				};
			} else {
				this.yVelocity -= this.gravity;
				this.y += this.yVelocity;
			};
		};
	};

	//for when the sprite can be moved left/right.
	//if it goes too far in one direction it appears on the other side of the screen.
	this.touchingEdge = function() {
		if (this.x < -70) {
			this.x = windowWidth;
		};

		if (this.x > windowWidth) {
			this.x = -70;
		};
	};

	//gives every sprite a random x and y velocity to throw them around.
	this.tossed = function() {
		if (this.floor === "down") {
			this.yVelocity = random(-12, -this.yToss);
		} else if(this.floor === "up") {
			this.yVelocity = random(12, this.yToss);
		};
	};
};