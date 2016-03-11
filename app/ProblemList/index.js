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

import { connect, } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationBar from '../NavigationBar';
import Problem from '../data/Problem';
import { MAIN_COLOR, NAV_HEIGHT, TABBAR_HEIGHT, FONT_GREY, } from '../style';
import transform from './transform';
import { changeTransformer, } from '../state/actions';

const {
  arrayOf, instanceOf, func, string,
  object,
} = PropTypes;

class ProblemList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: ds.cloneWithRows(
        transform(props.problems, props.transformer)
      ),
    };

    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps(newProps) {
    // TODO: It seems that each time a new component will be
    // created instead of updating a component.

    // this.setState({
    //   dataSource: this.state.dataSource.cloneWithRows(
    //     transform(newProps.problems, newProps.transformer)
    //   ),
    // });
  }

  openProblem(id, title, url) {
    this.props.navigateToProblemDetail(id, title, url);
  }

  dispatchChangeTransformer(value) {
    this.props.dispatch(changeTransformer(
      this.props.title.toLowerCase(),
      'orderType',
      value
    ));
  }

  renderRow(problem) {
    const titleStyle = problem.isPremium ? [styles.title, {
      color: FONT_GREY,
    }] : styles.title;

    const content = (
      <View style={styles.problem}>
        <Text style={styles.id}>{problem.id}</Text>
        <View style={styles.container}>
          <Text style={titleStyle}>{problem.title}</Text>
          <View style={styles.subContainer}>
            <Text style={styles.subItem}>{problem.diffculty}</Text>
            <Text style={styles.subItem}>{problem.acceptance}</Text>
            {problem.isPremium ? (
              <Icon name='lock' size={12} color={FONT_GREY}/>
            ): null}
          </View>
        </View>
      </View>
    );

    if (problem.isPremium) {
      return content;
    } else {
      return (
        <TouchableWithoutFeedback onPress={this.openProblem.bind(
          this, problem.id, problem.title, problem.url
        )}>
          {content}
        </TouchableWithoutFeedback>
      );
    }
  }

  render() {
    const { problems, title, } = this.props;

    console.log('rerender');

    if (!Array.isArray(problems) || problems.length === 0) {
      return (
        <View style={styles.wrapper}>
          <NavigationBar title={title}/>
          <ActivityIndicatorIOS style={styles.loading}
            animating={true}
            size='small'/>
        </View>
      );
    } else {
      return (
        <View style={styles.wrapper}>
          <NavigationBar title={title}
            showListFilter={true}
            onFilterChange={this.dispatchChangeTransformer.bind(this)}/>
          {/* TODO: ListView here has a strange `paddingTop`*/}
          <ListView dataSource={this.state.dataSource}
            automaticallyAdjustContentInsets={false}
            renderRow={this.renderRow}/>
        </View>
      );
    }
  }
}

ProblemList.propTypes = {
  title: string.isRequired,
  problems: arrayOf(instanceOf(Problem)),
  navigateToProblemDetail: func.isRequired,
  transformer: object,
  dispatch: func.isRequired,
};

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: TABBAR_HEIGHT,
  },
  loading: {
    flex: 1,
  },
  problem: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
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
    borderColor: '#DDDDDD',
  },
  subItem: {
    fontSize: 12,
    color: FONT_GREY,
    marginRight: 10,
  },
});

const ConnectedProblemList = connect()(ProblemList);

export default ConnectedProblemList;
