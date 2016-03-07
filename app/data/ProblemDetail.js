import Serializable from './Serializable';

function getAcceptance (totalAccepted, totalSubmissions) {
  return (totalAccepted / totalSubmissions * 100).toPrecision(3) + '%';
}

export default class ProblemDetail extends Serializable{
  constructor({
    id, title, totalAccepted, totalSubmissions,
    diffculty, questionContent, similar, tags,
    discussURL,
  }) {
    super(arguments[0]);

    this.id = typeof id === 'number' ? id : parseInt(id);
    this.title = title;
    this.totalAccepted = totalAccepted;
    this.totalSubmissions = totalSubmissions;
    this.diffculty = diffculty;
    this.questionContent = questionContent.trim();
    this.similar = similar;
    this.tags = tags;

    this.acceptance = getAcceptance(this.totalAccepted, this.totalSubmissions);
    this.discussURL = discussURL;
    this.isPremium = false;
  }
};
