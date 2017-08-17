import React from "react";
import axios from "axios";

import AccountHeader from "../AccountHeader/AccountHeader";

class AddQuestionPage extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillMount() {
        this.firebaseRef = new Firebase("https://shopifydemoapp.firebaseio.com/userQuestions");
    }

    submitQuestion(e){
        e.preventDefault();

        var question = {
            question: this.refs.formQuestion.value,
            option1: {
                option: this.refs.formOption1.value,
                polls : 1
            },
            option2: {
                option: this.refs.formOption2.value,
                polls : 1
            },
            option3: {
                option: this.refs.formOption3.value,
                polls : 1
            },
            option4: {
                option: this.refs.formOption4.value,
                polls : 1
            },
            totalPolls : 4
        };

        this.firebaseRef.push(question);
    }

    backToProfile(e){
        e.preventDefault();
        setTimeout(()=>{
            this.props.router.push("/question");
        },300);
    }

    render(){
        return(
            <div className="container-fluid">
                <AccountHeader />
                <div className="text-center well">
                    <h2 className="text-danger">Confuse with options in Life?.......Lets Vote it up!</h2>
                </div>
                <div className="col-md-11 text-center">
                    <form className="form-horizontal" onSubmit={this.submitQuestion.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="question" className="control-label col-md-2">Enter Question</label>
                            <div className="col-md-10">
                                <input type="text" placeholder="Enter Question" id="question" className="form-control" ref="formQuestion" />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-offset-2 col-md-8">
                                <div className="form-group">
                                    <label htmlFor="option1" className="control-label col-md-2">Option 1</label>
                                    <div className="col-md-10">
                                        <input type="text" placeholder="Enter Option 1" id="option1" className="form-control" ref="formOption1" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="option2" className="control-label col-md-2">Option 2</label>
                                    <div className="col-md-10">
                                        <input type="text" placeholder="Enter Option 2" id="option2" className="form-control" ref="formOption2" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="option3" className="control-label col-md-2">Option 3</label>
                                    <div className="col-md-10">
                                        <input type="text" placeholder="Enter Option 3" id="option3" className="form-control" ref="formOption3" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="option4" className="control-label col-md-2">Option 4</label>
                                    <div className="col-md-10">
                                        <input type="text" placeholder="Enter Option 4" id="option4" className="form-control" ref="formOption4" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-offset-5 col-md-3 text-center">
                                <br />
                                <button className="btn btn-block btn-primary" type="submit" data-toggle="modal" data-target="#myModal">Create</button>
                            </div>
                        </div>
                    </form>

                    <div id="myModal" className="modal fade" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title text-success">Poll Successfully Created...!!!</h4>
                                </div>
                                <div className="modal-body">
                                    <p className="text-info">Thank you for creating a poll. Please logout and check the poll on the dashboard.</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.backToProfile.bind(this)}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = AddQuestionPage;
