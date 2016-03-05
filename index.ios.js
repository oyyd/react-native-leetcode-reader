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
import { getPreservation, } from './app/data/storage';
import { setProblems, } from './app/state/actions';

class leetcode extends Component {
  constructor(props) {
    super(props);

    this.store = createStore(reducers, applyMiddleware(thunk));

    (async () => {
      const preservation = await getPreservation();
      // TODO: const 'preserve'
      this.store.dispatch(setProblems(preservation, 'preserve'));
    })();

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
