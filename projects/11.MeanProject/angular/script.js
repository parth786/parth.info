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

