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
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from "./utils/PrivateRoute";

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
                    <PrivateRoute exact path="/objective/:id" exact>
                        <QuizStart/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/subjective/:id">
                        <SubjectiveStart/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/">
                        <DashboardStart/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/tests">
                        <Tests/>
                    </PrivateRoute>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <PrivateRoute exact path="/account">
                        <Account/>
                    </PrivateRoute>
                    
                    <PrivateRoute exact path="/home">
                        <DashboardStart/>
                    </PrivateRoute>
                </Switch>
            </div>
        </Router>
    );
}
