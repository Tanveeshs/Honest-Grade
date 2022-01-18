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
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return (
        <Router>
            <div>
                {/*<nav>*/}
                {/*    <ul>*/}
                {/*        <li>*/}
                {/*            <Link to="/objective">Objective</Link>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <Link to="/subjective">Subjective</Link>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</nav>*/}
                <Switch>
                    <Route path="/objective">
                        <QuizStart/>
                    </Route>
                    <Route path="/subjective">
                        <SubjectiveStart/>
                    </Route>
                    <Route path="/" exact>
                        <DashboardStart/>
                    </Route>
                    <Route path="/tests">
                        <Tests/>
                    </Route>
                    <Route path="/login" exact>
                        <Login/>
                    </Route>

                    <Route path="/home" exact>
                        <DashboardStart/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
