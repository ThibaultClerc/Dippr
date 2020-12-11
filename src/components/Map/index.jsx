import React, { useCallback, useEffect } from 'react';
import Loader from '../UI/Loader'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import Button from 'react-bootstrap/Button';
import '../../assets/img/compass.png'


const libraries = ["places"]

const mapContainerStyle = {
  width: "100vw",
  height: "100vh"
}

const center = {
  lat: 48.856613,
  lng: 2.352222
}

const options = {
  disableDefaultUI: true
}








const Map = ({data}) => {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  if (loadError) return "Error loading maps";
  if (!isLoaded) return <Loader/>

  // const panTo = useCallback(({lat, lng}) => {

  // }, [])

  // const Locate = ({panTo}) => {
  //   return (
  //     <Button className="locate">
  //       <img src="../../assets/img/compass.png" alt="compass - locate me"></img>
  //     </Button>
  //   ) 
  // }



  // useEffect(() => {
  //   setMarkers()
  // }, [data])

  // const setMarkers = () => {
    
  // }

  console.log(data)

  return (
    <>
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      center={center}
      options={options}
      >
      {data.map(dish => {
        return <Marker key={dish.attributes.id} position={{lat: parseFloat(dish.meta.user_lat), lng: parseFloat(dish.meta.user_lng)}}/>
      })}
    </GoogleMap>
    
    </>
  )
}

export default Map
