import { Link } from 'react-router-dom';
import Nav from './Navbar';
import Cart from './Cart/Cart';

import logo from "../assets/images/b-logo.png";

export default function Header() {
    return (
    <header>
        <nav className="navbar navbar-expand-lg navbar-light nav-color">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                  <img className="main-logo" src={logo} style={{width:"20%"}} alt="logo"/>
                </Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <Nav />
              </div>
            </div>
          </nav>
          {/* <Cart /> */}
    </header>
    
    )
}