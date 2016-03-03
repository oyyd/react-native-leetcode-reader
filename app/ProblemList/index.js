import React, {
  Component,
  ListView,
  View,
  Text,
  PropTypes,
} from 'react-native';

import Problem from '../data/Problem';

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

  renderRow(problem) {
    return (
      <View>
        <Text>{problem.title}</Text>
      </View>
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

export default ProblemList;
