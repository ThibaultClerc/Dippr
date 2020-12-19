import React, {useState, useRef} from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/actions/index';
import Cookies from "js-cookie";
import dipprLogoTest2 from '../../assets/img/dipprLogoTest2.png'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Checkout from '../../components/CheckoutProfile/Checkout'
import { useForm, Controller } from 'react-hook-form';


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
  const { control, errors: fieldsErrors, handleSubmit, watch } = useForm({});
  const [redirection, setRedirection] = useState(false);
  const [modal, setModal] = useState(isModal);
  const [checkout, setCheckout] = useState(null);
  const [alert, setAlert] = useState(null);
  const currentPassword = useRef({});
  currentPassword.current = watch("password", "");

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleLogin = () =>{
    {modal && login(true)};
  }

  const handleRealSubmit = data => {
    fetch("https://dippr-api-development.herokuapp.com/api/signup", {
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
      {response.status === 200 && setCheckout(true)}
      Cookies.set('token', response.headers.get("Authorization"))
      return response.json()
    })
    .then((response) => {
      dispatch(loginUser(response.data))
    }).catch(error => {
      setRedirection(true)
      console.log(error)
    })
  };

  const formSignup = () => (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
        <Link to="/" className={classes.title} variant="h6" color='inherit'>
          <img src={dipprLogoTest2} className="dipprFullLogo" ></img>
        </Link>
      <Typography component="h1" variant="h5">
        Inscription
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit(handleRealSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>

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
            {!fieldsErrors.password && <p>min. 6 caractères</p>}
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password_confirmation"
              as={
                <TextField
                  id="password-confirmation"
                  variant="outlined"
                  fullWidth
                  required
                  type="password"
                  helperText={fieldsErrors.password_confirmation ? fieldsErrors.password_confirmation.message : null}
                  label="Mot de passe"
                  error={fieldsErrors.password_confirmation}
                />
              }
              control={control}
              defaultValue=""
              rules={{
                validate: value =>
                value === currentPassword.current || "The passwords do not match"
              }}
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
  );

  return (
    <>
      {(!redirection && checkout) && <Checkout/>}
      {!checkout && formSignup()}
      {redirection && formSignup()}
    </>

  );
}

export default Signup
