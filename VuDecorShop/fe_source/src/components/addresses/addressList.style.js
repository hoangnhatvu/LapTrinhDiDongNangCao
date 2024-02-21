import {StyleSheet} from 'react-native';
import { SIZES } from '../../../constants';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  separator: {
    height: SIZES.small,
  },
});

export default styles;
