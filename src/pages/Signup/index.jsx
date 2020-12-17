import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/actions/index';
import Cookies from "js-cookie";
import {Container, Row, Col, Form, Button } from "react-bootstrap";


const Signup = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [redirection, setRedirection] = useState(false)
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const data = {
    user: {
      email: email,
      password: password
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch("https://dippr-api-development.herokuapp.com/api/signup", {
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
      dispatch(loginUser(response.data))
      setRedirection(true)
    }).catch(error => {
      console.log(error)
    })
  };


  return (
    <>
      {redirection && <Redirect to='/'/>}
      <Container fluid>
        <Row>
        <Col xs="3"></Col>
        <Col xs="6">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
              <Form.Text className="text-muted">
                Nous ne partageons vos informations avec personne d'autre.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="passwordConfirm">
              <Form.Label>Confirmer le mot de passe</Form.Label>
              <Form.Control type="password" placeholder="Confirmer le mot de passe" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              S'inscrire
            </Button>
          </Form>
        </Col>
        </Row>
      </Container>
    </>

  );
}

export default Signup
