var buttonColours =["red","blue","green","yellow"];
var gamePattern =[];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    var randomNum = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel){
    if ( userClickedPattern[currentLevel]==gamePattern[currentLevel]) {
        console.log("Succuss!");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
               nextSequence(); 
            }, 1000);
        }
    }
    else{
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
           $("body").removeClass("game-over"); 
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver()
    }
}

function startOver(){
    gamePattern=[];
    level=0;
    started=0;
}