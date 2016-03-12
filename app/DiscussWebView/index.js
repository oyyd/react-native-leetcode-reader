import React, {
  Component,
  WebView,
  PropTypes,
  View,
  StyleSheet,
  ActivityIndicatorIOS,
  ProgressViewIOS,
} from 'react-native';

import { BG_COLOR, PRESERVE_COLOR, } from '../style';
import { DOMAIN, } from '../constants';
import NavigationBar from '../NavigationBar';

const { string, } = PropTypes;

class DiscussWebView extends Component {
  constructor(props) {
    super(props);

    this.isInited = true;
    this.progressT = 0;

    this.state = {
      showLoading: true,
      progressValue: 0,
    };

    this.updateProgress = this.updateProgress.bind(this);
  }

  componentDidMount() {
    this.updateProgress();
  }

  componentWillUnmount() {
    this.isInited = false;
  }

  updateProgress() {
    if (this.isInited && this.state.showLoading
      && this.progressT < 0.9) {

      this.progressT += 0.01;
      this.setState({
        progressValue: Math.pow(this.progressT, 1/2),
      });

      setTimeout(this.updateProgress, 50);
    }
  }

  hideLoading() {
    this.setState({
      progressValue: 1,
    });

    setTimeout(() => {
      this.setState({
        showLoading: false,
      });
    }, 200);
  }

  render() {
    // TODO: title
    return (
      <View style={styles.container}>
        <NavigationBar title={'Discuss'}
          onBackBtnPressed={this.props.popRoute}/>
          {this.state.showLoading ? (
            <ProgressViewIOS style={styles.progressView}
              progressTintColor={PRESERVE_COLOR}
              progress={this.state.progressValue}/>
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
  progressView: {
    height: 2,
  }
});

export default DiscussWebView;
