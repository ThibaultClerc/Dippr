import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import './index.scss'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
  <App />
  </React.StrictMode>
  , document.querySelector("#root"));

serviceWorkerRegistration.register();
reportWebVitals();

