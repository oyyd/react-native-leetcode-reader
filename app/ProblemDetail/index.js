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

const { string, func, object, number, } = PropTypes;

// TODO: move to data directory
const PREFIX = 'https://leetcode.com';

class ProblemDetail extends Component{
  constructor(props) {
    const { id, preserve, } = props;

    super(props);

    this.state = {
      problemDetail: preserve[id] ? preserve[id] : null,
      questionContentHeight: 0,
    };
    this.hasMounted = true;

    this.togglePreservation = this.togglePreservation.bind(this);
    this.handleNavigationChange = this.handleNavigationChange.bind(this);
  }

  componentWillMount() {
    if (!this.state.problemDetail) {
      // TODO: get from persistant data when possible
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

    if (this.props.preserve[problemDetail.id]) {
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
        <View style={styles.container}>
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
    const isPreserved = !!this.props.preserve[id];

    return (
      <ScrollView style={{flex: 1, height: 500,}}
        automaticallyAdjustContentInsets={false}>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <TouchableOpacity style={styles.preserIcon}
              onPress={this.togglePreservation}>
              {isPreserved ? (
                <Icon name='star' size={16} color={PRESERVE_COLOR}/>
              ) : (
                <Icon name='star-border' size={16} color={PRESERVE_COLOR}/>
              )}
            </TouchableOpacity>
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
            similar={similar} tags={tags}/>
        </View>
      </ScrollView>
    );
  }
}

ProblemDetail.propTypes = {
  id: number.isRequired,
  url: string,
  dispatch: func.isRequired,
  preserve: object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // TODO: this seems to be a bug of `NavigatorIOS`
    paddingTop: NAV_HEIGHT,
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

function mapState({preserve}) {
  return {
    preserve,
  };
}

const ConnectedProblemDetail = connect(mapState)(ProblemDetail);

export default ConnectedProblemDetail;
