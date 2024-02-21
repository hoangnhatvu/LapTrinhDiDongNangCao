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
  addAddressContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    bottom: 0,
    borderRadius: 10,
    marginHorizontal: SIZES.small,
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.small,
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
