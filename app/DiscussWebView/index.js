import React, {
  Component,
  WebView,
  PropTypes,
  View,
  StyleSheet,
} from 'react-native';

import { DOMAIN, } from '../constants';
import NavigationBar from '../NavigationBar';

const { string, } = PropTypes;

class DiscussWebView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // TODO: title
    return (
      <View style={styles.container}>
        <NavigationBar title={'Discuss'}
          onBackBtnPressed={this.props.popRoute}/>
        <WebView source={{url: `${DOMAIN}${this.props.url}`}}/>
      </View>
    );
  }
}

DiscussWebView.propTypes = {
  url: string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DiscussWebView;
