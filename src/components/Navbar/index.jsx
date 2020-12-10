import { Link } from "react-router-dom";
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';


import Cookies from "js-cookie";
import { logoutUser } from '../../store/actions'

const Nav = () => {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user);

  const handleClick = () => {
    Cookies.remove('token');
    dispatch(logoutUser())
  }

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <Link to="/" className="navbar-brand">DIPPR</Link>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="#" className="nav-item nav-link">About</Link>
            <Link to="/announcement" className="nav-item nav-link">Créer une annonce</Link>
            <Form inline>
              <FormControl type="text" placeholder="Chercher un plat" className="mr-sm-2" value={query} onChange={(e) => handleChange(e)}/>
              <Button variant="outline-primary" as={Link} to={`/search/${query}`}>Search</Button>
            </Form>

          </div>
          <div className="Connection">
            {user.length === 0 ? <Button as={Link} to="/signin" variant="outline-primary mr-3">Se connecter</Button> :  '' }
            {user.length === 0 ? <Button as={Link} to="/signup" variant="primary">S'inscrire</Button> :  '' }
            {user.length !== 0 ? <Button as={Link} to="/profile" variant="primary mr-3">Profil</Button>:  '' }
            {user.length !== 0 ? <Button as={Link} to="/" variant="danger" onClick={(e) => handleClick()}>Déconnexion</Button> :  '' }   
          </div>
        </div>
      </nav>
    );
  };

export default Nav;
