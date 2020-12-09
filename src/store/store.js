import { createStore, compose, applyMiddleware } from 'redux';
import userConnect from '../store/reducers/user'
import thunkMiddleware from 'redux-thunk';

export const store = createStore(
  userConnect,
  compose(applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);