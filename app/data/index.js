import $ from 'cheerio-without-node-native';
import Problem from './Problem';
import ProblemDetail from './ProblemDetail';

function fetchText(url) {
  return fetch(url).then(res => {
    return res.text();
  });
}

export function requestProblems (url) {
  return fetchText(url).then(doc => {
    const list = [];

    $(doc).find('#problemList tbody tr').each((index, tr) => {
      const problemData = {};
      let $node;

      $(tr).find('td').each((index, td) => {
        switch (index) {
          case 1:
            problemData.id = $(td).text();
            return;
          case 2:
            $node = $(td).find('a');
            problemData.url = $node.attr('href');
            problemData.title = $node.text();
            problemData.isPremium = $(td).find('i.fa-lock').length ? true : false;
            return;
          case 3:
            problemData.acceptance = $(td).text();
            return;
          case 4:
            problemData.diffculty = $(td).text();
            return;
        }
      });

      list.push(new Problem(problemData));
    });

    return list;
  });
};

export function requestProblemDetail (url) {
  // TODO: url
  return fetchText(url).then(doc => {
    const data = {},
      $node = $(doc);

    let tmp;

    tmp = $node.find('.question-title > h3').text().split('. ');
    data.id = parseInt(tmp[0]);
    data.title = tmp[1];
    data.totalAccepted = parseInt($node.find('.total-ac > strong').text());
    tmp = $node.find('.total-submit > strong');
    data.totalSubmissions = parseInt(tmp.eq(0).text());
    data.diffculty = tmp.eq(1).text();
    data.questionContent = $node.find('.question-content').html();

    return new ProblemDetail(data);
  });
};
