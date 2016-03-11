import update from 'react/lib/update';
import Problem from '../data/Problem';

import { savePreservation, } from '../data/storage';

// TODO: remove mock data
// let i = 0;
//
// function createMockProblemDetail() {
//   i++;
//
//   return new Problem({
//     id: i, title: String(i), url: '/test',
//     diffculty: 'easy', acceptance: '10.0%',
//     isPremium: false,
//   });
// }
//
// const mockData = [];
//
// let j;
//
// for (j = 0; j < 10; j++) {
//   mockData.push(createMockProblemDetail());
// }
//
// let mockDataCopy = mockData.slice(0);
// let mockLocalData = {};
//
// Object.keys(mockDataCopy).map(item => {
//   mockLocalData[item.id] = item;
// });

const defaultState = {
  algorithms: [],
  // algorithms: mockData,
  algorithmsTransformer: {
    orderType: null,
    searchString: null,
  },
  database: [],
  databaseTransformer: {
    orderType: null,
    searchString: null,
  },
  shell: [],
  shellTransformer: {
    orderType: null,
    searchString: null,
  },
  local: {},
  localTransformer: {
    orderType: null,
    searchString: null,
  },
  // TODO: mock end
};

export const ACTION_TYPES = {
  SET_PROBLEMS: 'SET_PROBLEMS',
  ADD_PROBLEM: 'ADD_PROBLEM',
  REMOVE_PROBLEM: 'REMOVE_PROBLEM',
  CHANGE_TRANSFORMER: 'CHANGE_TRANSFORMER',
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
        local: {
          [action.problem.id]: {$set: action.problem},
        },
      });
      savePreservation(tmp.local);
      return tmp;
    case ACTION_TYPES.REMOVE_PROBLEM:
      tmp = update(state, {
        local: {$set: deleteObjectProp(state.local, action.id)},
      });
      savePreservation(tmp.local);
      return tmp;
    case ACTION_TYPES.CHANGE_TRANSFORMER:
      return update(state, {
        [`${action.title}Transformer`]: {
          [action.key]: {$set: action.value},
        },
      });
    default:
      return state;
  }
};
