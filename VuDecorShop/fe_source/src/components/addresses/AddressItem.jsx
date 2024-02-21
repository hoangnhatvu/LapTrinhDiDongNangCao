import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './addressItem.style';
import {RadioButton} from 'react-native-paper';

import {COLORS} from '../../../constants';
import {useNavigation} from '@react-navigation/native';

const AddressItem = ({item, selected, onSelect, mode}) => {
  const navigation = useNavigation();
  const handleCheck = () => {
    onSelect(item);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={mode === 'select' ? handleCheck : () => {}}>
        {mode === 'select' && (
          <View style={styles.radioButton}>
            <RadioButton.Android
              status={selected ? 'checked' : 'unchecked'}
              onPress={handleCheck}
            />
          </View>
        )}

        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.customerName}>
            {item.customer_name}
          </Text>
          <Text style={styles.phoneNumber}>{item.phone_number}</Text>
          <Text style={styles.address}>{item.address}</Text>
          {item.is_default && (
            <View style={styles.defaultContainer}>
              <Text style={styles.defaultText}>Mặc định</Text>
            </View>
          )}
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={() => {}}>
            {mode === 'payment' ? (
              <Ionicons
                onPress={() =>
                  navigation.navigate('Address', (mode = 'select'))
                }
                name="arrow-forward-circle-outline"
                size={24}
                color={COLORS.primary}
              />
            ) : (
              <Ionicons
                name="create-outline"
                size={24}
                color={COLORS.primary}
              />
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default AddressItem;
