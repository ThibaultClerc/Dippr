import React, { useCallback, useState, useRef } from 'react';
import Loader from '../UI/Loader'
import {
  useLoadScript,
  StandaloneSearchBox
} from '@react-google-maps/api';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const libraries = ["places"]

const options = {
  disableDefaultUI: true
}

const AddressSearchBar = ({city}) => {
  const [cityName, setCityName] = useState([])
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })
  const classes = useStyles();

  const searchBox = useRef();
  const onLoad = useCallback((data) => {
    searchBox.current = data;
  }, [])
  
  const handleCity = (value) => {
    city(value);
    setCityName(value);
  };

  const onPlacesChanged = () => handleCity(searchBox.current.gm_accessors_.places.qe.searchBoxPlaces);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return <Loader/>

  return (
    <StandaloneSearchBox
      onLoad={onLoad}
      SearchBoxOptions={options}
      onPlacesChanged={
        onPlacesChanged
      }
    >
      <TextField
      id="city"
      name="city"
      label="Ville"
      fullWidth
    />
    </StandaloneSearchBox>
  );

};

export default AddressSearchBar;