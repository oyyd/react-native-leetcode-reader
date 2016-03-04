import { requestProblems, } from '../data';
import { ACTION_TYPES, } from './reducers';

export function setProblems(problems, problemType) {
  return {
    type: ACTION_TYPES.SET_PROBLEMS,
    problems,
    problemType,
  };
}

export function getProblems(url, type) {
  return dispatch => {
    requestProblems(url).then(problems => {
      dispatch(setProblems(problems, type));
    });

    return 'this value returned';
    // TODO: handle error
  };
};
