import React, {
  Component,
  Text,
  View,
  StyleSheet,
  PropTypes,
  WebView,
} from 'react-native';

import { requestProblemDetail, } from '../data';
import { MAIN_COLOR, } from '../style';

const { string, } = PropTypes;

// TODO: move to data directory
const PREFIX = 'https://leetcode.com';

class ProblemDetail extends Component{
  constructor(props) {
    super(props);

    this.state = {
      problemDetail: null
    };
  }

  componentWillMount() {
    requestProblemDetail(`${PREFIX}${this.props.url}`).then(problemDetail => {
      this.setState({
        problemDetail,
      });
    })
  }

  render() {
    if (!this.state.problemDetail) {
      // TODO: loading
      return null;
    }

    const {
      title, id, totalAccepted,
      totalSubmissions, diffculty,
      questionContent,
    } = this.state.problemDetail;

    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.item}>ac: {totalAccepted}</Text>
          <Text style={styles.item}>total: {totalSubmissions}</Text>
          <Text style={styles.item}>diffculty: {diffculty}</Text>
        </View>
        <WebView style={{borderBottomWidth: 0}}
          scalesPageToFit={false}
          automaticallyAdjustContentInsets={true}
          scrollEnabled={true}
          source={{
            html: `<div>${questionContent}</div>`,
        }}/>
      </View>
    );
  }
}

ProblemDetail.propTypes = {
  url: string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // TODO: this seems to be a bug of `NavigatorIOS`
    paddingVertical: 60,
    paddingHorizontal: 10,
    flexDirection: 'column',
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

export default ProblemDetail;
