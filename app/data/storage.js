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

export async function getPreservation() {
  let preservation = null;

  try {
    preservation = await AsyncStorage.getItem(KEYS.PRESERVATION);
    // TODO:
    preservation = JSON.parse(preservation);

    Object.keys(preservation).forEach(id => {
      preservation[id] = new ProblemDetail(preservation[id]);
    });
  } catch(e) {
    // TODO:
    console.log(e);
  }

  return preservation;
};
