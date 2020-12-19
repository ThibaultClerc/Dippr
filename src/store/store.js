import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import allReducers from './reducers'
import thunkMiddleware from 'redux-thunk';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, allReducers)

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export const persistor = persistStore(store)