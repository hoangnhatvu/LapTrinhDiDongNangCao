import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.small,
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
  checkDone: {
    flex: 1,
    marginTop: SIZES.xxLarge,
    alignItems: 'center',
  },
  textCheckDone: {
    fontFamily: 'OpenSans-Bold',
    fontSize: SIZES.xLarge,
    color: 'green',
  },
  textThanks: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: SIZES.large,
    color: COLORS.primary,
    textAlign: "center"
  }
});

export default styles;
