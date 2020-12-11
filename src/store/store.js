import { createStore, compose, applyMiddleware } from 'redux';
import allReducers from './reducers'
import thunkMiddleware from 'redux-thunk';

export const store = createStore(
  allReducers,
  compose(applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);