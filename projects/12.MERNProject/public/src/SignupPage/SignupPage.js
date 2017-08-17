import React from "react";
import { Link } from "react-router";
import axios from "axios";

class SignupPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userInfoArray: []
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

    submitform(e){
        e.preventDefault();

        var UpdatedState = {
            firstname : this.refs.firstname.value,
            lastname : this.refs.lastname.value,
            email : this.refs.email.value,
            password : this.refs.password.value,
            confirmpassword : this.refs.confirmpassword.value
        }

        this.firebaseRef.push(UpdatedState);

        this.refs.firstname.value = "";
        this.refs.lastname.value = "";
        this.refs.email.value = "";
        this.refs.password.value = "";
        this.refs.confirmpassword.value = "";
    }

    transferToLogin(e){
        e.preventDefault();
        setTimeout(()=>{
            this.props.router.push("/login");
        },300);
    }


    render(){
        return(
            <div>
                <div className="container-fluid">
                    <form className="form-horizontal" onSubmit={this.submitform.bind(this)} >
                        <div className="form-group">
                            <label htmlFor="firstName" className="control-label col-md-2">First Name</label>
                            <div className="col-md-10">
                                <input type="text" placeholder="First Name" id="firstName" className="form-control" ref="firstname" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName" className="control-label col-md-2">Last Name</label>
                            <div className="col-md-10">
                                <input type="text" placeholder="Last Name" id="lastName" className="form-control" ref="lastname" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="control-label col-md-2">Email</label>
                            <div className="col-md-10">
                                <input type="email" placeholder="Email" id="email" className="form-control" ref="email" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="control-label col-md-2">Password</label>
                            <div className="col-md-10">
                                <input type="password" placeholder="Password" id="password" className="form-control" ref="password" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="control-label col-md-2">Confirm Password</label>
                            <div className="col-md-10">
                                <input type="password" placeholder="Confirm Password" id="confirmPassword" className="form-control" ref="confirmpassword" />
                            </div>
                        </div>

                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit" className="btn btn-danger btn-block" data-toggle="modal" data-target="#myModal">Submit</button>
                        </div>
                    </form>
                </div>

                <div id="myModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title text-success">Successfull Signup...!!!</h4>
                            </div>
                            <div className="modal-body">
                                <h4 className="text-info">Thank you for creating an account.</h4>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-info pull-left" data-dismiss="modal" onClick={this.transferToLogin.bind(this)}>Login</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = SignupPage;
