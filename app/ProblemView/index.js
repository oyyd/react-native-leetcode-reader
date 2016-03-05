import React, {
  NavigatorIOS,
  Component,
  PropTypes,
  StyleSheet,
} from 'react-native';

import Problem from '../data/Problem';
import ProblemList from '../ProblemList';
import PreserveProblemList from '../PreserveProblemList';
import ProblemDetail from '../ProblemDetail';
import { MAIN_COLOR, BG_COLOR, } from '../style';

const { string, arrayOf, instanceOf, func, object, } = PropTypes;

function createProblemListRoute(
  title, problems, navigateToProblemDetail, preservation
) {
  const isPreservation = !!preservation;

  return {
    component: isPreservation ? PreserveProblemList : ProblemList,
    title: title,
    passProps: Object.assign({}, {
      navigateToProblemDetail,
    }, isPreservation ? {
      preservation,
    } : {
      problems,
    }),
  };
}

function createProblemDetailRoute(id, title, url) {
  return {
    component: ProblemDetail,
    title,
    passProps: {
      id,
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
    if (this.props.problems === nextProps.problems
      && this.props.preservation === nextProps.preservation) {
      return ;
    }

    let newRoute = createProblemListRoute(
      nextProps.title,
      nextProps.problems,
      this.navigateToProblemDetail,
      nextProps.preservation
    );

    // TODO: We need a better way to judge route status.
    // Here, I assume that there can be only two routes at most.
    if (this.refs.nav.state.routeStack.length === 2) {
      this.refs.nav.replacePrevious(newRoute);
    } else {
      this.refs.nav.replace(newRoute);
    }
  }

  navigateToProblemDetail(id, title, url) {
    this.refs.nav.push(createProblemDetailRoute(id, title, url));
  }

  render() {
    return (
      <NavigatorIOS ref='nav'
        barTintColor={MAIN_COLOR}
        tintColor='#fff'
        titleTextColor='#fff'
        itemWrapperStyle={styles.itemWrapperStyle}
        style={styles.container} initialRoute={
          createProblemListRoute(
            this.props.title,
            this.props.problems,
            this.navigateToProblemDetail,
            this.props.preservation
          )
      }/>
    );
  }
}

ProblemView.propTypes = {
  title: string.isRequired,
  problems: arrayOf(instanceOf(Problem)),
  preservation: object,
  requestProblems: func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemWrapperStyle: {
    // TODO:
    backgroundColor: BG_COLOR,
  },
});

export default ProblemView;
