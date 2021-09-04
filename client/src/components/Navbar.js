import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../assets/css/modal.css"
import LoginModal from './LoginModal';
import useLoginModal from '../assets/js/useLoginModal';
import SignupModal from './SignUpModal';
import useSignupModal from '../assets/js/useSignupModal';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

export default function LoggedIn() {

    const { isLoginShowing, toggleLogin } = useLoginModal();
    const { isSignupShowing, toggleSignup } = useSignupModal();

    const [loginFormState, setLoginFormState] = useState({ email: '', password: '' });
    const [signupFormState, setSignupFormState] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        location: '',
      });
    
      const [addUser, { error, data }] = useMutation(ADD_USER);
      const [login, { err, dat }] = useMutation(LOGIN_USER);
    
      const loginHandleChange = (event) => {
        const { name, value } = event.target;
        setLoginFormState({
          ...loginFormState,
          [name]: value,
        });
      };

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
    const loginHandleFormSubmit = async (event) => {
        event.preventDefault();
        try {
          const mutationResponse = await login({
            variables: { email: loginFormState.email, password: loginFormState.password },
          });
          const token = mutationResponse.data.login.token;

          let username = mutationResponse.data.login.user.username;
          localStorage.setItem('username', username);

          console.log(mutationResponse.data.login.user.username)
          console.log(username)

          window.location.assign('/dashboard/'+ username);

          Auth.login(token);
          toggleLogin();
        } catch (e) {
          console.log(e);
        }
      };
    // submit form
    const signupHandleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(signupFormState);

        try {
        const { data } = await addUser({
            variables: { ...signupFormState },
        });

        console.log("Data from signup: ")
        console.log(data.addUser.user.username);

        let username = data.addUser.user.username;

        localStorage.setItem('username', username);


        //authenticates user
        Auth.login(data.addUser.token);

        window.location.assign('/dashboard/'+ username);

        //hides the signup modal
        toggleSignup();

        } catch (e) {
        console.error(e);

        }
    };


    if(Auth.loggedIn()) {

        const currentUsername = localStorage.getItem('username')

        return (
            <div className="navbar-nav level-right">
                <li className="nav-item">
                    <Link className="nav-link" to="/browse">Browse</Link>
                    {/* <Link className="nav-link" to="/api/items">Browse</Link> */}
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`/dashboard/${currentUsername}`}>My Bounty</Link>
                    {/* <Link className="nav-link" to="/dashboard">My Bounty</Link> */}
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Cart</Link>
                    {/* <Link className="nav-link" to="/api/cart">Cart</Link> */}
    
                </li>
                <li className="nav-item">
                    <Link className="nav-link" id = "logout" to="/" onClick={() => Auth.logout()}>Logout</Link>
                    {/* <Link className="nav-link" id = "logout" href="#">Logout</Link> */}
    
                </li>
            </div>
        )
    } 
    
    else {


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

                <LoginModal isLoginShowing={isLoginShowing} hide={toggleLogin} loginFormState={loginFormState} loginHandleChange={loginHandleChange} loginHandleFormSubmit={loginHandleFormSubmit}/>
                <SignupModal isSignupShowing={isSignupShowing} hide={toggleSignup}  signupFormState={signupFormState} signupHandleChange={signupHandleChange} signupHandleFormSubmit={signupHandleFormSubmit} />

            </div>

    )
    }
    
    
}