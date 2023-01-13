import { ADD_INFO_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  player: {
    gravatarEmail: '',
    name: '',
    score: 0,
    assertions: 0,
  },
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
