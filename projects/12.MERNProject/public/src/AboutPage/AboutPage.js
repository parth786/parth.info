import React from "react";

class AboutPage extends React.Component {
    render(){
        return(
            <div>
                <div className="container-fluid jumbotron">
                    <div className="text-muted">
                        <h2 className="text-center"><span className="glyphicon glyphicon-flash text-primary"></span>&nbsp; <span className="text-danger">Vote Plus</span></h2>
                        <br />
                        <p className="text-muted text-center">Vote Plus is a MERN stack application...!!!</p>

                        <p className="text-muted text-center">If you like the application please send me an email at <span className="text-danger">p_pathak@outlook.com</span> and give your review or any suggestion to improve it further.</p>
                        <br />
                        <p className="text-muted"><b>Owner - </b>PARTH PATHAK</p>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = AboutPage;
