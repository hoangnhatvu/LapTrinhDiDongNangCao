import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.small,
    backgroundColor: COLORS.offwhite,
  },
  wrapper: {
    alignItems: 'center',
  },
  profile: {
    height: 155,
    width: 155,
    borderRadius: 999,
    resizeMode: 'cover',
  },
  name: {
    fontFamily: 'OpenSans-Bold',
    fontSize: SIZES.large,
    color: COLORS.primary,
    marginVertical: SIZES.sm,
  },
  emailWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.xxLarge,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailText: {
    fontFamily: 'OpenSans-Regular',
    color: COLORS.gray,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 26,
    marginHorizontal: SIZES.large,
  },
  menuText: {
    fontFamily: 'OpenSans-Medium',
    color: COLORS.gray,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 26,
  },
  menuWrapper: {
    marginTop: SIZES.xLarge,
    width: '92%',  
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
  menuItem: {
    borderBottomWidth: 0.7,
    flexDirection: 'row',
    paddingHorizontal: SIZES.small,
    borderColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: "space-between"
  },
  infoText: {
    fontFamily: "OpenSans-SemiBold",
    color: COLORS.primary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: 200,
    height: 170,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5, 
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  genderOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    alignItems: "center"
  },
});

export default styles;
