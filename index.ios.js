'use strict';
import React, {
  AppRegistry,
  Component,
} from 'react-native';

import { createStore, applyMiddleware, } from 'redux';
import { Provider, } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './app/state/reducers';
import AppTabBar from './app/AppTabBar';

class leetcode extends Component {
  constructor(props) {
    super(props);

    this.store = createStore(reducers, applyMiddleware(thunk));

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
        <AppTabBar activeRouteTitle={this.state.activeRouteTitle}
          changeRoute={this.changeRoute.bind(this)}/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('leetcode', () => leetcode);
