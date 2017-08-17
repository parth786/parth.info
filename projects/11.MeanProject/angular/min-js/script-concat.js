var ang = angular.module("myapp", ["ngRoute","ngAnimate"]);

ang.config(['$routeProvider', function($routeProvider){

    $routeProvider
        .when('/home', {
        templateUrl : "views/home.html",
        controller : "homeCtrl as home"
    })
        .when('/contact', {
        templateUrl : "views/contact.html"
    })
        .when('/login', {
        templateUrl : "views/login-Form.html",
        controller : "loginCtrl as login"
    })
        .when('/success', {
        templateUrl : "views/success-message.html",
        controller : "homeCtrl as home"
    })
        .when('/signup', {
        templateUrl : "views/signup-form.html",
        controller: "signupCtrl as signup"
    })
        .when('/profile', {
        templateUrl : "views/profile.html",
        controller : "profileCtrl as profile"
    })
        .when('/message', {
        templateUrl : "views/chat-message.html",
        controller: "chatCtrl as chat"
    })
        .when('/viwMsgScreen', {
        templateUrl : "views/viewMessageScreen.html",
        controller: "viewCtrl as view"
    })
        .otherwise({
        redirectTo: "/home"
    });
}]);


(function(){
    ang.controller("accountHeader", [function(){

        this.logout = function(){
            localStorage.removeItem("userId");
        }

    }]);
})();
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
        
        setInterval(function(){
            refresh();
        },5000);
                


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
//homepage Controller

(function(){

    ang.controller("homeCtrl", ["$location", function($location){

        
        this.loginPageTransfer = function(){
            $location.path("login");
        }

        this.signupPageTransfer = function(){
            $location.path("signup");
        }

    }]);

})();

(function(){

    ang.controller("loginCtrl", ["$http","$location", function($http, $location){

        var scope = this;

        this.validateUserDetails = function(){

            $http.post("/login", scope.customer).success(function(response){

//                console.log("_id: " + response);

                if(response == ""){
                    alert("Please enter a valid Username and Password");
                }else{

                    if(localStorage !== undefined){
                        localStorage.setItem("userId", response);
                    }else{
                        alert("Local storage not available at your computer");
                    }

                    $location.path("profile");
                }
            });

        };

    }]);

})();

(function(){
    ang.controller("profileCtrl", ["$http", function($http){

        this.editMode = false;
        var scope = this;

        this.trigerEditMode = function(){
            this.editMode = !this.editMode;
        }

        if(localStorage !== "undefined"){

            if(localStorage.getItem("userId")){

                var userId = localStorage.getItem("userId");
//                console.log(userId);

                $http.get("/profile/" + userId).success(function(response){
//                    console.log(response);

                    scope.userProfile = response;

                });

            }else{
                window.alert("There is no data in local storage");                     
            }

        }else{
            window.alert("Local storage not available at your computer");
        }


        this.saveUpdatedInfo = function(){

            var updatedInfo = scope.userProfile;
//            console.log(updatedInfo);
            var id = updatedInfo._id;

            $http.put("/update" + id , updatedInfo).success(function(response){
//                console.log(response);
                scope.userProfile = response;
            });

            scope.trigerEditMode();

        }

    }]);

})();
// signup-controller
(function(){

    ang.controller("signupCtrl", ["$location","$http", function($location, $http){

        var scope = this;

        this.validateInput = function(){

            var firstname = this.user.firstname;
            var lastname = this.user.lastname;
            var username = this.user.username;
            var email = this.user.email;
            var password = this.user.password;
            var confirmPassword = this.user.confirmPassword;

            // validate input fields
            // check if firstname is not number or symbols and length <= 20

            var pattern1 = new RegExp(/[~`!#$%\^&*@+=\-\[\]\\';.,/{}|\\":<>\?]/);
            var pattern2 = new RegExp(/[0-9]/);

            var firstNameLength = firstname.length;

            if (pattern1.test(firstname) || pattern2.test(firstname) || firstNameLength >= 20) {
                document.getElementById("invalidFirstname").setAttribute("style","display:;");
            }else{
                if(document.getElementById("invalidFirstname").getAttribute("style") == "display:;"){
                    document.getElementById("invalidFirstname").setAttribute("style","display:none;");
                }
            }

            // check if lastname is not number or symbols and length <= 20

            var lastNameLength = lastname.length;

            if (pattern1.test(lastname) || pattern2.test(lastname) || lastNameLength >= 20) {
                document.getElementById("invalidLastname").setAttribute("style","display:;");
            }else{
                if(document.getElementById("invalidLastname").getAttribute("style") == "display:;"){
                    document.getElementById("invalidLastname").setAttribute("style","display:none;");
                }
            }

            // check if lastname is not number or symbols and length <= 20

            var usernameLength = username.length;

            if (usernameLength > 20) {
                document.getElementById("invalidusername").setAttribute("style","display:;");
            }else{
                if(document.getElementById("invalidusername").getAttribute("style") == "display:;"){
                    document.getElementById("invalidusername").setAttribute("style","display:none;");
                }
            }

            // check for valid email has "@" and ".com"

            var emailLength = email.length;
            var CheckEmail1 = email.includes("@");

            if(email == ""){
                document.getElementById("invalidEmail").setAttribute("style","display:none;");
            }else{
                if (!CheckEmail1) {
                    document.getElementById("invalidEmail").setAttribute("style","display:;");
                }else{

                    if(document.getElementById("invalidEmail").getAttribute("style") == "display:;"){
                        document.getElementById("invalidEmail").setAttribute("style","display:none;");
                    }
                }
            }

            // check for password length (min 6 - max 15)

            var passwordLength = password.length;

            if(password == ""){
                document.getElementById("invalidPassword").setAttribute("style","display:none;");
            }else{
                if (passwordLength < 6 || passwordLength > 15) {
                    document.getElementById("invalidPassword").setAttribute("style","display:;");
                }else{
                    if(document.getElementById("invalidPassword").getAttribute("style") == "display:;"){
                        document.getElementById("invalidPassword").setAttribute("style","display:none;");
                    }
                }
            }
            // check if password === confirm password

            if(confirmPassword == ""){
                document.getElementById("invalidConfirmPassword").setAttribute("style","display:none;");
            }else{
                if (confirmPassword != password) {
                    document.getElementById("invalidConfirmPassword").setAttribute("style","display:;");
                }else{
                    if(document.getElementById("invalidConfirmPassword").getAttribute("style") == "display:;"){

                        document.getElementById("invalidConfirmPassword").setAttribute("style","display:none;");


                    }
                }
            }


            // functions

            function saveToDb(){

                scope.user.message = [];

                $http.post("/signup", scope.user).success(function(response){
                    //                console.log(response)
                    $location.path("success");
                });
            }         
            

            function validation(){

                if(document.getElementById("invalidFirstname").getAttribute("style") == "display:;"){
                    return alert("Invalid Firstname");
                }else if(document.getElementById("invalidLastname").getAttribute("style") == "display:;"){
                    return alert("Invalid Lastname");
                }else if(document.getElementById("invalidusername").getAttribute("style") == "display:;"){
                    return alert("Invalid Username");
                }else if(document.getElementById("invalidEmail").getAttribute("style") == "display:;"){
                    return alert("Invalid Email");
                }else if(document.getElementById("invalidPassword").getAttribute("style") == "display:;"){
                    return alert("Invalid Password");
                }else if(document.getElementById("invalidConfirmPassword").getAttribute("style") == "display:;"){
                    return alert("Invalid Password");
                }else if(document.getElementById("userNameAlreadyUsed").getAttribute("style") == "display:;"){
                    return alert("User already exists!!!");
                }else if(document.getElementById("emailAlreadyUsed").getAttribute("style") == "display:;"){
                    return alert("Email already used!!!");
                }else{
                    return saveToDb();
                }
            }


            function emailValidate(){

                $http.get("/userEmail/" + email).success(function(response1){

                    if(response1.email === email){

                        return document.getElementById("emailAlreadyUsed").setAttribute("style","display:;");

                    }else if(response1 === 0){

                        if(document.getElementById("emailAlreadyUsed").getAttribute("style") == "display:;"){

                            document.getElementById("emailAlreadyUsed").setAttribute("style","display:none;");

                            return validation();

                        }else{
                            return validation();
                        }
                    }
                });
            }


            function userValidate(){

                $http.get("/username/" + username).success(function(response){

                    if(response.username === username){

                        return document.getElementById("userNameAlreadyUsed").setAttribute("style","display:;");

                    }else if(response === 0){

                        if(document.getElementById("userNameAlreadyUsed").getAttribute("style") == "display:;"){

                            document.getElementById("userNameAlreadyUsed").setAttribute("style","display:none;");

                            return emailValidate();
                        }else{
                            return emailValidate();
                        }
                    }
                });
            }

            // validate if username already exist in the database
            userValidate();



            


        };

    }]);

})();


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