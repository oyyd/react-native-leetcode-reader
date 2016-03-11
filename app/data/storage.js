import {
  AsyncStorage,
} from 'react-native';

import ProblemDetail from './ProblemDetail';

const KEYS = {
  PRESERVATION: 'PRESERVATION',
};

export async function savePreservation(preservation) {
  try {
    const data = {};

    Object.keys(preservation).forEach(id => {
      data[id] = preservation[id].getSerialization();
    });
    // TODO: handle invalid json type
    await AsyncStorage.setItem(KEYS.PRESERVATION, JSON.stringify(data));
  } catch(e) {
    // TODO: handle error
    console.log(e);
  }
};

export async function getLocalProblems() {
  let localProblems = null;

  try {
    localProblems = await AsyncStorage.getItem(KEYS.PRESERVATION);
    localProblems = JSON.parse(localProblems);
  } catch(e) {
    // TODO: handle error
    console.log(e);
  }

  // no data or invalid data
  if (!localProblems) {
    localProblems = {};
  }

  Object.keys(localProblems).forEach(id => {
    localProblems[id] = new ProblemDetail(localProblems[id]);
  });

  return localProblems;
};
