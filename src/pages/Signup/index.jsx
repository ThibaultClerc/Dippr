import React, {useState} from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/actions/index';
import Cookies from "js-cookie";
// import {Container, Row, Col, Form, Button } from "react-bootstrap";
import dipprLogoTest2 from '../../assets/img/dipprLogoTest2.png'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Signup = ({login, isModal}) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [redirection, setRedirection] = useState(false)
  const [email, setEmail] = useState('');
  const [modal, setModal] = useState(isModal)

  const dispatch = useDispatch();

  const classes = useStyles();

  const data = {
    user: {
      email: email,
      password: password
    }
  };

  const handleLogin = () =>{
    {modal && login(true)};
  }

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
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          <Link to="/" className={classes.title} variant="h6" color='inherit'>
            <img src={dipprLogoTest2} className="dipprFullLogo" ></img>
          </Link>
        <Typography component="h1" variant="h5">
          Inscription
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={email}
                fullWidth
                id="email"
                label="Adresse email"
                name="email"
                autoComplete="email"
                onChange={ e => setEmail(e.target.value) }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={password}
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={ e => setPassword(e.target.value) }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={passwordConfirm}
                fullWidth
                name="password"
                label="Confirmer mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={ e => setPasswordConfirm(e.target.value) }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Inscription
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Typography component={Link} to="/signin" variant="body2" onClick={handleLogin}>
                {"Déjà inscrit ? Se connecter"}
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </>

  );
}

export default Signup
