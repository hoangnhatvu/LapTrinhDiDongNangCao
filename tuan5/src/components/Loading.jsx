import {StyleSheet, ActivityIndicator, View} from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../constants';

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={80} color={COLORS.primary} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadingContainer: {
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: COLORS.black,
    opacity: 0.3,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    zIndex: 99999,
  },
});
