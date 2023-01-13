import { ADD_INFO_USER, ADD_TOTAL_SCORE } from '../actions';

const INITIAL_STATE = {
  email: '',
  gravatarEmail: '',
  name: '',
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_INFO_USER:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  case ADD_TOTAL_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  default: return state;
  }
};

export default player;
