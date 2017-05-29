(function(){
    ang.controller("accountHeader", [function(){

        this.logout = function(){
            localStorage.removeItem("userId");
        }

    }]);
})();