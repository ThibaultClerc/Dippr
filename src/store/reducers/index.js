import searchQuery from './searchQuery';
import userConnectStatus from './userConnectStatus';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  user: userConnectStatus,
  query: searchQuery
})

export default allReducers