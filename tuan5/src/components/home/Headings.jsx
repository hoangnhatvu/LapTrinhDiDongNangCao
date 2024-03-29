import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './heading.style';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../constants';

const Headings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sản phẩm mới</Text>
        <TouchableOpacity onPress={() => {}}>
          <IonIcon name="grid" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Headings;
