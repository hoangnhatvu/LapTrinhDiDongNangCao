import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.small,
    backgroundColor: COLORS.offwhite,
  },
  wrapper: {
    flexDirection: 'row',
    marginVertical: SIZES.large,
  },
  heading: {
    fontFamily: 'OpenSans-Bold',
    fontSize: SIZES.large,
    marginLeft: SIZES.small,
    color: COLORS.primary,
  },
  checkoutContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    bottom: 20,
    borderRadius: 10,
    marginHorizontal: SIZES.small,
    elevation: 2,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.small,
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.small,
  },
  totalText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: SIZES.medium,
    paddingHorizontal: SIZES.xSmall,
  },
  buttonCheckout: {
    backgroundColor: COLORS.primary,
    height: 50,
    margin: SIZES.medium,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCheckout: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: SIZES.large,
    color: COLORS.offwhite,
  },
  addAddressText: {
    flexDirection: 'row',
  },
  subText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: SIZES.medium,
    marginBottom: SIZES.small,
  },
});

export default styles;
