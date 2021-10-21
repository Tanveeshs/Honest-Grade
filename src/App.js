import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import QuizStart from "./components/QuizStart";
import SubjectiveStart from "./components/SubjectiveStart";

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
                </Switch>
            </div>
        </Router>
    );
}