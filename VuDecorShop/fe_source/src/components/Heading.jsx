import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES } from '../../constants';

const Heading = ({navigation, text, handleBack}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
          handleBack
        }}>
        <Ionicons name="chevron-back-circle" size={30} color={COLORS.primary} />
      </TouchableOpacity>
      <Text style={styles.heading}>{text}</Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginVertical: SIZES.large,
  },
  heading: {
    fontFamily: 'OpenSans-Bold',
    fontSize: SIZES.large,
    marginLeft: SIZES.small,
    color: COLORS.primary,
  },
});
