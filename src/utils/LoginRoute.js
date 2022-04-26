import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const LoginRoute = ({component: Component, ...rest}) => {
    let studentDetails = localStorage.getItem("user_details");

    return (
        <Route {...rest} render={props => (
            studentDetails===null ?
                <Component {...props} />
                : <Redirect to="/" />
        )} />
    );
};

export default LoginRoute;
