import Problem from '../data/Problem';

const defaultState = {
  algorithms: [new Problem({title: '1231'})],
  database: null,
  shell: null,
  preserve: null,
};

export default function problems(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
};
