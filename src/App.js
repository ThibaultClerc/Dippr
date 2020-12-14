import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './components/Layout';
import  useIsIOS  from './components/IosDetect';
import { InstallPWA } from './components/InstallPwa';

const App = () => {
  const { prompt } = useIsIOS();

  return (
    <Provider store={store}>
      {prompt && <InstallPWA />}
      <Layout/>
    </Provider>
  )
}

export default App