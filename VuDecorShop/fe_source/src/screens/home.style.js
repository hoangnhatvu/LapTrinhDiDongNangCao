import { StyleSheet } from "react-native"
import { COLORS, SIZES } from "../../constants"
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "OpenSans-Bold",
    fontSize: 40
  },
  appBarWrapper: {
    marginHorizontal: 22,
    marginTop: SIZES.small
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  location: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: SIZES.medium,
    color: COLORS.gray
  },
  cartCount: {
    position: "absolute",
    bottom: 16,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "green",
    justifyContent: "center",
    zIndex: 999,
  },
  cartNumber: {
    fontFamily: "OpenSans-Regular",
    fontWeight: "600",
    fontSize: 10,
    color: COLORS.lightWhite
  }
})

export default styles