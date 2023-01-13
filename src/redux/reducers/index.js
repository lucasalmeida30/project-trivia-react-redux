import { combineReducers } from 'redux';
import user from './user';
import assertions from './assertions';

const rootReducer = combineReducers({
  user,
  assertions,
});

export default rootReducer;
