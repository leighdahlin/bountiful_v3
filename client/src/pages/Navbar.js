import { Link } from 'react-router-dom';
import "../assets/css/modal.css"
import logo from "../assets/images/b-logo.png";

export default function LoggedIn() {
    const loggedIn = true;
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
    } else {

        // const modal = document.getElementById("signup-modal");

        // const showModal = () => {
        //     modal.setAttribute("style","display:block;")
        // }

        // const closeModal = () => {
        //     modal.setAttribute("style","display:none;")
        // }

        return (
            <div className="navbar-nav level-right">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" 
                onClick={() => {document.getElementById("login-modal").setAttribute("style","display:block;")}}
                    style={{width: "auto"}} href="#">Log in </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id = "logout" >or</a>
                </li>
                <li className="nav-item nav-link active">
                    <a className="" aria-current="page" 
                    onClick={() => {document.getElementById("signup-modal").setAttribute("style","display:block;")}}
                        style={{width: "auto"}} href="#">Sign up</a>
                </li>

             {/* {{!-- LOGIN MODAL --}} */}
                <div id="login-modal" className="modal">
                    <form
                        className="modal-content animate login-form"
                        action="/action_page.php"
                        method="post">
                        <div className="imgcontainer">
                        <span
                            onClick={() => {document.getElementById("login-modal").setAttribute("style","display:none;")}}
                            className="close"
                            title="Close Modal"
                            >&times;</span
                        >
                        <img src={logo} alt="bountiful logo" className="avatar" />
                        </div>
                        <div className="container">
                        <label htmlFor="emailLogin"><b>Email Address</b></label>
                        <input
                            id = "email-login"
                            type="text"
                            placeholder="Enter Email Address"
                            name="uname"
                            required
                        />
                        <label htmlFor="psw"><b>Password</b></label>
                        <input
                            id = "password-login"
                            type="password"
                            placeholder="Enter Password"
                            name="psw"
                            required/>
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
                        onClick={() => {document.getElementById("login-modal").setAttribute("style","display:none;")}}
                        className="submitbtn">
                        Login
                        </button>
                        {/* <!-- FORGOT PASSWORD LINK -->
                        <!-- <span className="psw">Forgot <a href="#">password?</a></span> --> */}
                        </div>
                    </form>
                </div>


                {/* {{!-- SIGN UP MODAL --}} */}
                <div id="signup-modal" className="modal">
                    <form
                    className="modal-content animate signup-form"
                    action="/action_page.php"
                    method="post"
                    >
                    <div className="imgcontainer">
                        <span
                        onClick={() => {document.getElementById("signup-modal").setAttribute("style","display:none;")}}
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
                        name="firstname"
                        required
                        />

                        <label htmlFor="lastname-signup"><b>Last Name</b></label>
                        <input
                        id="lastname-signup"
                        type="text"
                        placeholder="Enter Last Name"
                        name="lastname"
                        required
                        />

                        <label htmlFor="username-signup"><b>Username</b></label>
                        <input
                        id="username-signup"
                        type="text"
                        placeholder="Enter Username"
                        name="username"
                        required
                        />

                        <label htmlFor="email-signup"><b>Email</b></label>
                        <input
                        id="email-signup"
                        type="text"
                        placeholder="Enter Email"
                        name="email"
                        required
                        />

                        <label htmlFor="password-signup"><b>Password</b></label>
                        <input
                        id="password-signup"
                        type="password"
                        placeholder="Enter Password"
                        name="psw"
                        required
                        />

                        <div>
                            <label htmlFor="location-signup"><b>Locations</b></label>
                            <select id="location-signup" name="locations" id="location-signup">
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
                        onClick={() => {document.getElementById("signup-modal").setAttribute("style","display:none;")}}
                        className="submitbtn">
                        Sign-up
                        </button>
                        {/* <!-- FORGOT PASSWORD LINK -->
                        <!-- <span className="psw">Forgot <a href="#">password?</a></span> --> */}
                    </div>
                </form>
                </div>

            </div>

    )
    }
    
    
}