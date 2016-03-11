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
import { MAIN_COLOR, } from '../style';
import ProblemView from '../ProblemView';
import Problem from '../data/Problem';
import { connect, } from 'react-redux';
import { getProblems, } from '../state/actions';


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
  title: 'Local',
  iconName: 'star-border',
}];

const nullFunc = () => {};

class AppTabBar extends Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item, index) {
    const titleLowerCase = item.title.toLowerCase();
    // TODO: use constant
    const isPreservation = titleLowerCase === 'local';
    const requestProblems = (!isPreservation) ? this.props.getProblems.bind(
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
          preservation={isPreservation ? this.props[titleLowerCase] : null}
          problems={isPreservation ? null : this.props[titleLowerCase]}
          transformer={this.props[`${titleLowerCase}Transformer`]}/>
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
  getProblems: func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function mapState({
  algorithms, algorithmsTransformer,
  database, databaseTransformer,
  shell, shellTransformer,
  local, localTransformer,
}) {
  return {
    algorithms, algorithmsTransformer,
    database, databaseTransformer,
    shell, shellTransformer,
    local, localTransformer,
  };
}

function mapActions(dispatch) {
  return bindActionCreators({
    getProblems,
  }, dispatch);
}

const ConnectedAppTabBar = connect(mapState, mapActions)(AppTabBar);

export default ConnectedAppTabBar;
