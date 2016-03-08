import React, {
  Component,
  View,
  Text,
  StyleSheet,
  PropTypes,
  TouchableOpacity,
} from 'react-native';

import { MAIN_COLOR, } from '../style';

const { string, func, } = PropTypes;

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.onPress) {
      return (
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={[styles.container, {backgroundColor: this.props.bgColor}]}>
            <Text style={styles.text}>{this.props.text}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={[styles.container, {backgroundColor: this.props.bgColor}]}>
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
      );
    }
  }
}

Button.propTypes = {
  text: string.isRequired,
  onPress: func,
  bgColor: string,
};

Button.defaultProps = {
  bgColor: MAIN_COLOR,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

export default Button;
