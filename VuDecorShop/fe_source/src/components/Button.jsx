import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constants';

const Button = ({title, onPress, isValid, loader, width}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle(isValid === false ? COLORS.gray : COLORS.primary, width)}>
      {loader === false ? (
        <Text style={styles.btnTxt}>{title}</Text>
      ) : (
        <ActivityIndicator />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnTxt: {
    fontFamily: 'OpenSans-Bold',
    color: COLORS.white,
    fontSize: 18,
    marginHorizontal: SIZES.xLarge
  },
  btnStyle: (backgroundColor, width) => ({
    height: 50,
    width: width ? width : '100%',
    marginVertical: 20,
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  }),
});
