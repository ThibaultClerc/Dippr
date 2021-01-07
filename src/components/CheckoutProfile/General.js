import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AddressSearchBar from '../../components/AddressSearchBar'
import { Add } from '@material-ui/icons';

export default function General({name, city, firstname, lat, lng, currentlastname, currentfirstname}) {
  const [lastName, setLastName] = useState(currentlastname === null ? '':currentlastname);
  const [cityName, setCityName] = useState([]);
  const [firstName, setFirstName] = useState(currentfirstname === null ? '':currentfirstname);

  const handleLastName =(value)=>{
    name(value)
  };

  const handleCityName =(value)=>{
    setCityName(value);
    city(value);
  };

  const handleFirstName =(value)=>{
    firstname(value)
  };

  const handleLat = (value) => {
    lat(value)
  };

  const handleLng = (value) => {
    lng(value)
  };

  useEffect(()=>{
    handleLastName(lastName)
  },[lastName]);

  useEffect(()=>{
    handleCityName(cityName)
  },[cityName]);


  useEffect(()=>{
    handleFirstName(firstName)
  },[firstName]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Général
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="firstName"
            value={firstName}
            name="firstName"
            label="Prénom"
            fullWidth
            autoComplete="given-name"
            onChange={e =>setFirstName(e.target.value)}
          />
          <br/>
          <br/>
            <TextField
            id="lastName"
            value={lastName}
            name="lastname"
            label="Nom de famille"
            fullWidth
            onChange={e =>setLastName(e.target.value)}
            autoComplete="last-name"
          />
          <Typography variant="body2" gutterBottom>
            Votre nom de famille restera confidentielle, seul votre prénom sera affiché.
          </Typography>
            <br/>
          <AddressSearchBar city={content => handleCityName(content)} lat={content => handleLat(content)} lng={content => handleLng(content)}/>
          <Typography variant="body2" gutterBottom>
            Votre adresse restera confidentielle, un point aléatoire sera placé à 500 m sur la carte autour de l'adresse indiqué.
          </Typography>
        </Grid>
      </Grid>

    </React.Fragment>
  );
}