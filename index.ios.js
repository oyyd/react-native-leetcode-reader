'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} from 'react-native';

import { requestAlgorithmList, } from './app/data';
import AppTarBar from './app/AppTarBar';
import Welcome from './app/Welcome';

class leetcode extends Component {
  componentDidMount() {
    requestAlgorithmList().then(problems => {
      console.log(problems);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigatorIOS style={styles.container} initialRoute={{
          component: Welcome,
          title: 'Welcome',
          passProps: { test: '123' },
        }}/>
        <AppTarBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('leetcode', () => leetcode);
