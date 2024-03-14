import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    margin: SIZES.medium,
    marginHorizontal: 12,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerTitle: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: SIZES.xLarge - 2,
  }
})

export default styles;