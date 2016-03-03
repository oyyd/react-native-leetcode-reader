import React, {
  Component,
  TabBarIOS,
  Text,
  View,
  StyleSheet,
} from 'react-native';

const { Item, } = TabBarIOS;

class AppTarBar extends Component {
  render() {
    // TODO: why do I have to set children for Items ?
    return (
      <TabBarIOS style={styles.container}
        tintColor={'#ff0000'}
        barTintColor={'#ffffff'}>
        <Item title="Algorithms"
          selected={false}
          onPress={() => {}}>
          {null}
        </Item>
        <Item title="Database"
          selected={true}
          onPress={() => {}}>
          {null}
        </Item>
        <Item title="Shell"
          selected={false}
          onPress={() => {}}>
          {null}
        </Item>
        <Item title="Preserve"
          selected={false}
          onPress={() => {}}>
          {null}
        </Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
});

export default AppTarBar;
