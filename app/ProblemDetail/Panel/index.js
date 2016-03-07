import React, {
  Component,
  StyleSheet,
  Text,
  View,
  PropTypes,
} from 'react-native';

import { DISCUSS_GREEN, PRESERVE_COLOR, } from '../../style';
import Button from '../../Button';
import TagList from './TagList';

const { string, array, } = PropTypes;

class Panel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { discussURL, similar, tags, } = this.props;

    return (
      <View style={styles.container}>
        <Button text='Discuss' bgColor={DISCUSS_GREEN}/>
        {(Array.isArray(similar) && similar.length) ? (
          <TagList title={'Show Similar Problems'} tags={similar}/>
        ) : null}
        {(Array.isArray(tags) && tags.length) ? (
          <TagList title={'Show Tags'} tags={tags}/>
        ) : null}
      </View>
    );
  }
}

Panel.propTypes = {
  discussURL: string.isRequired,
  similar: array,
  tags: array,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
});

export default Panel;
