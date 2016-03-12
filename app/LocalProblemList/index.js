import React, {
  Component,
  ListView,
  View,
  Text,
  PropTypes,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import { connect, } from 'react-redux';
import { styles, } from '../ProblemList';
import NavigationBar from '../NavigationBar';
import transform from '../ProblemList/transform';
import { changeTransformer, } from '../state/actions';

const { object, func, } = PropTypes;

class LocalProblemList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: ds.cloneWithRows(
        transform(Object.values(props.preservation), props.transformer)
      ),
    };

    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        transform(Object.values(newProps.preservation), newProps.transformer)
      ),
    });
  }

  openProblem(id, title, url) {
    this.props.navigateToProblemDetail(id, title, url);
  }

  dispatchChangeTransformer(type, value) {
    this.props.dispatch(changeTransformer(
      this.props.title.toLowerCase(),
      type,
      value
    ));
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
      <View style={styles.wrapper}>
        <NavigationBar title='Local'
          searchString={this.props.transformer.searchString}
          showListFilter={true}
          changeOrderType={this.dispatchChangeTransformer.bind(this, 'orderType')}
          changeSearchString={this.dispatchChangeTransformer.bind(this, 'searchString')}/>
        {Object.keys(this.props.preservation).length ? (
          <ListView automaticallyAdjustContentInsets={false}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}/>
        ) : (
          <Text style={localProblemListStyle.nullText}>
            All local problems will be shown here.
          </Text>
        )}
      </View>
    );
  }
}

LocalProblemList.propTypes = {
  navigateToProblemDetail: func.isRequired,
  preservation: object,
  transformer: object.isRequired,
  dispatch: func.isRequired,
};

const localProblemListStyle = StyleSheet.create({
  nullText: {
    fontSize: 16,
    color: '#CCC',
    textAlign: 'center',
    paddingTop: 40,
  },
});

const ConnectLocalProblemList = connect()(LocalProblemList);

export default ConnectLocalProblemList;
