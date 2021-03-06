import React, { useState, useEffect, Fragment} from 'react';
import { Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Avatar from './Avatar';
import General from './General';
import {loginUser} from '../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie'


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function CheckoutProfile() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState(null);
  const [nickName, setNickName] = useState(null);
  const [city, setCity] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [redirection, setRedirection] = useState(null);
  const user = useSelector(state => state.user.user);

  const data = {
    first_name: firstName,
    city: city,
    nickname: nickName
  };

  const dispatch = useDispatch();

  const handleNext = () => {
    if (activeStep === steps.length - 1){
      handleSubmit()
    }else{
    setActiveStep(activeStep + 1);
    }
  };

  const handleRedirection = () => {
    setRedirection(true);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handlePicture = (value) => {
    setFile(value);
  };

  const handleNickName = (value) => {
    setNickName(value);
  };

  const handleCityName = (value) => {
    setCity(value);
  };

  const handleFirstName = (value) => {
    setFirstName(value);
  };

  const handleSubmit = (e) => {
    // e.preventDefault()
    fetch(`https://dippr-api-production.herokuapp.com/api/users/${user.id}`, {
      "method": "PUT",
      "headers": {
        "Content-Type": "application/json",
        'Authorization': `${Cookies.get('token')}`

      },
      "body": JSON.stringify(data)
    })
    .then((response) => {
      console.log(response)
      return response.json()
    })
    .then((response) => {
      dispatch(loginUser({ "id": user.id, "attributes": {
        first_name: firstName,
        city: city,
        nickname: nickName,
      }}))
      setRedirection(true);
    }).catch(error => {
      console.log(error)
    })
  };


  const steps = ['Avatar', 'Infos'];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Avatar picture={content => handlePicture(content)} />;
      case 1:
        return <General name = {content => handleNickName(content)} city = {content => handleCityName(content)} firstname = {content => handleFirstName(content)}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <Fragment>
      {redirection && <Redirect to="/"/>}
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Remplir son Profil
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Fragment>
            {activeStep === steps.length ? (
            <Fragment>
                  <Redirect to='/'/>
            </Fragment>
            ) : (
              <Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                <Button
                    onClick={handleRedirection}
                    className={classes.button}
                  >
                    Plus tard
                  </Button>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Retour
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Sauvegarder' : 'Suivant'}
                  </Button>
                </div>
              </Fragment>
            )}
          </Fragment>
        </Paper>
      </main>
    </Fragment>
  );
}