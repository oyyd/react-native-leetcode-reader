import React, {
  Component,
  Text,
  View,
  PropTypes,
  StyleSheet,
  Animated,
} from 'react-native';

import { PRESERVE_COLOR, } from '../../style';
import Button from '../../Button';

const { array, string, } = PropTypes;

class TagList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowing: false,
      itemsT: new Animated.Value(0),
    };

    this.toggleTags = this.toggleTags.bind(this);
  }

  toggleTags() {
    const { isShowing, } = this.state,
      toValue = isShowing ? 0 : 1;

    if (!isShowing) {
      this.setState({
        isShowing: true,
      });
    }

    Animated.spring(
      this.state.itemsT, {
        toValue,
      }
    ).start(({ finished, }) => {
      if (finished && isShowing) {
        this.setState({
          isShowing: false,
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.list}>
        <View style={styles.btn}>
          <Button text={this.props.title} bgColor={PRESERVE_COLOR}
            onPress={this.toggleTags} />
        </View>
        {this.state.isShowing ? (
          <Animated.View style={[styles.items, {
            opacity: this.state.itemsT,
          }]}>
            {this.props.tags.map((item, index) => (
              <View key={index} style={styles.item}>
                <Button text={item.text}/>
              </View>
            ))}
          </Animated.View>
        ) : null}
      </View>
    );
  }
}

TagList.propTypes = {
  title: string.isRequired,
  tags: array.isRequired,
};

const styles = StyleSheet.create({
  list: {
    marginTop: 10,
  },
  btn: {
    flex: 3,
  },
  items: {
    flex: 7,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    marginRight: 10,
    marginTop: 10,
  },
});

export default TagList;
