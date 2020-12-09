import React from 'react';
import Nav from "../Navbar";
import {Switch } from 'react-router-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Signup from "../../pages/Signup"
import Login from "../../pages/Login"

const Layout = () => {
  return (
    <Router>
      <Nav/>
      <Switch> 
         <Route exact path="/signup" component={Signup}/>
         <Route exact path="/signin" component={Login}/>
      </Switch> 
    </Router>
  )
}

export default Layout