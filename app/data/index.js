import $ from 'cheerio-without-node-native';
import Problem from './Problem';

export function requestAlgorithmList () {
  return fetch('https://leetcode.com/problemset/algorithms/').then(res => {
    return res.text();
  }).then(doc => {
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
  })
};
