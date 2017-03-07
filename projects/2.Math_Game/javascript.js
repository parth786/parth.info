var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;


document.getElementById("startreset").onclick = function(){
    if(playing == true){  // if we are playing
        location.reload(); // reload our page.
    }
    else{    //if we are not playing
          // change mode to playing  
    playing = true;
        // set score to zero (0)
    score = 0;
        
    document.getElementById("scorevalue").innerHTML = score;  
        
    show("timeremaining");  // show countdown box
        timeremaining = 60;
        
    document.getElementById("timeremainingvalue").innerHTML= timeremaining;
        // hide game over box
       
        hide("gameover");
        
     document.getElementById("startreset").innerHTML = "Reset Game"; 

    startCountDown();
        
        // generate a new Q&A
        
        generateQA();
    }
}

// clicking on answer box

for(i=1;i<5;i++){
document.getElementById("box"+i).onclick = function(){
        // check if we are playing
    if(playing=true){
        if (this.innerHTML == correctAnswer){
            // correct answer
            
            // increase the value of score by 1
            
            score++;
            
        document.getElementById("scorevalue").innerHTML = score;
            
            // hide wrong box and show correct box
            
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");
            },1000);
            
            //Generate new Q&A
            generateQA();
        }
        else{
                // wrong answer
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");
            },1000);
        }
    }
}

}





// functions
// start count down
function startCountDown(){
    action = setInterval(function(){
       timeremaining -=1; 
    
    document.getElementById("timeremainingvalue").innerHTML= timeremaining;
        if(timeremaining == 0){//game over
             stopCountDown();
            show("gameover");
   
    document.getElementById("gameover").innerHTML="<p>Game Over!</p><p>Your score is " + score + ".</p>";
    
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing=false;
    document.getElementById("startreset").innerHTML="Start Game";
            
        }
    },1000);
}

// stop count down

function stopCountDown(){
    clearInterval(action);
}

// hide content

function hide(Id){
    
    document.getElementById(Id).style.display="none";
}

//show content

function show(Id){
    
    document.getElementById(Id).style.display="block";
}

// generate Q & A

function generateQA(){
    var x = 1 + Math.round(Math.random()*9);
    var y = 1 + Math.round(Math.random()*9);
    correctAnswer = x*y;
    
    document.getElementById("question").innerHTML = x + "x" + y;
    
    var correctPosition = 1 + Math.round(Math.random()*3);
    
    document.getElementById("box" + correctPosition).innerHTML= correctAnswer; // fill one box with correct answer
    
    // fill other boxes with wrong answers
    
    var answers = [correctAnswer];
    
    for(i=1;i<5;i++){
        
        if (i != correctPosition){
            
        var wrongAnswer;
            
    do{
        wrongAnswer = (1 + Math.round(Math.random()*9))*(1 + Math.round(Math.random()*9)); // a wrong number
        }  
            
    while (answers.indexOf(wrongAnswer)>-1)
        
    document.getElementById("box"+i).innerHTML = wrongAnswer;
        
            answers.push(wrongAnswer);
        }
    }
}