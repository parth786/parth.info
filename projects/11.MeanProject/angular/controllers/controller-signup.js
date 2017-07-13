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

