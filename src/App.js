import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './components/Layout';

const App = () => {
  return (
    <Provider store={store}>
      <Layout/>
    </Provider>
  )
}

export default App