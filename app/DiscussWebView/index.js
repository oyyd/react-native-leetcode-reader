import React, {
  Component,
  WebView,
  PropTypes,
  View,
  StyleSheet,
  ActivityIndicatorIOS,
} from 'react-native';

import { BG_COLOR, } from '../style';
import { DOMAIN, } from '../constants';
import NavigationBar from '../NavigationBar';

const { string, } = PropTypes;

class DiscussWebView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoading: true,
    };
  }

  hideLoading() {
    this.setState({
      showLoading: false,
    });
  }

  render() {
    // TODO: title
    return (
      <View style={styles.container}>
        <NavigationBar title={'Discuss'}
          onBackBtnPressed={this.props.popRoute}/>
          {this.state.showLoading ? (
            <ActivityIndicatorIOS style={styles.indicator} animating={true}/>
          ) : null}
        <WebView source={{url: `${DOMAIN}${this.props.url}`}}
          onLoadEnd={this.hideLoading.bind(this)}/>
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
    backgroundColor: '#FFF',
  },
  indicator: {
    flex: 1,
  },
});

export default DiscussWebView;
