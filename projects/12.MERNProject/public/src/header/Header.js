import React from "react";
import { Link } from "react-router";

class Header extends React.Component {
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
                            <Link className="navbar-brand" to="/"><span className="glyphicon glyphicon-flash"></span>&nbsp; Vote Plus</Link>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/publicPolls"><span className="glyphicon glyphicon-globe"></span>&nbsp; Public Polls</Link></li>
                                <li><Link to="/signup"><span className="glyphicon glyphicon-user"></span>&nbsp; Sign Up</Link></li>
                                <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span>&nbsp; Login</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

module.exports = Header;
