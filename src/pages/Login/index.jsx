import Cookies from 'js-cookie'
import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {loginUser} from '../../store/actions';
import { Redirect, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import dipprLogoTest2 from '../../assets/img/dipprLogoTest2.png'
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';


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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Connection = ({signup, isModal}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirection, setRedirection] = useState(false);
  const [modal, setModal] = useState(isModal)
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
    fetch("https://dippr-api-production.herokuapp.com/api/login", {
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

  const handleSignup = () =>{
    {modal && signup(true)};
  }


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
          Se connecter
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            value={email}
            required
            fullWidth
            id="email"
            label="Adresse email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={ e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            value={password}
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={ e => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Se souvenir de moi"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Se connecter
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography component={Link} to="/" variant="body2">
                Mot de passe oublié ?
              </Typography>
            </Grid>
            <Grid item>
              <Typography component={Link} to="/signup" variant="body2" onClick={handleSignup}>
                {"Pas de compte? Inscrivez-vous"}
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </>

  );
}
export default Connection
