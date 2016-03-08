import React, {
  Component,
  Text,
  View,
  StyleSheet,
  PropTypes,
  TouchableOpacity,
} from 'react-native';

import { MAIN_COLOR, NAV_HEIGHT, } from '../style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { string, func, } = PropTypes;
const MAX_TITLE_LENGTH = 20;

class NavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { title, } = this.props;

    if (title.length > MAX_TITLE_LENGTH) {
      title = title.slice(0, MAX_TITLE_LENGTH) + '...';
    }

    return (
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          {this.props.onBackBtnPressed ? (
            <TouchableOpacity onPress={this.props.onBackBtnPressed}>
              <Icon name='reply' size={24} color={'#fff'}/>
            </TouchableOpacity>
          ) : null}
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.toolIcon}></View>
      </View>
    );
  }
}

NavigationBar.propTypes = {
  title: string.isRequired,
  onBackBtnPressed: func,
};

const styles = StyleSheet.create({
  container: {
    height: NAV_HEIGHT,
    backgroundColor: MAIN_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  iconWrapper: {
    flex: 1,
  },
  title: {
    flex: 8,
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
  toolIcon: {
    flex: 1,
  },
});

export default NavigationBar;
