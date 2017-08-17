import React from "react";
import axios from "axios";
import Header from "../header/Header";

var PieChart = rd3.PieChart;

class Dashboard extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            questions : []
        }
    }

    componentWillMount(){
        this.firebaseRef = new Firebase("https://shopifydemoapp.firebaseio.com/userQuestions");
        var that = this;
        this.firebaseRef.once("value", function(snapshot){

            var databaseOfQuestions = [];

            snapshot.forEach(function(data){
                var question = {
                    _id : data.kc.path.n[1],
                    question: data.val().question,
                    option1: {
                        option: data.val().option1.option,
                        polls : data.val().option1.polls
                    },
                    option2: {
                        option: data.val().option2.option,
                        polls : data.val().option2.polls
                    },
                    option3: {
                        option: data.val().option3.option,
                        polls : data.val().option3.polls
                    },
                    option4: {
                        option: data.val().option4.option,
                        polls : data.val().option4.polls
                    },
                    totalPolls : data.val().totalPolls
                }

                databaseOfQuestions.push(question);
                that.setState({ questions : databaseOfQuestions });
            });
        });
    }

    handleVote(e){
        e.preventDefault();
        this.firebaseRef = new Firebase("https://shopifydemoapp.firebaseio.com/userQuestions");
        var refId = e.target.id;
        var objects = this.refs;
        var inputValue = objects[refId].value;


        var userQuestions = this.state.questions;

        var userQuestionsLength = userQuestions.length;

        for(let i=0; i < userQuestionsLength; i++){
            // console.log(refId);
            // console.log(this.state.questions[i]._id);
            if(userQuestions[i]._id === refId){
                if(userQuestions[i].option1.option === inputValue){

                    userQuestions[i].option1.polls = userQuestions[i].option1.polls + 1;
                    userQuestions[i].totalPolls = userQuestions[i].totalPolls + 1;

                    break;

                }else if (userQuestions[i].option2.option === inputValue) {

                    userQuestions[i].option2.polls = userQuestions[i].option2.polls + 1;
                    userQuestions[i].totalPolls = userQuestions[i].totalPolls + 1;

                    break;

                }else if (userQuestions[i].option3.option === inputValue) {

                    userQuestions[i].option3.polls = userQuestions[i].option3.polls + 1;
                    userQuestions[i].totalPolls = userQuestions[i].totalPolls + 1;

                    break;

                }else{

                    userQuestions[i].option4.polls = userQuestions[i].option4.polls + 1;
                    userQuestions[i].totalPolls = userQuestions[i].totalPolls + 1;

                    break;
                }
            }else{
                console.log("Not Found");
            }

        }

        this.setState({
            questions : userQuestions
        });

        this.firebaseRef.remove();
        userQuestions.forEach((data)=>{
            this.firebaseRef.push(data);
            // console.log(data);
        })

    }

    render(){
        return(
            <div>
                <Header />
                <div className="container-fluid">
                    <h1 className="text-center text-muted"><span className="glyphicon glyphicon-hand-down"></span>&nbsp; Give Your Vote &nbsp; <span className="glyphicon glyphicon-hand-down"></span></h1>
                    <div className="row">
                        {this.state.questions.map((question,i) => {
                            return <div key={question._id} className="well">
                                <div className="col-md-6">
                                    <form onSubmit={this.handleVote.bind(this)} id={question._id}>
                                        <h3><span className="glyphicon glyphicon-fire"></span>&nbsp; {question.question}</h3>
                                        <br />
                                        <div className="form-group">
                                            <select className="form-control" ref={question._id}>
                                                <option value={question.option1.option}>{question.option1.option}</option>
                                                <option value={question.option2.option}>{question.option2.option}</option>
                                                <option value={question.option3.option}>{question.option3.option}</option>
                                                <option value={question.option4.option}>{question.option4.option}</option>
                                            </select>
                                        </div>
                                        <br />
                                        <div className="text-center">
                                            <button className="btn btn-info btn-lg" type="submit">Vote it...!!!</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="text-center">
                                    <PieChart
                                        data={[{label: question.option1.option , value: (question.option1.polls/question.totalPolls)*100}, {label: question.option2.option , value: (question.option2.polls/question.totalPolls)*100}, {label: question.option3.option , value: (question.option3.polls/question.totalPolls)*100 }, {label: question.option4.option , value: (question.option4.polls/question.totalPolls)*100 }]}
                                        width={450}
                                        height={400}
                                        radius={110}
                                        innerRadius={20}
                                        sectorBorderColor="white"
                                        title={"Total votes - " + (question.totalPolls - 4)} />
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            );
        }
    }

    module.exports = Dashboard;
