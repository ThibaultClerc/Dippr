import React, { useCallback, useState, useRef } from 'react';
import Loader from '../UI/Loader'
import {
  GoogleMap,
  useLoadScript,
  Marker
} from '@react-google-maps/api';
import dishLogo from '../../assets/img/dishLogo.png';

const libraries = ["places"]

const mapContainerStyle = {
  height: "50vh",
  borderRadius: 35
}

const options = {
  disableDefaultUI: true,
  gestureHandling: "greedy"
}

const MiniMap = ({dishID, dishLat, dishLng}) => {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  const center = {
    lat: Number.parseFloat(dishLat),
    lng: Number.parseFloat(dishLng)
  }

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, [])

  if (loadError) return "Error loading maps";
  if (!isLoaded) return <Loader/>

  console.log(typeof dishLat, typeof dishLng)
  return (
    <>
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={center}
      options={options}
      onLoad={onMapLoad}
      scrollwheel={false}
      >
      <Marker
        key={dishID}
        position={{lat: Number.parseFloat(dishLat), lng: Number.parseFloat(dishLng)}}
        icon={{
          url: dishLogo,
          scaledSize: new window.google.maps.Size(50, 50)
        }}
      />
    </GoogleMap>
    </>
  )
}

export default MiniMap