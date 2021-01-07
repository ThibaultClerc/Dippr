import React, { useState, Fragment, useEffect} from 'react';
import { Redirect} from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from './Avatar';
import General from './General';
import {loginUser} from '../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie'
import GridButtons from './GridButtons'
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import useDeviceDetect from "../DeviceDetect";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 900,
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

const CheckoutProfile = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [city, setCity] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [redirection, setRedirection] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [specialties, setSpecialties] = useState(null);
  const [culinariesDiscovery, setCulinariesDiscovery] = useState(null);
  const user = useSelector(state => state.user.user);
  const { isMobile } = useDeviceDetect();


  const data = {
    first_name: firstName,
    city: city,
    last_name: lastName,
    lat: lat,
    lng: lng
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

  const handleLastName = (value) => {
    setLastName(value);
  };

  const handleCityName = (value) => {
    setCity(value);
  };

  const handleFirstName = (value) => {
    setFirstName(value);
  };

  const handleLat = (value) => {
    setLat(value);
  };

  const handleLng = (value) => {
    setLng(value);
  };

  const handleSpecialties = (value) => {
    console.log(value);
    setSpecialties(value);
  };

  const handleCulinariesDiscovery = (value) => {
    console.log(value);
    setCulinariesDiscovery(value);
  };

  const handleSubmit = () => {
    fetch(`https://dippr-api-production.herokuapp.com/api/users/${user.id}`, {
      "method": "PUT",
      "headers": {
        "Content-Type": "application/json",
        'Authorization': `${Cookies.get('token')}`

      },
      "body": JSON.stringify(data)
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      dispatch(loginUser({ "id": user.id, "attributes": {
        first_name: firstName,
        city: city,
        last_name: lastName,
        lat: lat,
        lng: lng
      }}))
      setRedirection(true);
    }).catch(error => {
      console.log(error)
    })
  };
  
  const handleFileUpload = (user_id) => {
    const formData = new FormData();
    formData.append("file", file);
    fetch(`https://dippr-api-production.herokuapp.com/api/users/${user.id}`, {
      "method": "PUT",
      "headers": {
        "Authorization": Cookies.get("token")
      },
      "body": formData
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
    }).catch(error => {
      console.log(error)
    }).finally(() => {
    })
  };

  useEffect(()=>{
    if (user !== undefined){
    handleFileUpload(user.id)
    };
  },[file])

  useEffect(() => {
  }, [isMobile])

  const steps = ['Photo de profil', 'Infos', 'Spécialités', 'Découverte culinaire'];

  const getStepContent =(step)=> {
    switch (step) {
      case 0:
        return <Avatar picture={content => handlePicture(content)} imageAvatar={file}/>;
      case 1:
        return <General 
        name = {content => handleLastName(content)} 
        city = {content => handleCityName(content)} 
        firstname = {content => handleFirstName(content)} 
        lat={content => handleLat(content)} 
        lng={content => handleLng(content)}
        currentlastname={lastName}
        currentfirstname={firstName}
        />;
      case 2:
        return <GridButtons title = {"Choisis tes 3 spécialités :" } 
        selectedDishes = {content =>handleSpecialties(content)}
        currentDishes = {specialties}
        />
      case 3:
        return (
        <div>
        <GridButtons title = {"Découvres 3 spécialités :"}  
        selectedDishes = {content =>handleCulinariesDiscovery(content)}
        currentDishes = {culinariesDiscovery}
        />
        </div>
        )
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <Fragment>
      {redirection && <Redirect to={{
        pathname: "/",
        state: {alert: "SignupSuccessAlert"}
      }}/>}
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Remplis ton profil
          </Typography>
          {!isMobile && (<Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>)}
          
          {isMobile && (<MobileStepper
            variant="dots"
            steps={steps.length}
            position="static"
            activeStep={activeStep}
            // className={classes.root}
            nextButton={
              <Button size="small" onClick={handleNext} color="primary">
                {activeStep === steps.length - 1 ? 'Sauvegarder' : 'Suivant'}
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Retour
              </Button>
            }
          />)}

          <Fragment>
            {activeStep === steps.length ? (
            <Fragment>
                  <Redirect to='/'/>
            </Fragment>
            ) : (
              <Fragment>
                {getStepContent(activeStep)}
                {!isMobile &&(
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
                )}  
              </Fragment>
            )}
          </Fragment>
        </Paper>
      </main>
    </Fragment>
  );
}

export default CheckoutProfile;