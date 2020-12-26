import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {loginUser} from '../../store/actions';
import { Redirect, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import dipprLogoTest2 from '../../assets/img/dipprLogoTest2.png'
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import AlertSnackBar from '../../components/Snackbar'


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
  const { control, errors: fieldsErrors, handleSubmit } = useForm({});
  const [redirection, setRedirection] = useState(null);
  const [modal, setModal] = useState(isModal)
  const [currentAlert, setCurrentAlert] = useState(null);
  const [showAlert, setShowAlert]= useState(null);
  const classes = useStyles();

  const onSubmit = data => console.log(data);

  const dispatch = useDispatch();

  const handleRealSubmit = data => {
    fetch("https://dippr-api-development.herokuapp.com/api/login", {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify({
        user: {
          email: data.email,
          password: data.password
        }
      }
      )
    })
    .then((response) => {
      {response.status === 200 &&  setRedirection(true)}
      {response.status === 401 && handleAlert()}
      Cookies.set('token', response.headers.get("Authorization"))
      return response.json()
    })
    .then((response) => {
      dispatch(loginUser(response.data))
    }).catch(error => {
      console.log(error)
    })
  };

  const handleSignup = () =>{
    {modal && signup(true)};
  }

  const handleAlert = () =>{
    setCurrentAlert("SigninError");
    setShowAlert(true);
  };

  const handleClose = () => {
    setShowAlert(false)
  };

  return (
    <>
    {redirection && <Redirect to='/'/>}
    {showAlert && <AlertSnackBar alertMessage={"Email ou mot de passe incorrect"} alertType={currentAlert} closeAlert={content=>handleClose(content)}/>}
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          <Link to="/" className={classes.title} variant="h6" color='inherit'>
            <img src={dipprLogoTest2} className="dipprFullLogo" ></img>
          </Link>
        <Typography component="h1" variant="h5">
          Se connecter
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(handleRealSubmit)}>
        <Controller
              name="email"
              as={
                <TextField
                  id="email"
                  variant="outlined"
                  fullWidth
                  required
                  helperText={fieldsErrors.email ? fieldsErrors.email.message : null}
                  label="Adresse email"
                  error={fieldsErrors.email}
                />
              }
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Adresse email invalide'
                }
              }}
            />
            <br/>
            <br/>
            <Controller
              name="password"
              as={
                <TextField
                  id="password"
                  variant="outlined"
                  fullWidth
                  required
                  type="password"
                  helperText={fieldsErrors.password ? fieldsErrors.password.message : null}
                  label="Mot de passe"
                  error={fieldsErrors.password}
                />
              }
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: {
                  value: 6,
                  message: 'min. 6 caractères'
                }
              }}
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
