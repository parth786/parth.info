<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Social Networks API's</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

      
      <!-- Latest compiled and minified CSS -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

      <!-- Optional theme -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

      <!-- Latest compiled and minified JavaScript -->
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
      
      <link href="https://fonts.googleapis.com/css?family=Arvo" rel="stylesheet">
      
      <style>
          body{
            background: url(images/background.jpg) center center fixed;
            background-size: cover;
            text-align: center;
            font-family: 'Arvo', serif;
          }
      
          .jumbotron{
            background-color: transparent;
              color: white;
          }
          
          .jumbotron h1{
            letter-spacing: 2.5px;
          }
          
          .form-horizontal{
            margin-top: 50px;
          }
          
          .form-horizontal .form-group{
            margin-top: 50px;
          }
          
          .row{
            margin-top: 30px;
          }
          
          .col-sm-2{
            margin-bottom: 10px;
          }
      </style>
     
  </head>
  <body>
<!--      facebook code-->
      <div id="fb-root"></div>
      <script>(function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8";
        fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));</script>
    
      <div class="jumbotron">
          <div class="container-fluid">
              <h1>Join us and build Freedom</h1>
              <p>We make freedom, we love freedom, we spread freedom.</p>
          </div>
          
          <form class="form-horizontal">
              <div class="form-group">
                  <div class="col-xs-offset-2 col-xs-8">
                    <input type="email" id="email" placeholder="Your Email" class="form-control">
                  </div>
                  <div class="form-group">
                      <div class="col-xs-offset-3 col-xs-6">
                      <input type="submit" id="submit" value="Subscribe" class="btn btn-info btn-lg">
                      </div>
                  </div>
              </div>
          </form>
          
          <div class="row">
              
<!--              facebook button-->
              
              <div class="col-sm-offset-3 col-sm-2">
                  <div class="fb-like" data-href="https://unhelped-kilometer.000webhostapp.com/" data-layout="button_count" data-action="like" data-size="large" data-show-faces="true" data-share="true"></div>
              </div>
              
<!--             G+ button-->
              
              <div class="col-sm-2">
                  <div class="g-plusone" data-size="standard" ... ></div>
              </div>
              
<!--              twitter button-->
              
              <div class="col-sm-2">
                  <a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Hello%20world" data-size="large">
Tweet</a>
              </div>
          </div>
          
<!--          twitter timeline-->
          <div >
             <a class="twitter-timeline" data-lang="en" data-width="400" data-height="600" data-chrome="nofooter noborders" data-tweet-limit="3" href="https://twitter.com/p_pathak786/likes">Tweets Liked by @p_pathak786</a>
          </div>
      </div>

      
<!--      google+ script-->
      
       <script src="https://apis.google.com/js/platform.js" async defer></script>
        
<!--      twitter script-->
      
      <script>window.twttr = (function(d, s, id) {
        
              var js, fjs = d.getElementsByTagName(s)[0],
                  t = window.twttr || {};
                if (d.getElementById(id)) return t;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);

                t._e = [];
                t.ready = function(f) {
                t._e.push(f);
            };

  return t;
}(document, "script", "twitter-wjs"));</script>
      
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>