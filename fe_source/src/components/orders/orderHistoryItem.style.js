import {StyleSheet} from 'react-native';
import {COLORS, SIZES, SHADOWS} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.small,
    backgroundColor: COLORS.white,
    elevation: 2,
    margin: 2,
  },
  productContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: SIZES.small,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.gray2,
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
  moreText: {
    alignItems: 'center',
    padding: SIZES.small,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.gray2,
  },

  totalWrapper: {
    padding: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.gray2,
  },
  totalText: {
    flexDirection: 'row',
  },
});

export default styles;
