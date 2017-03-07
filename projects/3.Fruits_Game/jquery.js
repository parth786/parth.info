
        // Slice a fruit
            // play sound
            // explode fruit

var playing = false;
var score;
var trialsLeft;
var step;
var action; // used for set interval function
var fruits = ["apple", "banana", "cherries", "grapes", "mango", "orange", "peach", "pineapple", "watermelon"];

$(function(){
    // Click on stsrt reset button
$("#startreset").click(function(){
        // are we playing ?

    if(playing == true){

        // if playing than reload page
        location.reload();
    }

    else{
        // if we are are not playing
        playing = true; // game initiated 

        score = 0; // set score to 0
        $("#scorevalue").html(score);

        $("#trialsLeft").show();// show trials left when the game starts
        trialsLeft=3;
        addHearts();

        // hide game over box

        $("#gameover").hide();

        // change button text to reset game
        $("#startreset").html("Reset Game");

        // start sending fruits 
        startAction();

        }
    
    });


// start sending fruits function

function startAction(){
    $("#fruit1").show();
    
    chooseFruit(); 

    // choose a random fruit
    $("#fruit1").css({"left" : Math.round(Math.random()*550), "top" : -50});

    //generate a random step
    step = 1 + Math.round(Math.random()*5);//change step

    // move fruit down by one step every 10ms

    action = setInterval(function(){

    $("#fruit1").css('top',$("#fruit1").position().top + step);     // move fruit by one step

        // check if the fruit is too low
    if ($("#fruit1").position().top >                      $("#fruitsContainer").height()){

        if(trialsLeft > 1){

            $("#fruit1").show();
            chooseFruit(); 

            // choose a random fruit
            $("#fruit1").css({"left" : Math.round(Math.random()*550), "top" : -50});

            //generate a random step
            step = 1 + Math.round(Math.random()*5);//change step

            // reduce number of trials by one
            trialsLeft--;

            // check number of trials left
            addHearts();


        }
        else{// game over
            playing=false; // not playing anymore

            $("#startreset").html("Start Game"); // change button to 'start game'

            $("#gameover").show();// show game over message

            $("#gameover").html("<p>Game Over !</p><p>Your Score is "+ score +" .</p>");

            $("#trialsLeft").hide();

            stopAction();
        }
    }

},10);
}

$("#fruit1").mouseover(function(){
    // increase score value by 1
    score++;
    
    // update the score value in the box
    $("#scorevalue").html(score);
    
    // document.getElementById("slicesound").play();
    $("#slicesound")[0].play();
    
    // stop fruit & hiding it
   clearInterval(action);

    //hide fruit 
    $("#fruit1").toggle( "explode" );// slice
    
    // bring new fruit
    setTimeout(startAction, 500);
});    

    
// functions

function addHearts(){
        
    $("#trialsLeft").empty();
    for(i = 0 ; i < trialsLeft ; i++){
        $("#trialsLeft").append('<img src="images/heart.png" class="life">');
}
}


/// generate a random fruit

function chooseFruit(){
$("#fruit1").attr("src","images/" + fruits[Math.round(Math.random()*8)] + ".png");

}


// stop dropping fruits

function stopAction(){

clearInterval(action);
$("#fruit1").hide();

}
    
});