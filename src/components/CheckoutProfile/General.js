import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AddressSearchBar from '../../components/AddressSearchBar'
import { Add } from '@material-ui/icons';

export default function General({name, city, firstname, lat, lng}) {
  const [nickName, setNickName] = useState('');
  const [cityName, setCityName] = useState([]);
  const [firstName, setFirstName] = useState('');

  const handleNickName =(value)=>{
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
    handleNickName(nickName)
  },[nickName]);

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
            name="firstName"
            label="Prénom"
            fullWidth
            autoComplete="given-name"
            onChange={e =>setFirstName(e.target.value)}
          />
          <br/>
          <br/>
            <TextField
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
          <AddressSearchBar city={content => handleCityName(content)} lat={content => handleLat(content)} lng={content => handleLng(content)}/>
        </Grid>
      </Grid>

    </React.Fragment>
  );
}