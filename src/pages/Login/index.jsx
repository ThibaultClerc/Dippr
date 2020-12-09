import Cookies from 'js-cookie'
import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {loginUser} from '../../store/actions';
import {Container, Row, Col, Form, Button } from "react-bootstrap";

const Connection = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const data = {
      user: {
        email: email,
        password: password
      }
  };

  const user = useSelector(state => state.user);
 
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch("https://dippr-api-development.herokuapp.com/api/login", {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(data)
    })
    .then((response) => {
      Cookies.set('token', response.headers.get("Authorization"))
      return response.json()
    })
    .then((response) => {
      console.log(response.data.attributes)
      dispatch(loginUser(response.data.attributes))
      //setRedirection(true)
    }).catch(error => {
      console.log(error)
    })
  };

  return (
    <>   
    <Container fluid>
      <Row>
      <Col xs="3"></Col>
      <Col xs="6">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Se connecter
          </Button>
        </Form>
      </Col>
      </Row>
    </Container>
    </>

  );
}
export default Connection
