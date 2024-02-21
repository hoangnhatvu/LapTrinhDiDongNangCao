import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constants';

const OptionItem = ({text, isSelected, onPress, isAvailable}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isAvailable ? false : true}
      style={[styles.wrapper(isSelected, isAvailable)]}>
      <Text style={styles.textOption}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: (isSelected, isAvailable) => ({
    height: SIZES.xLarge + 8,
    paddingHorizontal: SIZES.small,
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: SIZES.small / 2,
    borderWidth: isSelected ? 2 : 1,
    borderColor: isSelected ? COLORS.primary : COLORS.gray,
    backgroundColor: isAvailable ? COLORS.white : COLORS.offwhite,
  }),

  textOption: {
    color: COLORS.black,
    fontFamily: 'OpenSans-Regular',
  },
});

export default OptionItem;
