import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.offwhite,
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.medium,
    maxHeight: '70%',
    borderTopLeftRadius: SIZES.small,
    borderTopRightRadius: SIZES.small,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: SIZES.medium,
    marginBottom: SIZES.small,
  },
  inputText: {
    flex: 1,
    borderWidth: 0.7,
    borderColor: COLORS.gray,
    fontSize: SIZES.small + 2,
    padding: SIZES.small /2,
    paddingLeft: SIZES.small,
    borderRadius: 10,
  },
  image: {
    width: 40,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignContent: 'center',
    margin: 5,
    marginRight: SIZES.small
  },
  productImg: {
    width: '100%',
    height: 40,
    borderRadius: SIZES.small,
    resizeMode: 'cover',
  },
  categoryWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    elevation: 1,
    borderRadius: SIZES.small
  }
});
export default styles;
