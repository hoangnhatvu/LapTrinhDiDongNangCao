import {StyleSheet} from 'react-native';
import {COLORS, SIZES, SHADOWS} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: SIZES.xSmall,
    borderRadius: SIZES.small,
    backgroundColor: '#fff',
    elevation: 2,
    margin: 2,
  },
  radioButton: {
    paddingLeft: SIZES.small,
  },

  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  customerName: {
    fontSize: SIZES.medium,
    fontFamily: 'OpenSans-Bold',
    color: COLORS.primary,
  },
  phoneNumber: {
    fontSize: SIZES.small + 2,
    fontFamily: 'OpenSans-Regular',
    color: COLORS.gray,
    marginTop: 3,
  },
  address: {
    fontSize: SIZES.medium - 2,
    fontFamily: 'OpenSans-Regular',
    color: COLORS.gray,
    marginTop: 3,
  },
  actionContainer: {
    paddingRight: SIZES.small,
    alignItems: 'flex-end',
  },
  defaultContainer: {
    borderRadius:8,
    borderWidth: 1,
    borderColor: COLORS.red,
    width: 65,
    height: 25,
    marginTop: SIZES.xSmall,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  defaultText: {
    color: COLORS.red,
    fontSize: SIZES.small,
  }
});

export default styles;
