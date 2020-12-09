import React from 'react';
import ReactDOM from 'react-dom';
import Nav from "./Navbar"
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import SidebarFinal from "./Sidebar";

const App = () => {
  return (
      <Router>
        <Nav/>
        <SidebarFinal/>
        <div>
        APP
        </div>
    </Router>
  )
}

export default App;
