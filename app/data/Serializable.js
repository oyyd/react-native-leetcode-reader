export default class Serializable {
  constructor() {

  }
  
  getSerialization() {
    const obj = {};

    Object.keys(this).forEach(key => {
      if (typeof this[key] !== 'function') {
        obj[key] = this[key];
      }
    });

    return obj;
  }
};
