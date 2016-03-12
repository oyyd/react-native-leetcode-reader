const DIFFCULTY_PIORITY = {
  'Easy': 0,
  'Medium': 1,
  'Hard': 2,
};

export const ORDER_TYPES = {
  ID_ASC: 'ID_ASC',
  ID_DESC: 'ID_DESC',
  ACCEPTANCE_ASC: 'ACCEPTANCE_ASC',
  ACCEPTANCE_DESC: 'ACCEPTANCE_DESC',
  DIFFCULTY_ASC: 'DIFFCULTY_ASC',
  DIFFCULTY_DESC: 'DIFFCULTY_DESC',
};

export const ORDER_TYPE_NAMES = {
  ID_ASC: 'Sort By Id Asc',
  ID_DESC: 'Sort By Id Desc',
  ACCEPTANCE_ASC: 'Sort By Acceptance Asc',
  ACCEPTANCE_DESC: 'Sort By Acceptance Desc',
  DIFFCULTY_ASC: 'Sort By Diffculty Asc',
  DIFFCULTY_DESC: 'Sort By Diffculty Desc',
};

const ORDER_SORT_FUNCS = {
  ID_ASC: (problemA, problemB) => problemA.id - problemB.id,
  ID_DESC: (problemA, problemB) => problemB.id - problemA.id,
  ACCEPTANCE_ASC: (problemA, problemB) =>
    (parseAcceptance(problemA.acceptance) > parseAcceptance(problemB.acceptance)) ? 1 : -1,
  ACCEPTANCE_DESC: (problemA, problemB) =>
    (parseAcceptance(problemA.acceptance) < parseAcceptance(problemB.acceptance)) ? 1 : -1,
  DIFFCULTY_ASC: (problemA, problemB) =>
    DIFFCULTY_PIORITY[problemA.diffculty] > DIFFCULTY_PIORITY[problemB.diffculty] ? 1 : -1,
  DIFFCULTY_DESC: (problemA, problemB) =>
    DIFFCULTY_PIORITY[problemA.diffculty] < DIFFCULTY_PIORITY[problemB.diffculty] ? 1 : -1,
};

function containCharsInOrder(str, charStr) {
  // TODO: maybe we can cache the result
  if (!str || !charStr) {
    return true;
  }

  str = str.toLowerCase();
  charStr = charStr.toLowerCase().replace(/\s/g, '');

  let index = 0,
    i,
    charStrLength = charStr.length,
    strLength = str.length;

  for (i = 0; i < charStrLength; i++) {
    while (index < strLength && str[index] !== charStr[i]) {
      index ++;
    }

    if (index >= strLength) {
      return false;
    }

    index ++;
  }

  return true;
}

function parseAcceptance(acceptance) {
  return parseFloat(acceptance.slice(0, acceptance.length - 1));
}

export default function transform(problems, { orderType, searchString, }) {
  let result = [],
    sortFunc;

  if (searchString) {
    problems.forEach(problem => {
      if (containCharsInOrder(problem.title, searchString)) {
        result.push(problem);
      }
    });
  } else {
    result = problems.slice();
  }

  if (orderType !== null && ORDER_TYPES[orderType]) {
    result.sort(ORDER_SORT_FUNCS[orderType]);
  }

  return result;
};
