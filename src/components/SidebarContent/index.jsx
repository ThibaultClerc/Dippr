import React from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import './index.css'

const Side = props => {
   
    return (
        <div>
    
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar" 
            activeKey="/home"
            >

                <div className="sidebar-sticky"></div>
                <Button >Toggle Menu</Button>
            <Nav.Item>
                <Nav.Link href="/home">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#">Filtre</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                Disabled
                </Nav.Link>
            </Nav.Item>
            

            </Nav>
          
        </div>
        );
  };
  const Sidebar = withRouter(Side);
  export default Sidebar
