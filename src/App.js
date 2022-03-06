import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import QuizStart from "./components/QuizStart";
import SubjectiveStart from "./components/SubjectiveStart";
import DashboardStart from "./components/DashboardStart";
import Tests from "./components/Tests";
import Login from './components/Login'
import Account from './components/Account'
import Assignments from './components/Assignments'
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from "./utils/PrivateRoute";


export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <PrivateRoute exact path="/objective/:id" component={QuizStart}/>
                    <PrivateRoute exact path="/subjective/:id" component={SubjectiveStart}/>
                    <PrivateRoute exact path="/" component={DashboardStart}/>
                    <PrivateRoute exact path="/tests" component={Tests}/>
                    <PrivateRoute exact path="/assn" component={Assignments}/>
                    <Route exact path="/login" component={Login}/>
                    <PrivateRoute exact path="/account" component={Account}/>
                </Switch>
            </div>
        </Router>
    );
}
