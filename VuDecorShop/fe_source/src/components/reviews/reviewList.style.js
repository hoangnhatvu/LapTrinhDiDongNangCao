import {StyleSheet} from 'react-native';
import {COLORS, SIZES, SHADOWS} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    gap: 10,
    backgroundColor: COLORS.offwhite,
    flex: 1,
    paddingTop: SIZES.small,
  },
  loadingContainer: {
    width: SIZES.width,
    height: SIZES.height,
    opacity: 0.3,
    position: 'absolute',
    justifyContent: 'center',
    marginTop: - 200,
  },
});

export default styles;
