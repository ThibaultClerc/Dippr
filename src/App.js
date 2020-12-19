import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import Layout from './components/Layout';
import  useIsIOS  from './components/IosDetect';
import { InstallPWA } from './components/InstallPwa';
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
  const { prompt } = useIsIOS();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      {prompt && <InstallPWA />}
      <Layout/>
      </PersistGate>
    </Provider>
  )
}

export default App