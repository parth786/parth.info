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
