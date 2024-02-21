import {StyleSheet, Text, View} from 'react-native';
import {COLORS, SIZES, SHADOWS} from '../../constants';

const styles = StyleSheet.create({
  subText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: SIZES.medium,
    marginBottom: SIZES.small,
  },
  wrapper: {
    marginBottom: SIZES.large,
  },
  label: {
    fontFamily: 'OpenSans-Bold',
    fontSize: SIZES.xSmall,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: 'right',
  },
  inputWrapper: borderColor => ({
    borderColor: borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
    elevation: 2,
  }),
  iconStyle: {
    marginRight: 10,
  },
  errorMessage: {
    color: COLORS.red,
    fontFamily: 'OpenSans-Regular',
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
  },
  defaultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: "center",
    justifyContent: 'space-between'
  },
});

export default styles;
