import update from 'react/lib/update';
import Problem from '../data/Problem';

const defaultState = {
  algorithms: [],
  database: null,
  shell: null,
  preserve: null,
};

export const ACTION_TYPES = {
  SET_PROBLEMS: 'SET_PROBLEMS',
};

export default function problems(state = defaultState, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_PROBLEMS:
      return update(state, {
        [action.problemType]: {$set: action.problems},
      });
    default:
      return state;
  }
};
