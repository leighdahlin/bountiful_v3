import React from 'react';
import ReactDOM from 'react-dom';

import logo from "../assets/images/b-logo.png";


const SignupModal = ({ isSignupShowing, hide, signupFormState, signupHandleFormSubmit, signupHandleChange }) => isSignupShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <div id="signup-modal" className="modal">
            <form
            className="modal-content animate signup-form"
            onSubmit={signupHandleFormSubmit}
            >
            <div className="imgcontainer">
                <span
                onClick={hide}
                className="close"
                title="Close Modal"
                >&times;</span>
                <img src={logo} alt="bountiful logo" className="avatar" />
            </div>

            <div className="container">
                <label htmlFor="firstname-signup"><b>First Name</b></label>
                <input
                id="firstname-signup"
                type="text"
                placeholder="Enter First Name"
                name="first_name"
                value={signupFormState.first_name}
                onChange={signupHandleChange}
                required
                />

                <label htmlFor="lastname-signup"><b>Last Name</b></label>
                <input
                id="lastname-signup"
                type="text"
                placeholder="Enter Last Name"
                name="last_name"
                value={signupFormState.last_name}
                onChange={signupHandleChange}
                required
                />

                <label htmlFor="username-signup"><b>Username</b></label>
                <input
                id="username-signup"
                type="text"
                placeholder="Enter Username"
                name="username"
                value={signupFormState.username}
                onChange={signupHandleChange}
                required
                />

                <label htmlFor="email-signup"><b>Email</b></label>
                <input
                id="email-signup"
                type="text"
                placeholder="Enter Email"
                name="email"
                value={signupFormState.email}
                onChange={signupHandleChange}
                required
                />

                <label htmlFor="password-signup"><b>Password</b></label>
                <input
                id="password-signup"
                type="password"
                placeholder="Enter Password"
                name="password"
                value={signupFormState.password}
                onChange={signupHandleChange}
                required
                />

                <div>
                    <label htmlFor="location-signup"><b>Locations</b></label>
                    <select id="location-signup" name="location" value={signupFormState.location} onChange={signupHandleChange} required>
                        <option value="" disabled selected>Choose...</option>
                        <option value="Downtown Sacramento">Downtown Sacramento</option>
                        <option value="West Sacramento">West Sacramento</option>
                        <option value="East Sacramento">East Sacramento</option>
                        <option value="North Sacramento">North Sacramento</option>
                        <option value="South Sacramento">South Sacramento</option>
                    </select>
                </div>


                {/* <!-- REMEMBER ME BUTTON -->  
                <!-- <button type="submit">Login</button> */}
                {/* <label>
                <input type="checkbox" checked="checked" name="remember" /> Remember
                me
                </label>--> */}
            </div> 

            <div className="container" style={{background: "var(--gray)"}}>
                <button
                type="submit"
                // onClick={hide}
                className="submitbtn">
                Sign-up
                </button>
                {/* <!-- FORGOT PASSWORD LINK -->
                <!-- <span className="psw">Forgot <a href="#">password?</a></span> --> */}
            </div>
        </form>
    </div>

    </React.Fragment>, document.getElementById('root')
    ) : null;

export default SignupModal;