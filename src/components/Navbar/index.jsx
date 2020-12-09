import {Link} from "react-router-dom";
import React from 'react'
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';


const Nav = () => {

    return (

      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <a className="navbar-brand" href="#">DIPPR</a>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/" className="navbar-brand">Home</Link>
            <Link to="#" className="nav-item nav-link">About</Link>
          </div>
          <div className="Connection">
            <Button href="#" variant="outline-primary">Se connecter</Button>{' '}
            <Button href="/signup" variant="primary">S'inscrire</Button> 
          </div>
        </div>
      </nav>
    );
  };

export default Nav;
