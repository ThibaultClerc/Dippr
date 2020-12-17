import Cookies from 'js-cookie'
import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {loginUser} from '../../store/actions';
import { Form, Button } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));


const Connection = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirection, setRedirection] = useState(false);
  const classes = useStyles();


  const data = {
      user: {
        email: email,
        password: password
      }
  };

  const user = useSelector(state => state.user.user);

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
      dispatch(loginUser(response.data))
      setRedirection(true)
    }).catch(error => {
      console.log(error)
      {redirection && <Redirect to='/signin'/>}
    })
  };

  return (
    <>
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        >

        {redirection && <Redirect to='/'/>}
        <Grid item xs={12}>
        <Paper className={classes.paper}>
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
        </Paper>
        </Grid> 
      </Grid> 

    </>

  );
}
export default Connection
