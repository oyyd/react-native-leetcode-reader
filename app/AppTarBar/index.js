import React, {
  Component,
  TabBarIOS,
  Text,
  View,
  StyleSheet,
  PropTypes,
} from 'react-native';

import { bindActionCreators, } from 'redux';
import { TabBarItem as Item, } from 'react-native-vector-icons/MaterialIcons';
import ProblemList from '../ProblemList';
import { MAIN_COLOR, } from '../style';

const { string, func, } = PropTypes;

const PROBLEM_SET_PREFIX = 'https://leetcode.com/problemset/';

const ITEMS = [{
  title: 'Algorithms',
  iconName: 'cached',
},{
  title: 'Database',
  iconName: 'storage',
},{
  title: 'Shell',
  iconName: 'indeterminate-check-box',
},{
  title: 'Preserve',
  iconName: 'star-border',
}];

const nullFunc = () => {};

import ProblemView from '../ProblemView';
import Problem from '../data/Problem';
import { connect, } from 'react-redux';
import { getProblems, } from '../state/actions';

class AppTabBar extends Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item, index) {
    const titleLowerCase = item.title.toLowerCase();
    // TODO: 'preserve'
    const requestProblems = titleLowerCase !== 'preserve' ? this.props.getProblems.bind(
      null,
      `${PROBLEM_SET_PREFIX}${titleLowerCase}`,
      titleLowerCase,
    ): nullFunc;

    return (
      <Item key={index}
        title={item.title}
        iconName={item.iconName}
        selected={this.props.activeRouteTitle === item.title}
        onPress={() => {this.props.changeRoute(item.title)}}>
        <ProblemView title={item.title}
          requestProblems={requestProblems}
          problems={this.props[titleLowerCase]}/>
      </Item>
    );
  }

  render() {
    return (
      <TabBarIOS style={styles.container}
        tintColor={MAIN_COLOR}
        barTintColor={'#ffffff'}>
        {ITEMS.map(this.renderItem)}
      </TabBarIOS>
    );
  }
}

AppTabBar.propTypes = {
  activeRouteTitle: string.isRequired,
  changeRoute: func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function mapState(state) {
  // TODO: specify properties
  return state;
}

function mapActions(dispatch) {
  return bindActionCreators({
    getProblems,
  }, dispatch);
}

const ConnectedAppTabBar = connect(mapState, mapActions)(AppTabBar);

export default ConnectedAppTabBar;
