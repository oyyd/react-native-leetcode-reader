import React, {
  Component,
  Text,
  View,
  StyleSheet,
  PropTypes,
  WebView,
  TouchableWithoutFeedback,
  ActivityIndicatorIOS,
} from 'react-native';

import { connect, } from 'react-redux';
import { requestProblemDetail, } from '../data';
import { MAIN_COLOR, BG_COLOR, NAV_HEIGHT, TABBAR_HEIGHT, } from '../style';
import { addProblem, removeProblem, } from '../state/actions';

const { string, func, object, number, } = PropTypes;

// TODO: move to data directory
const PREFIX = 'https://leetcode.com';

class ProblemDetail extends Component{
  constructor(props) {
    const { id, preserve, } = props;

    super(props);

    this.state = {
      problemDetail: preserve[id] ? preserve[id] : null,
    };

    this.togglePreservation = this.togglePreservation.bind(this);
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

  togglePreservation() {
    const { dispatch, } = this.props;
    const { problemDetail, } = this.state;

    if (this.props.preserve[problemDetail.id]) {
      dispatch(removeProblem(problemDetail.id));
    } else {
      dispatch(addProblem(problemDetail));
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
      questionContent,
    } = this.state.problemDetail;
    const isPreserved = !!this.props.preserve[id];

    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.item}>ac: {totalAccepted}</Text>
          <Text style={styles.item}>total: {totalSubmissions}</Text>
          <Text style={styles.item}>diffculty: {diffculty}</Text>
        </View>
        <View>
          <TouchableWithoutFeedback onPress={this.togglePreservation}>
            <Text>preserve: {isPreserved.toString()}</Text>
          </TouchableWithoutFeedback>
        </View>
        {/* TODO: add inline style */}
        <WebView style={{borderBottomWidth: 0}}
          scalesPageToFit={false}
          automaticallyAdjustContentInsets={true}
          scrollEnabled={true}
          source={{
            html: `<div style="background-color: ${BG_COLOR};">${questionContent}</div>`,
        }}/>
      </View>
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
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  item: {
    color: MAIN_COLOR,
    fontSize: 12,
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
