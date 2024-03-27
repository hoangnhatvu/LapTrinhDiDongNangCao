import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.small,
    backgroundColor: COLORS.offwhite,
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
});

export default styles;
