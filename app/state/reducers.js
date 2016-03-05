import update from 'react/lib/update';
import Problem from '../data/Problem';

import { savePreservation, } from '../data/storage';

const defaultState = {
  algorithms: [],
  database: [],
  shell: [],
  preserve: {},
};

export const ACTION_TYPES = {
  SET_PROBLEMS: 'SET_PROBLEMS',
  ADD_PROBLEM: 'ADD_PROBLEM',
  REMOVE_PROBLEM: 'REMOVE_PROBLEM',
};

function deleteObjectProp(obj, key) {
  let tmp;
  const newObj = {};

  key = String(key);

  for (tmp in obj) {
    if (key !== tmp && obj.hasOwnProperty(tmp)) {
      newObj[tmp] = obj[tmp];
    }
  }

  return newObj;
}

export default function problems(state = defaultState, action) {
  let tmp;

  switch (action.type) {
    case ACTION_TYPES.SET_PROBLEMS:
      return update(state, {
        [action.problemType]: {$set: action.problems},
      });
    case ACTION_TYPES.ADD_PROBLEM:
      tmp = update(state, {
        preserve: {
          [action.problem.id]: {$set: action.problem},
        },
      });
      savePreservation(tmp.preserve);
      return tmp;
    case ACTION_TYPES.REMOVE_PROBLEM:
      tmp = update(state, {
        preserve: {$set: deleteObjectProp(state.preserve, action.id)},
      });
      savePreservation(tmp.preserve);
      return tmp;
    default:
      return state;
  }
};
