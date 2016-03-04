import React, {
  NavigatorIOS,
  Component,
  PropTypes,
  StyleSheet,
} from 'react-native';

import Problem from '../data/Problem';
import ProblemList from '../ProblemList';

const { string, arrayOf, instanceOf, } = PropTypes;

function createProblemListRoute(title, problems) {
  return {
    component: ProblemList,
    title: title,
    passProps: {
      problems,
    },
  };
}

class ProblemView extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!Array.isArray(this.props.problems) || this.props.problems.length < 1)  {
      this.props.requestProblems();
    }
  }

  componentWillUpdate(nextProps) {
    // update navigator
    // TODO:
    this.refs.nav.replace(createProblemListRoute(nextProps.title, nextProps.problems));
  }

  render() {
    return (
      <NavigatorIOS ref='nav'
        style={styles.container} initialRoute={
          createProblemListRoute(this.props.title, this.props.problems)
      }/>
    );
  }
}

ProblemView.propTypes = {
  title: string.isRequired,
  problems: arrayOf(instanceOf(Problem)),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProblemView;
