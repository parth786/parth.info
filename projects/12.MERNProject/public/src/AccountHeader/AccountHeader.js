import React from "react";
import { Link } from "react-router";

class AccountHeader extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <span className="navbar-brand"><span className="glyphicon glyphicon-flash"></span>&nbsp; Vote Plus</span>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav">
                                <li><Link to="/question">Question</Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/"><span className="glyphicon glyphicon-log-out"></span>&nbsp; Logout</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

module.exports = AccountHeader;
