import React, {
  Component,
  Text,
  View,
  StyleSheet,
  PropTypes,
  WebView,
  TouchableOpacity,
  ActivityIndicatorIOS,
  ScrollView,
} from 'react-native';

import { connect, } from 'react-redux';
import { requestProblemDetail, } from '../data';
import {
  MAIN_COLOR, BG_COLOR,
  NAV_HEIGHT, TABBAR_HEIGHT, PRESERVE_COLOR,
} from '../style';
import { addProblem, removeProblem, } from '../state/actions';
import composeWebViewContent from './composeWebViewContent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Panel from './Panel';
import NavigationBar from '../NavigationBar';

const { string, func, object, number, } = PropTypes;

// TODO: move to data directory
const PREFIX = 'https://leetcode.com';

class ProblemDetail extends Component{
  constructor(props) {
    const { id, local, } = props;

    super(props);

    this.state = {
      problemDetail: local[id] ? local[id] : null,
      questionContentHeight: 1000,
    };
    this.hasMounted = true;

    this.togglePreservation = this.togglePreservation.bind(this);
    this.handleNavigationChange = this.handleNavigationChange.bind(this);
  }

  componentWillMount() {
    if (!this.state.problemDetail) {
      requestProblemDetail(`${PREFIX}${this.props.url}`).then(problemDetail => {
        this.setState({
          problemDetail,
        });
      })
    }
  }

  componentWillUnmount() {
    this.hasMounted = false;
  }

  togglePreservation() {
    const { dispatch, } = this.props;
    const { problemDetail, } = this.state;

    if (this.props.local[problemDetail.id]) {
      dispatch(removeProblem(problemDetail.id));
    } else {
      dispatch(addProblem(problemDetail));
    }
  }

  handleNavigationChange(navState) {
    if (this.hasMounted && navState.title) {
      this.setState({
        questionContentHeight: parseInt(navState.title),
      });
    }
  }

  render() {
    if (!this.state.problemDetail) {
      return (
        <View style={styles.wrapper}>
          <NavigationBar title={this.props.title} onBackBtnPressed={this.props.popRoute}/>
          <ActivityIndicatorIOS style={styles.loading}
            animating={true}
            size='small'/>
        </View>
      );
    }

    const {
      title, id, totalAccepted,
      totalSubmissions, diffculty,
      questionContent, discussURL,
      similar, tags,
    } = this.state.problemDetail;
    const isSaved = !!this.props.local[id];

    return (
      <View style={styles.wrapper}>
        <NavigationBar title={title}
          onBackBtnPressed={this.props.popRoute}
          preservationStatus={isSaved}
          onPreservationPressed={this.togglePreservation}/>
        <ScrollView style={{flex: 1, height: 500,}}
          automaticallyAdjustContentInsets={false}>
          <View style={styles.container}>
            <View style={styles.infoContainer}>
              <Text style={styles.item}>ac: {totalAccepted}</Text>
              <Text style={styles.item}>total: {totalSubmissions}</Text>
              <Text style={[styles.item, {
                marginRight: 0
              }]}>diffculty: {diffculty}</Text>
            </View>
            {/* TODO: add inline style */}
            <WebView style={{height: this.state.questionContentHeight,}}
              scalesPageToFit={false}
              automaticallyAdjustContentInsets={false}
              scrollEnabled={false}
              bounces={false}
              onNavigationStateChange={this.handleNavigationChange}
              source={{
                html: composeWebViewContent(questionContent),
            }}/>
            <Panel discussURL={discussURL}
              openDiscussPage={this.props.openDiscussPage}
              similar={similar} tags={tags}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

ProblemDetail.propTypes = {
  title: string.isRequired,
  id: number.isRequired,
  url: string,
  dispatch: func.isRequired,
  local: object,
  openDiscussPage: func.isRequired,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingBottom: TABBAR_HEIGHT,
    paddingHorizontal: 10,
    flexDirection: 'column',
  },
  loading: {
    flex: 1,
  },
  infoContainer: {
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  item: {
    color: MAIN_COLOR,
    fontSize: 12,
    marginRight: 10,
  },
  preserIcon: {
    marginRight: 10,
  },
});

function mapState({local}) {
  return {
    local,
  };
}

const ConnectedProblemDetail = connect(mapState)(ProblemDetail);

export default ConnectedProblemDetail;
