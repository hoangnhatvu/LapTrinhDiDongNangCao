import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    width: 186,
    height: 240,
    marginEnd: SIZES.small + 4,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
  },
  imageContainer: {
    flex: 1,
    padding: 6,
    borderRadius: SIZES.small,
    overflow: 'hidden',
  },
  image: {
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: SIZES.small,

  },
  details: {
    padding: SIZES.small,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: SIZES.large,
    marginBottom: 1,
  },
  supplier: {
    fontFamily: 'OpenSans-Regular',
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  price: {
    fontFamily: 'OpenSans-Bold',
    fontSize: SIZES.medium,
  },
  addBtn: {
    position: 'absolute',
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});

export default styles;
