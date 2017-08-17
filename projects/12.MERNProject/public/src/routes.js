import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute , browserHistory } from "react-router";

import App from "./app";
import HomePage from "./HomePage/HomePage";
import AboutPage from "./AboutPage/AboutPage";
import ContactUsPage from "./ContactUsPage/ContactUsPage";
import LoginPage from "./LoginPage/LoginPage";
import SignupPage from "./SignupPage/SignupPage";
import AddQuestionPage from "./AddQuestionPage/AddQuestionPage";
import Dashboard from "./Dashboard/Dashboard";

ReactDOM.render(
    <div>
        <Router history={browserHistory} >
            <Route path="/" component={App} >
                <IndexRoute component={HomePage} />
                <Route path="about" component={AboutPage} />
                <Route path="contact" component={ContactUsPage} />
                <Route path="login" component={LoginPage} />
                <Route path="signup" component={SignupPage} />
                <Route path="publicPolls" component={Dashboard} />
                <Route path="question" component={AddQuestionPage} />
            </Route>
        </Router>

    </div>
    , document.getElementById('root'));
