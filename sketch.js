let previousMin = -1;
let previousHr = -1;
let previousSec = -1;

let hrScale = 255/24;
let minScale = 255/60;
let secScale = 255/60;

let squareSize = 35;

let hoursGrid = Array(24).fill(false);
let minutesGrid = Array(60).fill(false);
let secondsGrid = Array(60).fill(false);

let smallGridX, smallGridY;
let bigGrid1X, bigGrid2X, bigGridY;

let mins = [];
let secs = [];
let hrs = [];
for (let i = 0; i < 60; i++) {
    mins.push(i);
    secs.push(i);
    if (i < 24) {
        hrs.push(i);
    }
}
shuffle(mins);
shuffle(secs);
shuffle(hrs);

// Shuffle function Fisher Yates
function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

// setup() is called once at page-load
function setup() {
    createCanvas(800, 600);

    smallGridX = 40;
    smallGridY = 100;
    bigGrid1X = 270;
    bigGrid2X = 500;
    bigGridY = 100;

    let currentHour = hour();
    let currentMinute = minute();
    let currentSecond = second();

    for (let i = 0; i < currentHour; i++) {
        fillHourSquare(hrs[i]);
    }
    previousHr = currentHour;

    for (let i = 0; i < currentMinute; i++) {
        fillMinuteSquare(mins[i]);
    }
    previousMin = currentMinute;

    for (let i = 0; i < currentSecond; i++) {
        fillSecondSquare(secs[i]);
    }
    previousSec = currentSecond;
}

// draw() is called 60 times per second
function draw() {
    let hr = hour();
    let min = minute();
    let sec = second();

    if (sec !== previousSec) {
        fillSecondSquare(secs[sec]);
        previousSec = sec;
        
        if (sec === 0) {
            secondsGrid = Array(60).fill(false);
            shuffle(secs);
        }
    }

    if (min !== previousMin) {
        fillMinuteSquare(mins[min]);
        previousMin = min;
        
        if (min === 0) {
            minutesGrid = Array(60).fill(false);
            shuffle(mins);
        }
    }

    if (hr !== previousHr) {
        fillHourSquare(hrs[hr]);
        previousHr = hr;
        
        if (hr === 0) {
            hoursGrid = Array(24).fill(false);
            shuffle(hrs);
        }
    }

    background(225);
    
    noStroke();
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 6; col++) {
            let index = row * 6 + col;
            if (hoursGrid[index]) {
                fill(hr*hrScale, min*0, sec*0);
            } else {
                noFill();
            }
            rect(smallGridX + col * squareSize, smallGridY + row * squareSize, squareSize, squareSize);
        }
    }

    stroke(0);
    noFill();
    rect(smallGridX, smallGridY, 6 * squareSize, 4 * squareSize);

    noStroke();
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 6; col++) {
            let index = row * 6 + col;
            if (minutesGrid[index]) {
                fill(hr*0, min*minScale, sec*0);
            } else {
                noFill();
            }
            rect(bigGrid1X + col * squareSize, bigGridY + row * squareSize, squareSize, squareSize);
        }
    }

    stroke(0);
    noFill();
    rect(bigGrid1X, bigGridY, 6 * squareSize, 10 * squareSize);

    noStroke();
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 6; col++) {
            let index = row * 6 + col;
            if (secondsGrid[index]) {
                fill(hr*0, min*0, sec*secScale);
            } else {
                noFill();
            }
            rect(bigGrid2X + col * squareSize, bigGridY + row * squareSize, squareSize, squareSize);
        }
    }

    stroke(0);
    noFill();
    rect(bigGrid2X, bigGridY, 6 * squareSize, 10 * squareSize);

    let fullWidth = (bigGrid2X - smallGridX) + 6 * squareSize;
    let reducedWidth = fullWidth * 0.6;
    let xOffset = (fullWidth - reducedWidth) / 2;

    fill(hr*hrScale, min*minScale, sec*secScale);
    rect(smallGridX + xOffset, bigGridY + 11 * squareSize, 
         reducedWidth, 
         squareSize * 2);
    
    fill(0);
    textAlign(CENTER);
    textSize(16);
    let hexColor = '#' + 
        hex(int(hr*hrScale), 2) + 
        hex(int(min*minScale), 2) + 
        hex(int(sec*secScale), 2);
    text(hexColor, smallGridX + fullWidth/2, bigGridY + 12.3 * squareSize);
}

// Helper functions to fill specific squares
function fillHourSquare(index) {
    if (index >= 0 && index < 24) {
        hoursGrid[index] = true;
    }
}

function fillMinuteSquare(index) {
    if (index >= 0 && index < 60) {
        minutesGrid[index] = true;
    }
}

function fillSecondSquare(index) {
    if (index >= 0 && index < 60) {
        secondsGrid[index] = true;
    }
}