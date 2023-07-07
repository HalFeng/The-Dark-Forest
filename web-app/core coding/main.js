//-----------------------------------------------------------------------------------------------------
//JavaScript defines the user interaction of the web app
//-----------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------
//Core mechanism of the game
//Set the initial values of the variables
let techLevel = 1;
let time = 2023;
let timer = 0;
let health = 100;
let weaponInGame = document.getElementById("weaponInGame");
let bulletInterval;
let spawnVillainInterval, moveVillainsInterval, checkCollisionInterval;
let gamdumTimeout; 
let score =0;
let villainSpeed =1;
//let gamdumActive = false;  // gamdum status is set as false at the very beginning


//-----------------------------------------------------------------------------------------------------
    // Spawn a new villain every 10 seconds
    setInterval(spawnVillain, 1000);

    // Move villains every 50ms
    setInterval(moveVillains, 50);

    //check bullet collision every 50ms
    setInterval(checkCollision, 50);
    
//Set a function to generate villain spaceship
function spawnVillain() {
    // Spawn villains according to the techLevel
    for(let j = 0; j <= Math.floor(techLevel / 2); j++){
        let villain = document.createElement('div');
        villain.className = 'villain';
        // Randomly position the villain along the x-axis at the top of the game area
        villain.style.left = Math.random() * (gameArea.offsetWidth - villain.offsetWidth) + 'px';
        villain.style.top = '0px';
        gameArea.appendChild(villain);
    }
    /* Don't spawn villains when gamdum is active
    if (!gamdumActive) {
        let villain = document.createElement('div');
        villain.className = 'villain';
       villain.style.left = Math.random() * (gameArea.offsetWidth - villain.offsetWidth) + 'px';
        villain.style.top = '0px';
        gameArea.appendChild(villain);
    }*/
}

//Set a function to move the villain spaceships move downward the game area
function moveVillains() {
    let villains = document.getElementsByClassName('villain'); //call back to the class I defined previously
    for (let i = 0; i < villains.length; i++) {
        let villain = villains[i];
        villain.style.top = (parseInt(villain.style.top) + 1) + 'px';
/*
        // Don't move villains when gamdum is active
    if (!gamdumActive) {
        let villains = document.getElementsByClassName('villain');
        for (let i = 0; i < villains.length; i++) {
            let villain = villains[i];
            villain.style.top = (parseInt(villain.style.top) + 1) + 'px';*/
            
            if (window.innerHeight - villain.getBoundingClientRect().bottom <= 50) {
                health--;
                villain.remove();
            }
    //    }
    //}

        // Check if the villain is within or below the 50px from the bottom of the screen
        if (window.innerHeight - villain.getBoundingClientRect().bottom <= 50) {
            //If the villain reach a distance only 50 pixel between the villain and the bottom of the screen
            health--; // The health value of the earth will decrease by 1

            // Remove the villain from the game area
            villain.remove();
        }
    }

function updateHealthDisplay() {
        // Update the health displayed in HTML and show them on the info panel
        document.getElementById('health').textContent = "Health: " + health + "%";
    }
    
    // Call the health update function once per loop
    updateHealthDisplay();
    // Check if health has reached 0
    if (health <= 0) {
        // Stop the game
        clearInterval(spawnVillainInterval);
        clearInterval(moveVillainsInterval);
        clearInterval(checkCollisionInterval);

        // Display game over screen
        document.getElementById('gameOverScreen').style.display = 'block';

    }
}
//-----------------------------------------------------------------------------------------------------




//-----------------------------------------------------------------------------------------------------
//Key button interaction of the game
document.getElementById("startButton").onclick = function() {       //When the "startbutton" is clicked
    document.getElementById("splashScreen").style.display = "none"; //Hide the game starting page
    document.getElementById("gameContainer").style.display = "flex";
    document.getElementById("calibrationText").style.display = "block";
    
    setTimeout(function() {
        document.getElementById("calibrationText").style.display = "none";
    }, 5000);   // The text will disappear after 5s
    startGame();// Call function startGame
};

//If user click on the retry button on game over page, the game will restart
document.getElementById("retryButton").onclick = function() {
    location.reload();
};

//-----------------------------------------------------------------------------------------------------



/*
//-----------------------------------------------------------------------------------------------------
//Gamdum!!!
// Add event listener to gamdumButton
document.getElementById("gamdumButton").onclick = function() {
    spawnGamdum();
};

function spawnGamdum() {
    // show gundam
    let gamdum = document.createElement('img');
    gamdum.src = "assets/gamdum.gif";
    gamdum.style.width = "100%";
    gamdum.style.height = "100%";
    gamdum.style.position = "absolute";
    gamdum.style.top = "0";
    gamdum.style.left = "0";
    gamdum.id = "gamdum";
    gameArea.appendChild(gamdum);
    
    // set gamdumActive to true
    gamdumActive = true;
    
    // destroy all villains immediately
    let villains = document.getElementsByClassName('villain');
    while(villains[0]) {
        villains[0].parentNode.removeChild(villains[0]);
    }

    // hide gundam after 3 seconds and enable spawning and moving villains
    gamdumTimeout = setTimeout(function() {
        gamdum.parentNode.removeChild(gamdum);
        gamdumActive = false;
    }, 3000);
}
//-----------------------------------------------------------------------------------------------------
*/




//-----------------------------------------------------------------------------------------------------
//When the game starts
function startGame() {
    setInterval(function() {
        techLevel += 1;
        time += 10;
        document.getElementById("techLevel").textContent = "Level: " + techLevel;
        document.getElementById("time").textContent = "Year: " + time;

        //display the weapon spaceship according to the technology level of the earth
        let weaponImage = document.getElementById("weapon");
        if (techLevel >= 1 && techLevel <= 3) {
            weaponImage.src = "assets/spaceship_lv1.png";
        } else if (techLevel >= 4 && techLevel <= 8) {
            weaponImage.src = "assets/spaceship_lv2.png";
        } else if (techLevel >= 9 && techLevel <= 100) {
            weaponImage.src = "assets/spaceship_lv3.png";
        }
        weaponInGame.src = weapon.src;
    }, 30000);
        // Increase villain speed every time techLevel increases by 2

        // Function to upgrade technology level
function upgradeTechLevel() {
    techLevel++;

    // Increase villain speed every time techLevel increases by 2
    if(techLevel % 2 == 0) {
        villainSpeed += 0.5;
    }
}

// Call upgradeTechLevel every 30 seconds (10000 milliseconds = 10 seconds)
setInterval(upgradeTechLevel, 30000);

    
    setInterval(function() {
        timer++;
        //when the time reaches 30:00, the timer will be refreshed
        if (timer === 30) {
            timer = 0;
        }
        document.getElementById("timer").textContent = (timer < 10 ? "0" : "") + timer + ":00";
    }, 1000);
    const weaponInGame = document.getElementById("weaponInGame");
    const weaponSpeed = 10;



//-----------------------------------------------------------------------------------------------------
//Keyboard Settings
let keys = { w: false, a: false, s: false, d: false }; //set all key states are false at the very beginning
document.addEventListener('keydown', function(event) {
    if (event.key in keys) {
        keys[event.key] = true;
}
});

document.addEventListener('keyup', function(event) {
    if (event.key in keys) {
        keys[event.key] = false;
}
});

let gameArea = document.getElementById("gameArea");
let gameAreaRect = gameArea.getBoundingClientRect();

//To improve the user interaction
//We need to ensure the spaceship will move when the user press 2 direction keys at the same time
setInterval(function() {
let rect = weaponInGame.getBoundingClientRect();

if (keys.w && rect.top > gameAreaRect.top) {
weaponInGame.style.top = (rect.top - weaponSpeed - gameAreaRect.top) + "px";
}
if (keys.s && rect.bottom < gameAreaRect.bottom) {
weaponInGame.style.top = (rect.top + weaponSpeed) + "px";
}
if (keys.a && rect.left > gameAreaRect.left) {
weaponInGame.style.left = (rect.left - weaponSpeed - gameAreaRect.left) + "px";
}
if (keys.d && rect.right < gameAreaRect.right) {
weaponInGame.style.left = (rect.left + weaponSpeed) + "px";
}
}, 80); //move speed of the spaecship


document.addEventListener('keydown', function(event) {
    let gameArea = document.getElementById("gameArea");
    let gameAreaRect = gameArea.getBoundingClientRect();
    let rect = weaponInGame.getBoundingClientRect();

    switch (event.key) {
        case "w":
            if (rect.top > gameAreaRect.top) weaponInGame.style.top = (rect.top - weaponSpeed - gameAreaRect.top) + "px";
            break;
        case "s":
            if (rect.bottom < gameAreaRect.bottom) weaponInGame.style.top = (rect.top + weaponSpeed) + "px";
            break;
        case "a":
            if (rect.left > gameAreaRect.left) weaponInGame.style.left = (rect.left - weaponSpeed - gameAreaRect.left) + "px";
            break;
        case "d":
            if (rect.right < gameAreaRect.right) weaponInGame.style.left = (rect.left + weaponSpeed) + "px";
            break;
    }
});
//-----------------------------------------------------------------------------------------------------



//-----------------------------------------------------------------------------------------------------
//the bullet settings of the spaceship

    bulletInterval = setInterval(function() {
        let bulletNumber;
        if (techLevel >= 1 && techLevel <= 3) {
            bulletNumber = 1;
        } else if (techLevel >= 4 && techLevel <= 8) {
            bulletNumber = 2;
        } else if (techLevel >= 9 && techLevel <= 1000000) {
            bulletNumber = 4;
        }

        for (let i = 0; i < bulletNumber; i++) {
            let bullet = document.createElement('div');
            bullet.className = 'bullet';
            let offset = i * 10 - ((bulletNumber - 1) * 10) / 2; //Arrange the bullets in different trajectories
            bullet.style.left = (parseInt(weaponInGame.style.left) + weaponInGame.offsetWidth / 2 + offset) + 'px';
            bullet.style.top = (parseInt(weaponInGame.style.top) - 10) + 'px';
            document.getElementById('gameArea').appendChild(bullet);

            let bulletInterval = setInterval(function() {
                if (parseInt(bullet.style.top) > 0) {
                    bullet.style.top = (parseInt(bullet.style.top) - 10) + 'px';
                } else {
                    bullet.remove();
                    clearInterval(bulletInterval);
                }
            }, 50);
        }
    }, 150); // bullets will be fired every 150ms
    

    document.addEventListener('keydown', function(event) {
    });
}

//----------------------------------------------------------------------------------------------------




//----------------------------------------------------------------------------------------------------
function checkCollision() {
    let villains = document.getElementsByClassName('villain');
    let bullets = document.getElementsByClassName('bullet');

    for (let i = 0; i < villains.length; i++) {
        let villain = villains[i];
        let villainRect = villain.getBoundingClientRect();

for (let j = 0; j < bullets.length; j++) {
    let bullet = bullets[j];
    let bulletRect = bullet.getBoundingClientRect();
    
    // check if the bullet and villain rectangles overlap
    if (!(villainRect.right < bulletRect.left || 
        villainRect.left > bulletRect.right || 
        villainRect.bottom < bulletRect.top || 
        villainRect.top > bulletRect.bottom)) {
        
        // remove the bullet
        bullet.remove();
        
        // increase hit counter and check if villain has been hit 3 times
        villain.hitCounter = (villain.hitCounter || 0) + 1;
        if (villain.hitCounter >= 3) {
            villain.style.backgroundImage = "url('assets/explode.gif')";
            setTimeout(function() {
                villain.remove();
            }, 1000); // remove the villain after 1 second
            
            score=score+7; // Increment the score
            document.getElementById('score').textContent = score; // Update the score display
        }

        break;
    }
}
}
}