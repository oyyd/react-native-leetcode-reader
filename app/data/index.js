import $ from 'cheerio-without-node-native';
import Problem from './Problem';
import ProblemDetail from './ProblemDetail';

function fetchText(url) {
  return fetch(url).then(res => {
    return res.text();
  });
}

function removeAnchors($doc) {
  const $node = $doc.find('.question-content');

  $node.find('a').each((index, ele) => {
    const $ele = $(ele);
    const txt = $ele.text();
    const href = $ele.attr('href');

    if (href !== '/subscribe/') {
      $ele.replaceWith(`<span role="anchor" data-href="${href}">${txt}</span>`);
    } else {
      $ele.parent().remove();
    }
  });
}

function getContent($doc) {
  return $doc.find('.question-content').html();
}

function getSimilar($doc) {
  const similar = [];
  const $node = $doc.find('#similar').parent();
  $node.find('[role="anchor"]').each((index, item) => {
    const $node = $(item);
    similar.push({
      text: $node.text(),
      href: $node.attr('data-href'),
    });
  });
  $node.remove();
  return similar;
}

function getTags($doc) {
  const tags = [];
  const $node = $doc.find('#tags').parent();
  $node.find('[role="anchor"]').each((index, item) => {
    const $node = $(item);
    tags.push({
      text: $node.text(),
      href: $node.attr('data-href'),
    });
  });
  $node.remove();
  return tags;
}

function getDiscussURL($doc) {
  let url = null;

  $doc.find('.action a').each((index, item) => {
    const $item = $(item);
    if ($item.text() === 'Discuss') {
      url = $item.attr('href');
    }
  });

  return url;
}

export function requestProblems(url) {
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
    removeAnchors($node);
    data.tags = getTags($node);
    data.similar = getSimilar($node);
    data.questionContent = getContent($node);
    data.discussURL = getDiscussURL($node);

    return new ProblemDetail(data);
  });
};
