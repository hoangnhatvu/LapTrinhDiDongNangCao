import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS, SHADOWS, SIZES} from '../../constants';

const DropdownComponent = ({placeholder, onValueChange, data, mode}) => {
  const [value, setValue] = useState(null);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        {mode === 'payment' && (
          <View style={styles.image}>
            <Image
              source={
                item.value === 1
                  ? require('../../assets/images/payOnReceived.png')
                  : require('../../assets/images/MoMo.png')
              }
              style={styles.paymentImg}
            />
          </View>
        )}
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      data={data ? data : []}
      placeholderStyle={styles.placeholderText}
      selectedTextStyle={styles.textItem}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      onChange={item => {
        setValue(item.value);
        onValueChange(item.label, item.value);
      }}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: COLORS.white,
    height: 50,
    borderRadius: SIZES.small,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: SIZES.large,
    elevation: 2,    
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: SIZES.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  placeholderText: {
    flex: 1,
    fontSize: SIZES.medium - 2,
  },
  image: {
    width: 40,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: SIZES.small,
  },
  paymentImg: {
    width: '100%',
    height: 40,
    borderRadius: SIZES.small,
    resizeMode: 'cover',
  },
});
