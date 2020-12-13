import { createStore, compose, applyMiddleware } from 'redux';
import allReducers from './reducers'
import thunkMiddleware from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);