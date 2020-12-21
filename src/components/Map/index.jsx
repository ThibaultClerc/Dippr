import React, { useCallback, useState, useRef } from 'react';
import Loader from '../UI/Loader'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import dishLogo from '../../assets/img/dishLogo.png';
import DishCard from '../DishCard';

const libraries = ["places"]

const mapContainerStyle = {
  width: "100vw",
  height: "100vh"
}

const center = {
  lat: 48.813533,
  lng: 2.343833
}

const options = {
  disableDefaultUI: true
}

const Map = ({data}) => {
  const [selected, setSelected] = useState(null);
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, [])

  if (loadError) return "Error loading maps";
  if (!isLoaded) return <Loader/>

  console.log(data)
  return (
    <>
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      center={center}
      options={options}
      onLoad={onMapLoad}
      >
      {data.map(dish => {
        return <Marker
                key={dish.attributes.id}
                position={{
                  lat: dish.meta.user_lat !== null ? Number.parseFloat(dish.meta.user_lat) : 48.858370,
                  lng: dish.meta.user_lng !== null ? Number.parseFloat(dish.meta.user_lng) : 2.294481
                }}
                icon={{
                  url: dishLogo,
                  scaledSize: new window.google.maps.Size(45, 45)
                }}
                onClick={() => {
                  setSelected(dish);
                }}
                />
      })}
      {selected ? (
        <InfoWindow
          position={{lat: parseFloat(selected.meta.user_lat), lng: parseFloat(selected.meta.user_lng)}}
          onCloseClick={() => {
            setSelected(null)
          }}>
          <DishCard
            key={selected.id}
            market_dish_id={selected.id}
            name={selected.meta.user_dish.name}
            description={selected.meta.user_dish.description}
            dish_rating={selected.meta.user_dish.dish_rating}
            user_id={selected.meta.user_dish.user_id}
            created_at={selected.meta.user_dish.created_at}
            photo_url={selected.meta.photo_url}
          />
      </InfoWindow>) : null}
    </GoogleMap>
    
    </>
  )
}

export default Map
