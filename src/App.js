import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api'
import Layout from './components/Layout';
import Loader from './components/UI/Loader'

const libraries = ["places"]

const App = () => {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  if (loadError) return "Zrrror loading maps";
  if (!isLoaded) return <Loader/>

  return (
    <Provider store={store}>
      <Layout/>
    </Provider>
  )
}

export default App