export default class ProblemDetail {
  constructor({
    id, title, totalAccepted, totalSubmissions,
    diffculty, questionContent
  }) {
    this.id = id;
    this.title = title;
    this.totalAccepted = totalAccepted;
    this.totalSubmissions = totalSubmissions;
    this.diffculty = diffculty;
    this.questionContent = questionContent;
  }
};
