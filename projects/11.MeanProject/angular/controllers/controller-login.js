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
