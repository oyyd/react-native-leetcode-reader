import React, {
  Component,
  ListView,
  View,
  Text,
  PropTypes,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Problem from '../data/Problem';
import { MAIN_COLOR, } from '../style';

const { arrayOf, instanceOf, } = PropTypes;

class ProblemList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: ds.cloneWithRows(this.props.problems || []),
    };

    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.problems || []),
    });
  }

  openProblem(url) {
    console.log(url);
  }

  renderRow(problem) {
    return (
      <TouchableWithoutFeedback onPress={this.openProblem.bind(this, problem.url)}>
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
    return (
      <ListView dataSource={this.state.dataSource}
        renderRow={this.renderRow}/>
    );
  }
}

ProblemList.propTypes = {
  problems: arrayOf(instanceOf(Problem)),
};

const styles = StyleSheet.create({
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
