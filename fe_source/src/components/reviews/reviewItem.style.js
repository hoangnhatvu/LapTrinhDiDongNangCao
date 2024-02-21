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
  quantityText: {
    color: COLORS.gray,
    fontFamily: 'OpenSans-Medium',
    marginHorizontal: SIZES.xSmall,
  },
  ratingWrapper: {
    padding: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.gray2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starContainer: {
    marginRight: 5,
  },
  reviewWrapper: {
    padding: SIZES.small,
  },
  textArea: {
    height: 100, 
    borderColor: COLORS.gray2,
    borderWidth: 0.7,
    borderRadius: SIZES.small,
    padding: SIZES.small,
  },
});

export default styles;
