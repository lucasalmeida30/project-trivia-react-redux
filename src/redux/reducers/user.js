import { ADD_INFO_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  score: 0,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_INFO_USER:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  default: return state;
  }
};

export default user;
