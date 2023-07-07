import R from "./ramda.js";
//------------------------------------------------------------------------------
// JavaScript defines the user interaction of the web app
//------------------------------------------------------------------------------

/**
 * @file This file contains the core game mechanisms
 * and user interactions for the web app.
 * @version 1.0.0
 */


/**
 * Connect4.js is a module to model and play "Connect Four" and related games.
 * @namespace The Dark Forest
 * @author Hal Feng
 * @version 22/6/2023
 */
const Forest = Object.create(null);

/**
 * A Board is an rectangular grid that tokens can be placed into one at a time.
 * Tokens fill up empty positions from the bottom of a column upwards.
 * It is implemented as an array of columns (rather than rows) of tokens
 * (or empty positions)
 * @memberof Forest
 * @typedef {Forest.Spaceship_or_empty[][]} Board
 */

/**
 * A token is a coloured disk that players place in the grid.
 * @memberof Forest
 * @typedef {(1 | 2)} Token
 */

/**
 * Either a token or an empty position.
 * @memberof Connect4
 * @typedef {(Connect4.Token | 0)} Token_or_empty
 */

/**
 * A set of template token strings for {@link Connect4.to_string_with_tokens}.
 * @memberof Connect4
 * @enum {string[]}
 * @property {string[]} default ["0", "1", "2"] Displays tokens by their index.
 * @property {string[]} disks ["⚫", "🔴", "🟡"]
 * Displays tokens as coloured disks.
 * @property {string[]} zombies ["🟫", "🚧", "🧟"]
 * Displays tokens as zombies and barricades.
 */
Connect4.token_strings = Object.freeze({
    "default": ["0", "1", "2"],
    "disks": ["⚫", "🔴", "🟡"],
    "zombies": ["🟫", "🚧", "🧟"]
});

/**
 * Create a new empty board.
 * Optionally with a specified width and height,
 * otherwise returns a standard 7 wide, 6 high board.
 * @memberof Connect4
 * @function
 * @param {number} [width = 7] The width of the new board.
 * @param {number} [height = 6] The height of the new board.
 * @returns {Connect4.Board} An empty board for starting a game.
 */
Connect4.empty_board = function (width = 7, height = 6) {
    return R.repeat(R.repeat(0, height), width);
};

/**
 * This helper function takes a board, and for each column, returns either
 * the column's index if it has free slots, or `-1` if it is full.
 * @function
 * @param {Connect4.Board} board The board to label.
 * @returns {number[]} Array containing the column index if free or `-1` if full
 */
const label_free_columns = R.addIndex(R.map)((column, index) => (
    R.includes(0, column)
    ? index
    : -1
));

/**
 * Returns an array of which column numbers are free to place a token in.
 * @memberof Connect4
 * @function
 * @param {Connect4.Board} board The board to check for free columns.
 * @returns {number[]} An array of column indices of free columns.
 */
Connect4.free_columns = R.pipe(
    label_free_columns,
    R.reject(R.equals(-1))
);

/**
 * Returns if a game has ended,
 * either because a player has won or the board is full.
 * @memberof Connect4
 * @function
 * @param {Connect4.Board} board The board to test.
 * @returns {boolean} Whether the game has ended.
 */









//------------------------------------------------------------------------------
// Core mechanism of the game
// Set the initial values of the variables

/** @type {number} */
let techLevel = 1;
/** @type {number} */
let time = 2023;
/** @type {number} */
let timer = 0;
/** @type {number} */
let health = 100;
/** @type {Object} */
let weaponInGame = document.getElementById("weaponInGame");
let bulletInterval;
let spawnVillainInterval; moveVillainsInterval; checkCollisionInterval;

/**
 * Spawn a new villain every 10 seconds
 */
setInterval(spawnVillain, 1000);

/**
 * Move villains every 50ms
 */
setInterval(moveVillains, 50);

/**
 * Check bullet collision every 50ms
 */
setInterval(checkCollision, 50);

/**
 * Function to generate a villain spaceship.
 */
function spawnVillain() {
    let villain = document.createElement("div");
    villain.className = "villain";
    // Randomly position the villain along 
    //the x-axis at the top of the game area
    villain.style.left = Math.random() * (gameArea.offsetWidth - villain.offsetWidth) + 'px';
    villain.style.top = '0px';
    gameArea.appendChild(villain);
}

/**
 * Function to move the villain spaceships down the game area.
 */
function moveVillains() {
    let villains = document.getElementsByClassName('villain'); //call back to the class I defined previously
    for (let i = 0; i < villains.length; i++) {
        let villain = villains[i];
        villain.style.top = (parseInt(villain.style.top) + 1) + 'px';
        
        // Check if the villain is within or below the 50px from the bottom of the screen
        if (window.innerHeight - villain.getBoundingClientRect().bottom <= 50) {
            // If the villain reach a distance only 50 pixel between the villain and the bottom of the screen
            health--; // The health value of the earth will decrease by 1

            // Remove the villain from the game area
            villain.remove();
        }
    }
}

/**
 * Function to update the health display in the game.
 */
function updateHealthDisplay() {
    // Update the health displayed in HTML and show them on the info panel
    document.getElementById('health').textContent = "Health: " + health + "%";
}

/**
 * Function to check if health has reached 0.
 */
function checkHealth() {
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

/**
 * Function to start the game when the "startButton" is clicked.
 */
document.getElementById("startButton").onclick = function() {       
    document.getElementById("splashScreen").style.display = "none"; // Hide the game starting page
    document.getElementById("gameContainer").style.display = "flex";
    document.getElementById("calibrationText").style.display = "block";
    
    setTimeout(function() {
        document.getElementById("calibrationText").style.display = "none";
    }, 5000);   // The text will disappear after 5s
    startGame(); // Call function startGame
};

/**
 * Function to restart the game when the "retryButton" is clicked.
 */
document.getElementById("retryButton").onclick = function() {
    location.reload();
};

/**
 * Function to execute when the game starts.
 */
function startGame() {
    // Increase techLevel and time every 30 seconds
    setInterval(function() {
        techLevel += 1;
        time += 10;
        document.getElementById("techLevel").textContent = "Level: " + techLevel;
        document.getElementById("time").textContent = "Year: " + time;
        // display the weapon spaceship according to the technology level of the earth
        displaySpaceship();
    }, 30000);
    
    // Increase timer every second and update display
    setInterval(function() {
        timer++;
        // when the time reaches 30:00, the timer will be refreshed
        if (timer === 30) {
            timer = 0;
        }
        document.getElementById("timer").textContent = (timer < 10 ? "0" : "") + timer + ":00";
    }, 1000);
    
    // Set weaponInGame and weaponSpeed
    const weaponInGame = document.getElementById("weaponInGame");
    const weaponSpeed = 10;

    // Set key states
    keys = { w: false, a: false, s: false, d: false };
    // Handle keydown event
    handleKeydown();
    // Handle keyup event
    handleKeyup();
}

/**
 * Function to handle keydown event.
 */
function handleKeydown() {
    let keys = { w: false, a: false, s: false, d: false }; //set all key states are false at the very beginning
document.addEventListener('keydown', function(event) {
    if (event.key in keys) {
        keys[event.key] = true;
}
});
}

/**
 * Function to handle keyup event.
 */
function handleKeyup() {
    document.addEventListener('keyup', function(event) {
        if (event.key in keys) {
            keys[event.key] = false;
    }
    });
}

/**
 * Function to display the spaceship according to the technology level of the earth.
 */
function displaySpaceship() {
    let weaponImage = document.getElementById("weapon");
    if (techLevel >= 1 && techLevel <= 3) {
        weaponImage.src = "assets/spaceship_lv1.png";
    } else if (techLevel >= 4 && techLevel <= 8) {
        weaponImage.src = "assets/spaceship_lv2.png";
    } else if (techLevel >= 9 && techLevel <= 15) {
        weaponImage.src = "assets/spaceship_lv3.png";
    }
    weaponInGame.src = weapon.src;
}

/**
 * Function to fire bullets from the spaceship.
 */
function fireBullets() {
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


/**
 * Function to check collision between bullets and villains.
 */
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
        }

        break;
    }
}
}
}

export default Object.freeze(The_Dark_Forest);