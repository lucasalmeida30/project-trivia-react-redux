import { ADD_TOTAL_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  assertions: 0,
};

const assertions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_TOTAL_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload.assertions,
    };
  default: return state;
  }
};

export default assertions;
