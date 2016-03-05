import React, {
  Component,
  ListView,
  View,
  Text,
  PropTypes,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicatorIOS,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Problem from '../data/Problem';
import { MAIN_COLOR, NAV_HEIGHT, TABBAR_HEIGHT, } from '../style';

const { arrayOf, instanceOf, func, } = PropTypes;

class ProblemList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(props.problems),
    };

    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.problems || []),
    });
  }

  openProblem(id, title, url) {
    this.props.navigateToProblemDetail(id, title, url);
  }

  renderRow(problem) {
    return (
      <TouchableWithoutFeedback onPress={
          this.openProblem.bind(this, problem.id, problem.title, problem.url)
        }>
        <View style={styles.problem}>
          <Text style={styles.id}>{problem.id}</Text>
          <View style={styles.container}>
            <Text style={styles.title}>{problem.title}</Text>
            <View style={styles.subContainer}>
              <Text style={styles.subItem}>{problem.diffculty}</Text>
              <Text style={styles.subItem}>{problem.acceptance}</Text>
              {problem.isPremium ? (
                <Icon name='lock' size={12} color='#999999'/>
              ): null}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { problems, } = this.props;

    if (!Array.isArray(problems) || problems.length === 0) {
      return (
        <View style={styles.wrapper}>
          <ActivityIndicatorIOS style={styles.loading}
            animating={true}
            size='small'/>
        </View>
      );
    } else {
      return (
        <View style={styles.wrapper}>
          <ListView dataSource={this.state.dataSource}
            renderRow={this.renderRow}/>
        </View>
      );
    }
  }
}

ProblemList.propTypes = {
  problems: arrayOf(instanceOf(Problem)),
  navigateToProblemDetail: func.isRequired,
};

export const styles = StyleSheet.create({
  wrapper: {
    paddingTop: NAV_HEIGHT,
    paddingBottom: TABBAR_HEIGHT,
    flex: 1,
  },
  loading: {
    flex: 1,
  },
  problem: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 8,
    flexDirection: 'column',
  },
  id: {
    textAlign: 'center',
    flex: 1,
    fontSize: 14,
    marginRight: 10,
  },
  title: {
    color: MAIN_COLOR,
    flex: 1,
    fontSize: 14,
  },
  subContainer: {
    paddingVertical: 4,
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#dddddd',
  },
  subItem: {
    fontSize: 12,
    color: '#999999',
    marginRight: 10,
  },
});

export default ProblemList;
