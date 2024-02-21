import {View, FlatList} from 'react-native';
import React, {useState} from 'react';
import styles from './addressList.style';
import AddressItem from './AddressItem';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedAddress} from '../../redux/slices/selectedAddress.slice';

const AddressList = ({data}) => {
  const selectedAddress = useSelector(state => state.selectedAddress.value);
  const dispatch = useDispatch();
  const route = useRoute();
  const mode = route.params;

  const handleSelectItem = item => {
    dispatch(setSelectedAddress(item));
  };

  return (
    <View>
      <FlatList
        data={data}
        scrollEnabled={false}
        renderItem={({item}) => (
          <AddressItem
            item={item}
            selected={selectedAddress && selectedAddress.id === item.id}
            onSelect={handleSelectItem}
            mode={mode === 'select' && mode}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default AddressList;
