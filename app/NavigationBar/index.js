import React, {
  Component,
  Text,
  View,
  StyleSheet,
  PropTypes,
  TouchableOpacity,
  ActionSheetIOS,
} from 'react-native';

import { ORDER_TYPE_NAMES, } from '../ProblemList/transform';
import { MAIN_COLOR, NAV_HEIGHT, } from '../style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { string, func, bool, } = PropTypes;
const MAX_TITLE_LENGTH = 20;
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
  }

  changeOrderType() {
    ActionSheetIOS.showActionSheetWithOptions(ACTION_SHEET_OPTIONS, index => {
      if (this.props.onFilterChange) {
        this.props.onFilterChange(Object.keys(ORDER_TYPE_NAMES)[index]);
      }
    });
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
        <Text style={styles.title}>{title}</Text>
        {showListFilter ? (
          <View style={styles.filterContainer}>
            <TouchableOpacity>
              <Icon name='search' size={ICON_SIZE} color={ICON_COLOR}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.changeOrderType.bind(this)}>
              {/* TODO: icon name */}
              <Icon name='swap-vert' size={ICON_SIZE} color={ICON_COLOR}/>
            </TouchableOpacity>
          </View>
        ) : null}
        {typeof preservationStatus === 'boolean' ? (
          <View style={styles.toolIcon}>
            <TouchableOpacity onPress={this.props.onPreservationPressed}>
              <Icon name={preservationStatus ? 'star' : 'star-border'}
                size={ICON_SIZE} color={ICON_COLOR}/>
            </TouchableOpacity>
          </View>
        ) : null}
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
  onFilterChange: func,
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
  title: {
    flex: 8,
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
  toolIcon: {
    flex: 2,
    alignItems: 'flex-end',
  },
  filterContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

export default NavigationBar;
