import React, {useState} from 'react';
import axios from 'axios';
import '../assets/login.css';
import { withRouter } from "react-router-dom";
import {useAlert} from "react-alert";

function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null
    })
    const alert = useAlert()
    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload={
            "userID":state.email,
            "password":state.password,
        }
        axios.post("https://honestgrade.herokuapp.com/student/login", payload)
            .then(function (response) {
                if(response.data.success === 1){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    localStorage.setItem("user_details",JSON.stringify(response.data.student));
                    redirectToHome();

                }
                else if(response.data.success === -10){
                    alert.show("Username and password do not match");
                }
                else{

                    alert.show("Some error occurred");
                }
            })
            .catch(function (error) {
                console.log(error);
                alert.show("Some error occurred");

            });
    }
    const redirectToHome = () => {
        props.history.push('/home');
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center center">
            <h1>Login</h1>
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input type="email"
                           className="form-control"
                           id="email"
                           aria-describedby="emailHelp"
                           placeholder="Enter Username"
                           value={state.email}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           placeholder="Password"
                           value={state.password}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-check">
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
        </div>
    )
}

export default withRouter(LoginForm);
