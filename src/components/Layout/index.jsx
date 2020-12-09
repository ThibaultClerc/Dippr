import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from "../Navbar";
import Home from '../../pages/Home'
import Signup from "../../pages/Signup"
import Login from "../../pages/Login"
import Profile from "../../pages/Profile"

const Layout = () => {
  return (
    <Router>
      <Nav/>
      <Switch> 
        <Route exact path="/"><Home /></Route>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/signin" component={Login}/>
        <Route exact path="/profile" component={Profile}/>
      </Switch> 
    </Router>
  )
}

export default Layout