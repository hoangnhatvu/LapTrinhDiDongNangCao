import {StyleSheet} from 'react-native';
import {SIZES, COLORS} from '../../constants';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: COLORS.lightWhite,
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: SIZES.xxLarge,
    width: SIZES.width - 44,
    zIndex: 999,
    marginTop: -SIZES.xLarge,
  },
  image: {
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  detailsWrapper: {
    maxHeight: 390,
    marginTop: -SIZES.large,
    backgroundColor: COLORS.offwhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
    paddingHorizontal: SIZES.small,
  },

  titleRow: {
    paddingVertical: SIZES.small,
    marginLeft: 4,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: SIZES.xLarge,
  },

  price: {
    paddingHorizontal: 10,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: SIZES.large,
  },
  priceWrapperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: SIZES.large,
  },
  priceWrapper: {
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: SIZES.small,
    paddingTop: SIZES.small / 2,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ratingText: {
    color: COLORS.gray,
    fontFamily: 'OpenSans-Medium',
    paddingHorizontal: SIZES.xSmall,
  },
  descriptionWrapper: {
    marginLeft: 4,
    paddingBottom: SIZES.large,
  },
  description: {
    fontFamily: 'OpenSans-Medium',
    fontSize: SIZES.large - 2,
  },
  descText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: SIZES.small,
    textAlign: 'justify',
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    paddingVertical: 5,
    paddingHorizontal: SIZES.small - 2,
    borderRadius: SIZES.large,
  },
  cartRow: {
    padding: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartBtn: {
    width: SIZES.width * 0.7,
    backgroundColor: COLORS.primary,
    padding: SIZES.small / 2,
    borderRadius: SIZES.large,
  },
  cartTitle: {
    marginLeft: SIZES.small,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
  },
  addCart: {
    width: 37,
    height: 37,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageUser: {
    width: 34,
    backgroundColor: COLORS.secondary,
    borderRadius: 50,
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 5,
    marginRight: SIZES.small,
  },
  userImgwrapper: {
    width: '100%',
    height: 34,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  ratingWrapper: {
    backgroundColor: COLORS.white,
    elevation: 1,
    borderRadius: SIZES.small,
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.small / 2,
    marginBottom: 4
  },
  userWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  textReview: {
    fontFamily: 'OpenSans-Regular',
    paddingLeft: SIZES.xxLarge,
    marginTop: 4
  },
});

export default styles;
