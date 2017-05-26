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