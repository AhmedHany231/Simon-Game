var buttonColours= ["red", "blue", "green", "yellow"];
var gamePattern =[];
var userClickedPattern =[];
var level = 0;
var started = false;

$(document).keydown(function(){
    if(!started){
   $("h1").text("Level "+level);
    nextSequence();
    started = true;
}
})
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+ level);
    var randomNumber =Math.floor(Math.random()*4 );
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
    playSound(randomChosenColour);
}
function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
    }
    , 100);
}
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    } 
    else {
        var audio = new Audio("./sounds/wrong.mp3");
         audio.play();
         $("body").addClass("game-over");
         setTimeout(function () {
         $("body").removeClass("game-over");
         }
         , 200);
         $("h1").text("Game Over, Press Any Key to Restart");
         startOver();
    }
}
function startOver(){
    level = 0;
    gamePattern =[];
    started =false;
}




