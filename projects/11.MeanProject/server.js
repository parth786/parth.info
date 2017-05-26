var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs("userDB", ["userProfile"]);
var bodyParser = require("body-parser");

app.use(express.static("angular"));
app.use(bodyParser.json());

// signup request
app.post("/signup", function(req, res){
//    console.log(req.body);
    db.userProfile.insert(req.body, function(err, doc){
        res.json(doc);
    });
});

// login request
app.post("/login", function(req, res){

//    console.log(req.body);
    //res.json(req.body);

    db.userProfile.find({username : req.body.username, password : req.body.password},{"username":0,"firstname":0,"email":0,"lastname":0,"password":0,"confirmPassword":0}, function(err, docs){

        if(err){
//            console.log(err);
        }

        if(docs.length == 0){
            res.json(docs);
//            console.log(docs);

        }else{
            var id = docs[0]._id;
//            console.log(id);
            res.json(id);
        }

    });   

});

//logged into profile
app.get("/profile/:id", function(req, res){

    var id = req.params.id;

    db.userProfile.find({_id : mongojs.ObjectId(id)}, function(err, docs){

        var userInfo = docs[0];
        res.json(userInfo);

    });
});


// update info in the profile
app.put("/update:id", function(req, res){
    console.log(req.params.id);
    var id = req.params.id;

    db.userProfile.findAndModify({query: {_id: mongojs.ObjectId(id)},
                                  update: {$set: {"firstname": req.body.firstname, 
                                                  "lastname": req.body.lastname, 
                                                  "username" : req.body.username, 
                                                  "email": req.body.email, 
                                                  "password" : req.body.password, 
                                                  "confirmPassword" : req.body.confirmPassword
                                                 }}, new: true}, function(err, docs){
        res.json(docs);
    });
});


// get user Info

app.post("/getUserInfo/:id", function(req, res){
//    console.log(req.params.id);
    var id = req.params.id;

    db.userProfile.find({_id : mongojs.ObjectId(id)}, function(err, docs){

        var userInfo = docs[0];
        res.json(userInfo);

    });
});

// get receivers info

app.post("/msgReceiver/:email", function(req, res){
//    console.log(req.params.email);

    db.userProfile.find({email : req.params.email},function(err, docs){
//        console.log(docs[0]);
        var receiversInfo = docs[0];
        res.json(receiversInfo);
    });

});

// send message

app.put("/sendMsg/:id", function(req, res){
    //    console.log(req.params.id);
    //    console.log(req.body.message);
    var id = req.params.id;

    db.userProfile.findAndModify({query: {_id: mongojs.ObjectId(id)},
                                  update: {$set: {"message": req.body.message}}, new: true}, function(err, docs){
        res.json(docs);
    });
});

// get receiver's info
app.get("/reply/:id", function(req, res){
//    console.log(req.params.id);
    var id = req.params.id;

    db.userProfile.find({_id: mongojs.ObjectId(id)}, function(err, docs){
        var receiversInfo = docs[0];
        res.json(receiversInfo);
    });
});

// sent the reply

app.put("/updateAfterReply/:id", function(req, res){
    //    console.log(req.params.id);
    //    console.log(req.body.message);
    var id = req.params.id;

    db.userProfile.findAndModify({query: {_id: mongojs.ObjectId(id)},
                                  update: {$set: {"message": req.body.message}}, new: true}, function(err, docs){
        res.json(docs);
    });
});


// delete request

app.put("/deleteRequest/:id", function(req, res){
//    console.log(req.params.id);

    var id = req.params.id;

    db.userProfile.findAndModify({query: {_id: mongojs.ObjectId(id)},
                                  update: {$set: {"message": req.body.message}}, new: true}, function(err, docs){
        res.json(docs);
    });
});

//hosting server at localhost
app.listen(3000);
console.log("Server running at http://localhost:3000");


