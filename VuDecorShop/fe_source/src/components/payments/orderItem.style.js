import {StyleSheet} from 'react-native';
import {COLORS, SIZES, SHADOWS} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    borderRadius: SIZES.small,
    backgroundColor: '#fff',
    elevation: 2,
    margin: 2,
  },
  image: {
    marginLeft: SIZES.small,
    width: 75,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignContent: 'center',
  },
  productImg: {
    width: '100%',
    height: 75,
    borderRadius: SIZES.small,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productTitle: {
    fontSize: SIZES.medium,
    fontFamily: 'OpenSans-Bold',
    color: COLORS.primary,
  },
  option: {
    fontSize: SIZES.small + 2,
    fontFamily: 'OpenSans-Regular',
    color: COLORS.gray,
    marginTop: 1,
  },
  actionContainer: {
    paddingRight: SIZES.small,
    alignItems: 'flex-end',
  },
  quantityText: {
    color: COLORS.gray,
    fontFamily: 'OpenSans-Medium',
    marginHorizontal: SIZES.xSmall,
  },
});

export default styles;
