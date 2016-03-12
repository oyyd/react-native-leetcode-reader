import React, {
  Component,
  Text,
  View,
  StyleSheet,
  PropTypes,
  TouchableOpacity,
  ActionSheetIOS,
  TextInput,
  Animated,
} from 'react-native';

import { ORDER_TYPE_NAMES, } from '../ProblemList/transform';
import { MAIN_COLOR, NAV_HEIGHT, BG_COLOR, } from '../style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { string, func, bool, } = PropTypes;
const MAX_TITLE_LENGTH = 19;
const ICON_SIZE = 24;
const ICON_COLOR = '#FFFFFF';
const ACTION_SHEET_OPTIONS = {
  options: Object.values(ORDER_TYPE_NAMES).concat([
    'cancel',
  ]),
  // TODO: destructiveButtonIndex
  cancelButtonIndex: ORDER_TYPE_NAMES.length,
};

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.inputWrapperWidth = 0;

    this.state = {
      showSearchInput: false,
      searchInputWidth: new Animated.Value(100),
    };

    this.changeOrderType = this.changeOrderType.bind(this);
    this.changeText = this.changeText.bind(this);
    this.toggleSearchInput = this.toggleSearchInput.bind(this);
  }

  changeText(text) {
    if (this.props.changeSearchString) {
      this.props.changeSearchString(text);
    }
  }

  changeOrderType() {
    ActionSheetIOS.showActionSheetWithOptions(ACTION_SHEET_OPTIONS, index => {
      if (this.props.changeOrderType) {
        this.props.changeOrderType(Object.keys(ORDER_TYPE_NAMES)[index]);
      }
    });
  }

  toggleSearchInput() {
    this.setState({
      showSearchInput: !this.state.showSearchInput,
    });

    if (this.state.showSearchInput) {
      this.refs.center.measure((ox, oy, width) => {
        Animated.spring(
          this.state.searchInputWidth, {
            toValue: width,
          }
        ).start();
      })
    } else {
      this.state.searchInputWidth.setValue(0);
      this.changeText(null);
    }
  }

  render() {
    let { title, preservationStatus, showListFilter, } = this.props;

    if (title.length > MAX_TITLE_LENGTH) {
      title = title.slice(0, MAX_TITLE_LENGTH) + '...';
    }

    return (
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          {this.props.onBackBtnPressed ? (
            <TouchableOpacity onPress={this.props.onBackBtnPressed}>
              <Icon name='reply' size={ICON_SIZE} color={ICON_COLOR}/>
            </TouchableOpacity>
          ) : null}
        </View>
        <View ref='center' style={styles.center}>
          {this.state.showSearchInput ? (
            <Animated.View style={{ width: this.state.searchInputWidth}}>
              <TextInput onChangeText={this.changeText}
                value={this.props.searchString}
                style={styles.searchInput}/>
            </Animated.View>
          ) : (
            <Text style={styles.title}>{title}</Text>
          )}
        </View>
        <View style={styles.toolIcon}>
          {typeof preservationStatus === 'boolean' ? (
            <TouchableOpacity onPress={this.props.onPreservationPressed}>
              <Icon name={preservationStatus ? 'star' : 'star-border'}
                size={ICON_SIZE} color={ICON_COLOR}/>
            </TouchableOpacity>
          ) : null}
          {showListFilter ? (
            <View style={styles.filters}>
              <TouchableOpacity onPress={this.toggleSearchInput}>
                <Icon name='search' size={ICON_SIZE} color={ICON_COLOR}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.changeOrderType}>
                {/* TODO: icon name */}
                <Icon name='swap-vert' size={ICON_SIZE} color={ICON_COLOR}/>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

NavigationBar.propTypes = {
  title: string.isRequired,
  onBackBtnPressed: func,
  preservationStatus: bool,
  onPreservationPressed: func,
  showListFilter: bool,
  changeOrderType: func,
  searchString: string,
  changeSearchString: func,
};

NavigationBar.defaultProps = {
  showListFilter: false,
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
    flex: 2,
  },
  center: {
    flex: 7.5,
  },
  title: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
  searchInput: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    height: ICON_SIZE,
    borderRadius: 10,
    backgroundColor: BG_COLOR,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 4,
  },
  toolIcon: {
    flex: 2,
    alignItems: 'flex-end',
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'absolute',
    right: 0,
    top: -10,
  },
});

export default NavigationBar;
