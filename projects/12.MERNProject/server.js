var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.render("index.html");
});


//hosting server at localhost
app.listen(port, function(){
    console.log("Server running at " + port);
});


