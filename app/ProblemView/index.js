import React, {
  NavigatorIOS,
  Component,
  PropTypes,
  StyleSheet,
} from 'react-native';

import Problem from '../data/Problem';
import ProblemList from '../ProblemList';
import ProblemDetail from '../ProblemDetail';

const { string, arrayOf, instanceOf, func, } = PropTypes;

function createProblemListRoute(title, problems, navigateToProblemDetail) {
  return {
    component: ProblemList,
    title: title,
    passProps: {
      problems,
      navigateToProblemDetail,
    },
  };
}

function createProblemDetailRoute(title, url) {
  return {
    component: ProblemDetail,
    title,
    passProps: {
      url,
    },
  }
}

class ProblemView extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!Array.isArray(this.props.problems) || this.props.problems.length < 1)  {
      this.props.requestProblems();
    }

    this.navigateToProblemDetail = this.navigateToProblemDetail.bind(this);
  }

  componentWillUpdate(nextProps) {
    // update navigator when problems changed
    if (this.props.problems === nextProps.problems) {
      return ;
    }

    // TODO:
    this.refs.nav.replace(createProblemListRoute(
      nextProps.title,
      nextProps.problems,
      this.navigateToProblemDetail
    ));
  }

  navigateToProblemDetail(title, url) {
    this.refs.nav.push(createProblemDetailRoute(title, url));
  }

  render() {
    return (
      <NavigatorIOS ref='nav'
        style={styles.container} initialRoute={
          createProblemListRoute(
            this.props.title,
            this.props.problems,
            this.navigateToProblemDetail
          )
      }/>
    );
  }
}

ProblemView.propTypes = {
  title: string.isRequired,
  problems: arrayOf(instanceOf(Problem)),
  requestProblems: func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProblemView;
