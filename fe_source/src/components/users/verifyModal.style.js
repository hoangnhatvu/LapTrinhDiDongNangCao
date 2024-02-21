import {StyleSheet} from 'react-native';
import {COLORS, SIZES, SHADOWS} from '../../../constants';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  heading: {
    paddingBottom: SIZES.medium,
    fontFamily: 'OpenSans-Bold',
    fontSize: SIZES.medium,
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 300,
    height: 320,
    alignItems: 'center',
    padding: 20,
    ...SHADOWS.small,
  },
  wrapperInput: {
    flexDirection: 'row',
  },
  input: {
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    width: 40,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  timer: {
    marginTop: SIZES.medium,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 30,
  },
  errorMessage: {
    color: COLORS.red,
    fontFamily: 'OpenSans-Regular',
    marginTop: 5,
    fontSize: SIZES.xSmall,
  },
});

export default styles;
