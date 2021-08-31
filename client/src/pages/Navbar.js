import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "../assets/css/modal.css"
import LoginModal from '../components/LoginModal';
import useLoginModal from '../assets/js/useLoginModal';
import SignupModal from '../components/SignUpModal';
import useSignupModal from '../assets/js/useSignupModal';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

export default function LoggedIn() {
    const [loggedIn, setLoggedIn] = useState(false);
    const history = useHistory();

    const { isLoginShowing, toggleLogin } = useLoginModal();
    const { isSignupShowing, toggleSignup } = useSignupModal();

    const [signupFormState, setSignupFormState] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        location: '',
      });
      const [addUser, { error, data }] = useMutation(ADD_USER);
    
      // update state based on form input changes
    const signupHandleChange = (event) => {
        const { name, value } = event.target;
        console.log("Name: " + name)
        console.log("Value: " + value)

        setSignupFormState({
        ...signupFormState,
        [name]: value,
        });

    };

    // submit form
    const signupHandleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(signupFormState);

        try {
        const { data } = await addUser({
            variables: { ...signupFormState },
        });

        //authenticates user
        Auth.login(data.addUser.token);

        //hides the signup modal
        toggleSignup();

        //set's logged in to true so the navbar will display correct headings
        setLoggedIn(true);

        //redirects the user to their personal dashboard
        history.push(`/dashboard`);

        } catch (e) {
        console.error(e);

        }
    };


    if(loggedIn) {
        return (
            <div className="navbar-nav level-right">
                <li className="nav-item">
                    <Link className="nav-link" to="/browse">Browse</Link>
                    {/* <Link className="nav-link" to="/api/items">Browse</Link> */}
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">My Bounty</Link>
                    {/* <Link className="nav-link" to="/dashboard">My Bounty</Link> */}
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Cart</Link>
                    {/* <Link className="nav-link" to="/api/cart">Cart</Link> */}
    
                </li>
                <li className="nav-item">
                    <Link className="nav-link" id = "logout" to="/">Logout</Link>
                    {/* <Link className="nav-link" id = "logout" href="#">Logout</Link> */}
    
                </li>
            </div>
        )
    } 
    
    if(!loggedIn) {


        return (
            <div className="navbar-nav level-right">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" 
                onClick={toggleLogin}
                    style={{width: "auto"}} href="#">Log in </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id = "logout" >or</a>
                </li>
                <li className="nav-item nav-link active">
                    <a className="" aria-current="page" 
                    onClick={toggleSignup}
                        style={{width: "auto"}} href="#">Sign up</a>
                </li>

                <LoginModal isLoginShowing={isLoginShowing} hide={toggleLogin} />
                <SignupModal isSignupShowing={isSignupShowing} hide={toggleSignup}  signupFormState={signupFormState} signupHandleChange={signupHandleChange} signupHandleFormSubmit={signupHandleFormSubmit} />

            </div>

    )
    }
    
    
}