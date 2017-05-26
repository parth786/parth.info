// signup-controller
(function(){

    ang.controller("signupCtrl", ["$location","$http", function($location, $http){

        var scope = this;
        
        this.validateInput = function(){
            
            scope.user.message = [];
            
            $http.post("/signup", scope.user).success(function(response){
//                console.log(response);
                $location.path("success");
            });

        };

    }]);

})();

