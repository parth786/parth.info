<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Distance btw Cities App</title>
      
      <link href="styling.css" type="text/css" rel="stylesheet">
      
<!--      google fonts styling-->
      <link href="https://fonts.googleapis.com/css?family=Arvo" rel="stylesheet">
      
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
      
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
    
  <body>
      
    <div class="jumbotron">
      <div class="container-fluid">
          <h1>Distance between Cities App.</h1>
          <p>Our app will help you calculate travelling distance.</p>
          
          <form class="form-horizontal">
              <div class="form-group">
                <label for="from"  class="col-xs-2 control-label">From: </label>
                  <div class="col-xs-10">
                    <input type="text" id="from" placeholder="Origin" class="form-control">
                </div> 
              </div>
              
              <div class="form-group">
                <label for="to"  class="col-xs-2 control-label">To: </label>
                  <div class="col-xs-10">
                    <input type="text" id="to" placeholder="Destination" class="form-control">
                </div> 
              </div>
          </form>
          
          <div class="col-xs-offset-2 col-xs-10">
            <button type="submit" class="btn btn-info btn-lg" onclick="calcRoute();">Submit</button>
          </div>
          
      </div>
        
        <div class="container-fluid">
            <div id="googleMap">
            
            </div>
            
            <div id="output">
            
            </div>
        </div>
        
    </div>  
    
    
    <!--embeded google maps javascript apis-->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAkm4iK5wUeDY9yfsqQXTqYr3X2fXDqMpo&libraries=places"></script>
      
    <!-- Link the file with javascript.js file -->
   

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
      
    <script src="javascript.js"></script>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
      
  </body>
</html>