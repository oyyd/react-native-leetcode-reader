export default class Problem {
  constructor({
    id, title, url, diffculty, acceptance,
    isPremium,
  }) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.diffculty = diffculty;
    this.acceptance = acceptance;
    this.isPremium = isPremium;
  }
}
