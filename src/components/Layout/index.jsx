import React from 'react';
import Nav from "../Navbar";
import {Switch } from 'react-router-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Signup from "../../pages/Signup"
import Login from "../../pages/Login"
import Annoucement from "../../pages/Annoucement"

const Layout = () => {
  return (
    <Router>
      <Nav/>
      <Switch> 
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/signin" component={Login}/>
        <Route exact path="/announcement" component={Annoucement}/>
      </Switch> 
    </Router>
  )
}

export default Layout