import {Link, NavLink} from "react-router-dom";
import React from 'react'
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Cookies from "js-cookie";

const Nav = () => {

  const user = useSelector(state => state.user);

    return (

      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <a className="navbar-brand" href="#">DIPPR</a>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/" className="navbar-brand">Home</Link>
            <Link to="#" className="nav-item nav-link">About</Link>
          </div>
          <div className="Connection">
            {user.length === 0 ? <Button as={Link} to="/signin" variant="outline-primary">Se connecter</Button> :  '' }
            {' '}
            {user.length === 0 ? <Button as={Link} to="/signup" variant="primary">S'inscrire</Button> :  '' }

            {user.length !== 0 ? <Button as={Link} to="/profile" variant="primary">Profil</Button>:  '' }
            {' '}
            {user.length !== 0 ? <Button variant="danger" onClick={(e) => {Cookies.remove('token'); window.location.reload();}}>Déconnexion</Button> :  '' }   
          </div>
        </div>
      </nav>
    );
  };

export default Nav;
