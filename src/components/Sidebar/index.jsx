import React from 'react';
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Sidebar from "../SidebarContent";
import '../SidebarContent/index.css'

const SidebarFinal = () => {
  return (
    <Container fluid>
        <Row>
            <Col xs={2} id="sidebar-wrapper">      
            <Sidebar />
            </Col>
            <Col  xs={10} id="page-content-wrapper">
                this is a test
            </Col> 
        </Row>

    </Container>  )
}

export default SidebarFinal;



