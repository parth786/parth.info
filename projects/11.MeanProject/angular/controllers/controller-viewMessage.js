(function(){

    ang.controller("viewCtrl", ["$http","$location","$rootScope", function($http, $location, $rootScope){

        if(localStorage.getItem("userId")){

            var userID = localStorage.getItem("userId");

        }else{

            alert("User not logged-in. Please login again");
            $location.path("/home");

        }

        var scope = this;
        this.messageobj = {};

        this.viewRow = $rootScope.viewRow;        
        var userSenderDetails = this.viewRow;
        // create a flag

        this.flag = false;

        this.switchFlag = function(){
            this.flag = !this.flag;
        }

        this.allMsg = function(){
            $location.path("/message");
        }

        this.reply = function(){

            if(this.message == ""){
                alert("Please type some message before sending it");
            }else if(this.message == undefined){
                alert("Please type some message before sending it");
            }else{
//                console.log(this.message);
                var reply = this.message;


                // store current date and time
                var currentDateTime = new Date();
                var currentday = currentDateTime.getDate().toString();
                var month = currentDateTime.getMonth();
                var currentMonth = (month + 1).toString();
                var currentYear = currentDateTime.getFullYear().toString();
                var todayDate = currentday + "/" + currentMonth + "/" + currentYear;

                var sendersId = userID;
                $http.get("/reply/"+userSenderDetails.sendersId).success(function(response){
//                    console.log(response);

                    scope.messageobj.date = todayDate;
                    scope.messageobj.from = userSenderDetails.to;
                    scope.messageobj.to = userSenderDetails.from;
                    scope.messageobj.message = reply;
                    scope.messageobj.sendersId = userID;

                    // msg generated
                    var msgSent = scope.messageobj;
//                    console.log(scope.messageobj);

                    //push the object
                    response.message.push(scope.messageobj);

                    $http.put("/updateAfterReply/"+userSenderDetails.sendersId, response).success(function(updatedResponse){
//                        console.log(updatedResponse);
                    });

                });

                this.message = "";
                this.allMsg();

            }

        }

    }]);

})();