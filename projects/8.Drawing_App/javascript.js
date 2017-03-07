$(function(){

        
   // declare variables
    var paint = false; // painting-erasing or not
    var paint_erase = "paint"; // painting or erasing
    var canvas = document.getElementById("paint"); //get canvas and context
    var ctx =  canvas.getContext("2d");  //get canvas and context
    var container = $("#container"); // get the canvas container
    var mouse = {x: 0, y: 0}; // mouse position
              
    // onload load saved work from localStorage
        
        if(localStorage.getItem("imgCanvas") != null){
            var img = new Image();
            img.onload = function(){
                ctx.drawImage(img, 0, 0);
            }
            img.src = localStorage.getItem("imgCanvas");
        };
    
    // srt drawing parameter (linewidth, lineJoin, lineCap)
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    
    // click inside container
    
    container.mousedown(function(e){
        paint = true;
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft; 
        mouse.y = e.pagey - this.offsetTop; 
        ctx.moveTo(mouse.x,mouse.y);
    });
    
    
    // moving the mouse inside of the container
    
    container.mousemove(function(e){
        mouse.x = e.pageX - this.offsetLeft; 
        mouse.y = e.pageY - this.offsetTop;
        if(paint == true){
            if(paint_erase == "paint"){
                // get color input
                ctx.strokeStyle = $("#paintColor").val();
            }else{
                // white color
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();
        }
    });
    
    
    // mouse up - > we are not painting/erasing anymore
    
    container.mouseup(function(){
        paint = false;
        
    });
    
    // mouse leave - > we are going out of container not painting/erasing anymore
    
    container.mouseleave(function(){
        paint = false;
        
    });
    
    // click on the reset button
    
    $("#reset").click(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    
    });
    
    // click on save button
    
    $("#save").click(function(){
        if(typeof(localStorage) != null){
            localStorage.setItem("imgCanvas",canvas.toDataURL());
            
        }else{
            window.alert("Your browser doesnot support local storage!");
        }
        
    
    });
    
    //click on the erase button
    
    $("#erase").click(function(){
        if(paint_erase == "paint"){
            paint_erase = "erase";
        }else{
            paint_erase = "paint";
        }
        
        $(this).toggleClass("eraseMode");
    
    });
    
    
    // change color input
    $("#paintColor").change(function(){
        $("#circle").css("background-color", $(this).val());
    });
    
    
    // change lineWidth using slider
    
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event,ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value;
        }
    });
    
    
    
});    
    
    
/////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////// code below is only for learning html canvas ////////////// 
///////////////////////////////////////////////////////////////////////////////////////
    
//    draw a sample canvas (only for learning html5 canvas methods)
    
//    var canvas = document.getElementById("paint");
//    var contex = canvas.getContext("2d");
//    
//    // draw a line
//    //declare a new path
//    contex.beginPath();
//    
//    //set line width
//    contex.lineWidth = 40;
//    
//    //set line color
//    contex.strokeStyle = "#42e565";
//    
//    //set cap to the line (round, butt, square)
//    contex.lineCap = "round";
//    
//    //set line join style (bevel, round, square)
//    contex.lineJoin = "round";
//    
//    //position the contex point
//    contex.moveTo(50,50);
//    
//    //draw a straight line from starting point to a new position
//    contex.lineTo(200,200);
//    
//    //draw another line
//    contex.lineTo(400,100);
//    
//    //make line visible
//    contex.stroke();

