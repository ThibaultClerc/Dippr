import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function General({name, city}) {
  const [nickName, setNickName] = useState('');
  const [cityName, setCityName] = useState('');

  const handleNickName =(value)=>{
    name(value)
  };

  const handleCityName =(value)=>{
    city(value)
  };

  useEffect(()=>{
    handleNickName(nickName)
  },[nickName]);

  useEffect(()=>{
    handleCityName(cityName)
  },[cityName]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Général
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* <TextField
            required
            id="firstName"
            name="firstName"
            label="Prénom"
            fullWidth
            autoComplete="given-name"
          />
          <br/>
          <br/>
            <TextField
            required
            id="lastName"
            name="lastName"
            label="Nom de famille"
            fullWidth
            autoComplete="family-name"
          />
            <br/>
            <br/> */}
            <TextField
            required
            id="nickName"
            value={nickName}
            name="nickname"
            label="Surnom"
            fullWidth
            onChange={e =>setNickName(e.target.value)}
            autoComplete="nick-name"
          />
            <br/>
            <br/>
            <TextField
            required
            value={cityName}
            id="city"
            name="city"
            label="Ville"
            fullWidth
            onChange={e =>setCityName(e.target.value)}
            autoComplete="city"
          />
        </Grid>
      </Grid>

    </React.Fragment>
  );
}