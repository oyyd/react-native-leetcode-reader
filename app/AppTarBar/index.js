import React, {
  Component,
  TabBarIOS,
  Text,
  View,
  StyleSheet,
  PropTypes,
  NavigatorIOS,
} from 'react-native';

import { TabBarItem as Item, } from 'react-native-vector-icons/MaterialIcons';
import ProblemList from '../ProblemList';

const { string, func, } = PropTypes;

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

import Welcome from '../Welcome';
import Problem from '../data/Problem';
import { connect, } from 'react-redux';

class AppTabBar extends Component {
  constructor(props) {
    super(props);
  }

  renderContent(Constructor, props, title) {
    return (
      <NavigatorIOS ref='nav'
        style={styles.container} initialRoute={{
        component: Constructor,
        title: title,
        passProps: props,
      }}/>
    );
  }

  render() {
    return (
      <TabBarIOS style={styles.container}
        tintColor={'#ff0000'}
        barTintColor={'#ffffff'}>
        {ITEMS.map((item, index) => (
          <Item key={index}
            title={item.title}
            iconName={item.iconName}
            selected={this.props.activeRouteTitle === item.title}
            onPress={() => {this.props.changeRoute(item.title)}}>
            {this.renderContent(ProblemList, {
              problems: this.props[item.title.toLowerCase()],
            }, item.title)}
          </Item>
        ))}
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
  return state;
}

const ConnectedAppTabBar = connect(mapState)(AppTabBar);

export default ConnectedAppTabBar;
