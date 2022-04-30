import {drawLevel, drawLives, drawScore} from "./modules/draw-functions";

const body = document.querySelector('body');

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let xP = canvas.width/2-15; //Used to define top-left corner of player
let yP = canvas.height/2-15; //Used to define top-left corner of player

let playing = false;

let xA = 800; //x aim on load
let yA = 600; //y aim on load

let v = 10.0; //Used for balls speed
let ve = 0.5; //Used to define veE
let veE; //Used for enemies speed

let xB = xP+15; //center of player, used to spawn balls
let yB = yP+15; //center of player, used to spawn balls

let vxB; //vector x for balls;
let vyB; //vector y for balls;
let dxB; //direction x for balls;
let dyB; //direction y for balls;
let Balls = new Array(); //Array of Balls
let framed = 0; //Used to limit Balls spawn on mouse hold

let Ennemies = new Array(); //Array of enemies
let colorE; //Used to define enemies color
let xE; //x spawn of enemy
let yE; //y spawn of enemy
let neg; //used to define spawnpoint of ennemies
let vxE; //vector x of ennemies
let vyE; //vector y of ennemies
let dxE=xB; //direction x of Ennemies which is center of player
let dyE=yB; //direction y of Ennemies which is center of player

let cxE; //store x of ennemies in collider()
let cyE; //store y of ennemies in collider()
let cxB; //store x of balls in collider()
let cyB; //store y of balls in collider()

let level; //level
let ennemies_number; //based on current level

let pressed = false; //define if player is holding mouse button

let lives = 5; //number of lives
let score = 0; //score

async function spawnEnnemies() {
    for (let e=0; e<ennemies_number; e++) {
        veE = ve * (Math.random()+0.75); //define speed of current ennemy
        xE = (Math.random()*(canvas.width*2))-(canvas.width/2); //generate x spawnpoint out of game canvas
        if (xE > 0 && xE < canvas.width) {
            neg = Math.round(Math.random()); //used to determine spawnpoint for y
            yE = (Math.random()*(canvas.height/2)); //generate y spawnpoint out of game canvas
            if (neg == 0) {
                yE = -yE;
            } else {
                yE = canvas.height + yE;
            }
        } else {
            yE = (Math.random()*(canvas.height*2))-(canvas.height/2);
        }
        colorE = Math.floor((Math.random()*3)); //generate a random number amongst 0,1,2
        if (colorE == 0) { //establish ennemy color based on the previously generated number
            colorE = "red" // distribution of colors shall be quite equivalent
        } else if (colorE ==1) {
            colorE = "yellow"
        } else {
            colorE = "orange"
        }
        if (xE < dxE) { //based on spawnpoint of ennemy relatively to player, calculate the x and y vectors for ennemy
            if (yE < dyE) {
                if (-xE+dxE > -yE+dyE) {
                    vxE = veE
                    vyE = (veE*(-yE+dyE))/(-xE+dxE)
                } else if (-xE+dxE < -yE+dyE) {
                    vyE = veE
                    vxE = (veE*(-xE+dxE))/(-yE+dyE)
                }
            } else if (yE > dyE) {
                if (-xE+dxE > yE-dyE) {
                        vxE = veE
                        vyE = -(veE*(yE-dyE))/(-xE+dxE)
                } else if (-xE+dxE < yE-dyE) {
                        vyE = -veE
                        vxE = (veE*(-xE+dxE))/(yE-dyE)
                }
            }
        } else if (xE > dxE) {
            if (yE < dyE) {
                if (xE-dxE > -yE+dyE) {
                    vxE = -veE
                    vyE = (veE*(-yE+dyE))/(xE-dxE)
                } else if (xE-dxE < -yE+dyE) {
                    vyE = veE
                    vxE = -((veE*(xE-dxE))/(-yE+dyE))
                }
            } else if (yE > dyE) {
                if (xE-dxE > yE-dyE) {
                    vxE = -veE
                    vyE = -((veE*(yE-dyE))/(xE-dxE))
                } else if (xE-dxE < yE-dyE) {
                    vyE = -veE
                    vxE = -((veE*(xE-dxE))/(yE-dyE))
                }
            }
        }
        Ennemies.push({x:xE, y:yE, vx:vxE, vy:vyE, color:colorE, status:true}) //add new ennemy to end of array, status isn't currently used
        /*ve+=0.001 //used to vary Ennemies speed in highers levels to limit packing*/
        ennemies_number--;
    }
}

function collision() {
    for (let e=0; e<Ennemies.length; e++) {
        for (let b=0; b<Balls.length; b++) {
            cxE = Ennemies[e].x;
            cyE = Ennemies[e].y;
            cxB = Balls[b].x;
            cyB = Balls[b].y;
            if (cxB > cxE-15 && cxB < cxE+15 && cyB > cyE-15 && cyB < cyE+15) {
                Balls.splice(b, 1);
                Ennemies.splice(e, 1);
                e--;
                score++;
                break;
            }
        }
    }
} //collision detection between balls and ennemies

function drawPlayer() {
    ctx.beginPath();
    ctx.rect(xP, yP, 30, 30);
    ctx.fillStyle = "#11aa11";
    ctx.fill();
    ctx.closePath();
}

function drawAim() {
    ctx.beginPath();
    ctx.arc(xA, yA, 5, 0, 2*Math.PI);
    ctx.fillStyle = "#1a1";
    ctx.fill();
    ctx.closePath();
}

function drawBalls() {
    for (let i=0; i < Balls.length; i++) {
         if (Balls[i]) { //verify if current balls does exist
             if (Balls[i].x < 0 || Balls[i].x > canvas.width + canvas.offsetLeft || Balls[i].y < 0 || Balls[i].y > canvas.height) {
                 Balls.splice(i, 1); //delete ball if it leaves canvas
                 i--;
             } else {
                 ctx.beginPath();
                 ctx.arc(Balls[i].x, Balls[i].y, 2, 0, 2 * Math.PI);
                 ctx.fillStyle = "#1a1";
                 ctx.fill();
                 ctx.closePath();
                 Balls[i].y += Balls[i].vy;
                 Balls[i].x += Balls[i].vx;
             }
         }
    }
}

function drawEnnemies() {
    for (let i=0; i < Ennemies.length; i++) {
        if (Ennemies[i]) { //verify if current ennemy does exist
            if (Ennemies[i].x > xP-12 && Ennemies[i].x < xP+42 && Ennemies[i].y > yP-12 && Ennemies[i].y < yP+42) {
                Ennemies.splice(i, 1); //delete ennemy if it collides with player
                lives--;
                i--;
            } else if (Ennemies[i].x < -3000 || Ennemies[i].x > 3000 || Ennemies[i].y < -3000 || Ennemies[i].y > 3000) {
                Ennemies.splice(i, 1); //used in case a ball goes wrong way or it's vectors are wrong (Currently everything's good)
                i--;
            } else {
                ctx.beginPath();
                ctx.arc(Ennemies[i].x, Ennemies[i].y, 15, 0, 2 * Math.PI);
                ctx.fillStyle = Ennemies[i].color;
                ctx.fill();
                ctx.closePath();
                Ennemies[i].y += Ennemies[i].vy;
                Ennemies[i].x += Ennemies[i].vx;
            }
        }
    }
}

function menu() {
    let menu = document.querySelector('#menu');
    menu.style.display = "block";
    body.style.cursor = "default";
    drawScore(score);
    let play_button = document.querySelector('button');
    play_button.addEventListener('click', (e) => {
        e.preventDefault();
        menu.style.display = "none";
        body.style.cursor = "none";
        playing = true;
        lives = 5;
        Balls = [];
        Ennemies = [];
        score = 0;
        level = 0;
        ennemies_number = level*10+level+1;
    })
}

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    let relativeY = e.clientY;
    if(relativeX > 0 && relativeX < canvas.width && relativeY > 0 && relativeY < canvas.height) {
        xA = relativeX;
        yA = relativeY;
    }
} //used to determine mouse position

function mouseDownHandler() {
    pressed = true;
} //set pressed to true, indicating that mouse button is pressed

function mouseUpHandler() {
    pressed = false;
} //set pressed to false, indicating that mouse button is released

function clickHandler() {
    if (framed < 0) {
        let relativeBallX = xA;
        let relativeBallY = yA;
        if (relativeBallX > 0 && relativeBallX < canvas.width && relativeBallY > 0 && relativeBallY < canvas.height) {
            dxB = relativeBallX;
            dyB = relativeBallY;
            if (dxB < xB) {
                if (dyB < yB) {
                    if (-dxB + xB > -dyB + yB) {
                        vxB = -v
                        vyB = -((v * (-dyB + yB)) / (-dxB + xB))
                    } else if (-dxB + xB < -dyB + yB) {
                        vyB = -v
                        vxB = -((v * (-dxB + xB)) / (-dyB + yB))
                    }
                } else if (dyB > yB) {
                    if (-dxB + xB > dyB - yB) {
                        vxB = -v
                        vyB = ((v * (dyB - yB)) / (-dxB + xB))
                    } else if (-dxB + xB < dyB - yB) {
                        vyB = v
                        vxB = -((v * (-dxB + xB)) / (dyB - yB))
                    }
                }
            } else if (dxB > xB) {
                if (dyB < yB) {
                    if (dxB - xB > -dyB + yB) {
                        vxB = v
                        vyB = -(v * (-dyB + yB) / (dxB - xB))
                    } else if (dxB - xB < -dyB + yB) {
                        vyB = -v
                        vxB = (v * (dxB - xB) / (-dyB + yB))
                    }
                } else if (dyB > yB) {
                    if (dxB - xB > dyB - yB) {
                        vxB = v
                        vyB = (v * (dyB - yB)) / (dxB - xB)
                    } else if (dxB - xB < dyB - yB) {
                        vyB = v
                        vxB = (v * (dxB - xB)) / (dyB - yB)
                    }
                }
            }
            Balls.push({x: xB, y: yB, vx: vxB, vy: vyB, status: true})
            framed = 1;
        }
    }
} //balls generation on click, and hold

function keyHandler(e) {
    if (e.key == "p") {
        alert("Game paused")
    }
} //get pressed key to act in consequence (only pause at the moment, will be used for powers)

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (playing) {
        spawnEnnemies();
        drawPlayer();
        drawAim();
        drawLives(lives);
        drawScore(score);
        drawLevel(level);
        collision();
        drawBalls();
        drawEnnemies();
        if (pressed) {
            clickHandler()
        }
        framed--;
        if (lives <= 0) {
            playing = false;
        }
        if (Ennemies.length == 0) {
            level++;
            ve = 0.5;
            ennemies_number = Math.floor((level * 10 + 1));
        }
    } else if (!playing) {
        menu()
    }

    requestAnimationFrame(draw)
} //main function which is recalled by the browser based on screen framerate

document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener('mousedown', mouseDownHandler, false);
document.addEventListener('mouseup', mouseUpHandler, false);
document.addEventListener('keydown', keyHandler, false);

draw();