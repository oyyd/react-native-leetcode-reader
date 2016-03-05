import React, {
  Component,
  ListView,
  View,
  Text,
  PropTypes,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import { styles, } from '../ProblemList';

const { object, func, } = PropTypes;

class PreserveProblemList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: ds.cloneWithRows(Object.values(props.preservation)),
    };

    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(Object.values(newProps.preservation)),
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
    return (
      <ListView dataSource={this.state.dataSource}
        renderRow={this.renderRow}/>
    );
  }
}

PreserveProblemList.propTypes = {
  navigateToProblemDetail: func.isRequired,
  preservation: object,
};

export default PreserveProblemList;
