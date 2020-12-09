import React from 'react';
import Nav from "../Navbar";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Home from '../../pages/Home'

const Layout = () => {
  return (
    <Router>
      <Nav/>
      <Switch>
        <Route exact path="/"><Home /></Route>
        {/* <PrivateRouteRegister component={Register} path="/register" exact />
        <PrivateRouteRegister component={Login} path="/login" exact />
        <PrivateRoute component={User} path="/users/:userID" exact /> */}
      </Switch>
    </Router>
  )
}

export default Layout
