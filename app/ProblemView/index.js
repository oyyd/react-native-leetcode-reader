import React, {
  Navigator,
  Component,
  PropTypes,
  StyleSheet,
} from 'react-native';

import Problem from '../data/Problem';
import ProblemList from '../ProblemList';
import LocalProblemList from '../LocalProblemList';
import ProblemDetail from '../ProblemDetail';
import DiscussWebView from '../DiscussWebView';
import { MAIN_COLOR, BG_COLOR, } from '../style';

const { string, arrayOf, instanceOf, func, object, } = PropTypes;

function popRoute() {
  return this.pop();
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
    this.openDiscussPage = this.openDiscussPage.bind(this);
    this.createProblemListRoute = this.createProblemListRoute.bind(this);
    this.createDiscussRoute = this.createDiscussRoute.bind(this);
    this.createProblemDetailRoute = this.createProblemDetailRoute.bind(this);
  }

  componentWillUpdate(nextProps) {
    // update navigator when problems changed
    // if (this.props.problems === nextProps.problems
    //   && this.props.preservation === nextProps.preservation) {
    //   return ;
    // }

    let newRoute = this.createProblemListRoute(
      nextProps.title,
      nextProps.problems,
      nextProps.preservation,
      nextProps.transformer
    );

    // TODO: We need a better way to judge and change route status.
    // Here, I assume that the first route would always be `ProblemList`
    // which would cause unexpected behavior.
    if (this.refs.nav.state.routeStack.length === 2) {
      this.refs.nav.replacePrevious(newRoute);
    } else {
      this.refs.nav.replace(newRoute);
    }
  }

  createDiscussRoute(url) {
    return {
      component: DiscussWebView,
      passProps: {
        url,
      },
    };
  }

  createProblemListRoute(
    title, problems, preservation, transformer
  ) {
    const isPreservation = !!preservation;
    const { navigateToProblemDetail, } = this;

    return {
      component: isPreservation ? LocalProblemList : ProblemList,
      passProps: Object.assign({
        navigateToProblemDetail,
        title,
        transformer
      }, isPreservation ? {
        preservation,
      } : {
        problems,
      }),
    };
  }

  createProblemDetailRoute(id, title, url) {
    const { openDiscussPage, } = this;

    return {
      component: ProblemDetail,
      passProps: {
        title,
        id,
        url,
        openDiscussPage,
      },
    }
  }

  navigateToProblemDetail(id, title, url) {
    this.refs.nav.push(this.createProblemDetailRoute(
      id, title, url,
    ));
  }

  openDiscussPage(url) {
    this.refs.nav.push(this.createDiscussRoute(url));
  }

  render() {
    return (
      <Navigator ref='nav'
        sceneStyle={styles.itemWrapperStyle}
        style={styles.container}
        initialRoute={this.createProblemListRoute(
          this.props.title,
          this.props.problems,
          this.props.preservation,
          this.props.transformer
        )}
        renderScene={(route, navigator) => {
          const { title, passProps, } = route;
          const Component = route.component;

          return (
            <Component {...passProps} popRoute={popRoute.bind(navigator)}/>
          );
        }}/>
    );
  }
}

ProblemView.propTypes = {
  title: string.isRequired,
  problems: arrayOf(instanceOf(Problem)),
  preservation: object,
  requestProblems: func.isRequired,
  transformer: object.isRequired,
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
