import React from 'react';
import Nav from "../Navbar";
import {Switch } from 'react-router-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Signup from "../Signup"

const Layout = () => {
  return (
    <Router>
      <Nav/>
      <Switch> 
         <Route exact path="/signup" component={Signup}/>
      </Switch> 
    </Router>
  )
}

export default Layout