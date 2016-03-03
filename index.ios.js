'use strict';
import React, {
  AppRegistry,
  Component,
} from 'react-native';

import { createStore, } from 'redux';
import { Provider, } from 'react-redux';
import reducers from './app/state/reducers';
import AppTarBar from './app/AppTarBar';

class leetcode extends Component {
  constructor(props) {
    super(props);

    this.store = createStore(reducers);

    this.state = {
      activeRouteTitle: 'Algorithms',
    };
  }

  changeRoute(routeTitle) {
    this.setState({
      activeRouteTitle: routeTitle,
    });
  }

  render() {
    return (
      <Provider store={this.store}>
        <AppTarBar activeRouteTitle={this.state.activeRouteTitle}
          changeRoute={this.changeRoute.bind(this)}/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('leetcode', () => leetcode);
