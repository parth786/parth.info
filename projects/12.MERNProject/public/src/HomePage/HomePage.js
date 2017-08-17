import React from "react";

class HomePage extends React.Component {
    render(){
        return(
            <div>
                <div className="container-fluid text-center jumbotron">
                    <h1><span className="glyphicon glyphicon-flash text-primary"></span>&nbsp;<span className="text-danger">Vote Plus</span></h1>
                    <p className="text-muted">Please login and create a Public Voting Poll...!!!</p>
                    <div>
                        <Link className="btn btn-default" to="/login">Login</Link>
                        &nbsp;&nbsp;&nbsp;
                        <Link className="btn btn-default" to="/signup">Signup</Link>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = HomePage;
