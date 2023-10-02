var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


jQuery(".btn").click(function(){ // Add click event listener to class .btn 
    let userChosenColour = jQuery(this).attr("id"); // Detect what is being clicked and return the id

    userClickedPattern.push(userChosenColour); // Add the clicked button id to an array
    playSound(userChosenColour); // Play sound based on user's click event
    animatePress(userChosenColour); // Add the animation to chosen colour
    checkAnswer(userClickedPattern.length - 1); // Add check answer based on the user's last clicked pattern
});

// Set to detect if any key is pressed
jQuery("html").keydown(function(){
    if (!started) {
        started = true;
        nextSequence(); // If true run function nextSequence
        jQuery("#level-title").text("Level " + level); // If true change h1 text
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) { // Checks if the user's pattern = game pattern for the current level
        if (userClickedPattern.length === gamePattern.length) { // Checks if the user's length = game length
            setTimeout(function() { // If true, run nextSequence after 1000ms
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong"); // Play wrong sound when user pattern /= gam pattern for current level
        jQuery("#level-title").text("Game over, Press Any Key to Restart"); // Change h1 text if user user pattern /= gam pattern for current level
        startOver();
        jQuery("body").addClass("game-over"); // Add class game over when user pattern /= gam pattern for current level

        setTimeout(function(){
            jQuery("body").removeClass("game-over"); //Remove the class after 200ms
        }, 200); 
    }
}

function nextSequence() {
    
    let randomNumber = Math.floor(Math.random() * 4); // Get random number from 0-3
    let randomChosenColour = buttonColours[randomNumber]; // Set array to get random chosen number

    level++; // + 1 counter every time this function is runs
    userClickedPattern = []; // Set the user's click pattern index back to 0 when this function runs
    gamePattern.push(randomChosenColour); // Add the random chosen colour to an array
    jQuery("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // Make the random chosen colour to flash
    jQuery("#level-title").text("Level " + level) // Change text of h1 based on level count
    playSound(randomChosenColour); // Play sound based on random chosen colour
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// Add class to change the button's css based on timer
function animatePress(currentColor) {
    jQuery("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        jQuery("#" + currentColor).removeClass("pressed"); 
    }, 100);
}

// Set sound based on source 
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}










