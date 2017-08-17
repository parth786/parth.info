import React from "react";
import { Link } from "react-router";
import Header from "./header/Header";

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="container-fluid">
                <Header />
                {this.props.children}
            </div>
        );
    }
}

module.exports = App;
