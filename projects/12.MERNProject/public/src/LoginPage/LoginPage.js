import React from "react";
import axios from "axios";

class LoginPage extends React.Component {

    constructor(){
        super();
        this.state = {
            userInfoArray : [],
            successfull_user_details : {}
        }
    }

    componentWillMount() {
        this.firebaseRef = new Firebase("https://shopifydemoapp.firebaseio.com/userInfo");
        var that = this;
        this.firebaseRef.once("value", function(snapshot){

            var AllUserInfo = [];

            snapshot.forEach(function(data){

                var User = {
                    firstname : data.val().firstname,
                    lastname : data.val().lastname,
                    email : data.val().email,
                    password : data.val().password,
                    confirmpassword : data.val().confirmpassword
                }

                AllUserInfo.push(User);
                that.setState({ userInfoArray : AllUserInfo });
                // console.log(that.state.userInfoArray);
            });
        });
    }



    handleLogin(e){
        e.preventDefault();

        var email_login =  this.refs.loginEmail.value;
        var password_login =  this.refs.loginPassword.value;

        var arrayLength = this.state.userInfoArray.length;

        for(let i = 0; i < arrayLength; i++){
            if(this.state.userInfoArray[i].email === email_login){
                console.log("Username matched!!!");
                if(this.state.userInfoArray[i].confirmpassword === password_login){
                    console.log("Password also matched");

                    this.setState({
                        successfull_user_details : this.state.userInfoArray[i]
                    });

                    this.props.router.push("/question");

                    break;
                }else{
                    console.log("Password did not matched...please try again");
                }
            }else{
                console.log("Username did not matched!!!");
            }
        }

    }

    render(){
        return(
            <div>
                <div className="container-fluid">
                    <form className="form-horizontal" onSubmit={this.handleLogin.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="email" className="control-label col-md-2">Email</label>
                            <div className="col-md-10">
                                <input type="email" placeholder="Email" id="email" className="form-control" ref="loginEmail" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="control-label col-md-2">Password</label>
                            <div className="col-md-10">
                                <input type="password" placeholder="Password" id="password" className="form-control" ref="loginPassword" />
                            </div>
                        </div>
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

module.exports = LoginPage;
