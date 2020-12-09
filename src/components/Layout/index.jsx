import React from 'react';
import Nav from "../Navbar";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import SidebarFinal from "../Sidebar"

const Layout = () => {
  return (
    <Router>
      <Nav/>
      <SidebarFinal/>
      <div>appppp</div>
    </Router>
  )
}

export default Layout
