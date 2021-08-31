import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/css/modal.css"
import logo from "../assets/images/b-logo.png";
import LoginModal from '../components/LoginModal';
import useLoginModal from '../assets/js/useLoginModal';
import SignupModal from '../components/SignUpModal';
import useSignupModal from '../assets/js/useSignupModal';


export default function LoggedIn() {
    const loggedIn = false;

    const { isLoginShowing, toggleLogin } = useLoginModal();
    const { isSignupShowing, toggleSignup } = useSignupModal();


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
                <SignupModal isSignupShowing={isSignupShowing} hide={toggleSignup} />

            </div>

    )
    }
    
    
}