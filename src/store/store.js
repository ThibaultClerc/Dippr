import { createStore, compose, applyMiddleware } from 'redux';
import userConnectStatus from './reducers/userConnectStatus'
import thunkMiddleware from 'redux-thunk';

export const store = createStore(
  userConnectStatus,
  compose(applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);