import Serializable from './Serializable';

export default class Problem extends Serializable{
  constructor({
    id, title, url, diffculty, acceptance,
    isPremium,
  }) {
    super(arguments[0]);

    this.id = typeof id === 'number' ? id : parseInt(id);
    this.title = title;
    this.url = url;
    this.diffculty = diffculty;
    this.acceptance = acceptance;
    this.isPremium = isPremium;
  }
};
