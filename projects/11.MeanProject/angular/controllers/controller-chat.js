(function(){

    ang.controller("chatCtrl", ["$http","$location","$rootScope", function($http, $location, $rootScope){

        var scope = this;      

        if(localStorage.getItem("userId")){

            var userID = localStorage.getItem("userId");

        }else{

            alert("User not logged-in. Please login again");
            $location.path("/home");

        }

        function refresh(){

            return $http.post("/getUserInfo/" + userID).success(function(response){

                scope.userINFO = response;

                // view all msg in Inbox

                scope.inboxMessages = response.message.reverse();

            });

        }

        refresh();


        // create flag to switch the views 

        this.flag = false;

        this.changeFlag = function(){
            this.flag = !this.flag;
        }


        this.sendMsg = function(){

            //            console.log(scope.userINFO);

            // store user email
            var userEmail = scope.userINFO.email;

            // store current date and time
            var currentDateTime = new Date();
            var currentday = currentDateTime.getDate().toString();
            var month = currentDateTime.getMonth();
            var currentMonth = (month + 1).toString();
            var currentYear = currentDateTime.getFullYear().toString();
            var todayDate = currentday + "/" + currentMonth + "/" + currentYear;

            scope.message.date = todayDate;
            scope.message.from = userEmail;
            scope.message.sendersId = userID;

            // msg generated
            var msgSent = scope.message;
            //            console.log(msgSent);

            // receivers email
            var sendTo = scope.message.to;

            //            console.log(sendTo);

            $http.post("/msgReceiver/" + sendTo).success(function(response){
                //                console.log(response);

                scope.receiversInfo = response;

                if(scope.receiversInfo == ""){

                    alert("Please enter a valid Email");

                }else{

                    scope.receiversInfo.message.push(msgSent);

                    $http.put("/sendMsg/" + scope.receiversInfo._id, scope.receiversInfo).success(function(response){
                        //                        console.log(response);

                        scope.message = "";

                        scope.changeFlag();

                        refresh();

                    });
                }
            });

        }

        // vew message
        
        this.viewMsg = function(index){

            var Viewfrom = scope.userINFO.message[index].from;
            var Viewto = scope.userINFO.message[index].to;
            var Viewmessage = scope.userINFO.message[index].message;
            var Viewdate = scope.userINFO.message[index].date;
            var ViewSenderId = scope.userINFO.message[index].sendersId;

            $rootScope.viewRow = {
                from : Viewfrom,
                to : Viewto,
                message : Viewmessage,
                date : Viewdate,
                sendersId : ViewSenderId
            }

//            console.log(index);

            $location.path("/viwMsgScreen");

        }


        this.deleteMsg = function(index){
//            console.log(index);
            scope.userINFO.message.splice(index,1);            

            $http.put("/deleteRequest/" + userID, scope.userINFO).success(function(response){
//                console.log(response);
            });

        }

    }]);

})();