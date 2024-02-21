import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './orderList.style';
import OrderItem from './OrderItem';
import {useSelector} from 'react-redux';

const OrderList = () => {
  const listOrderItem = useSelector(state => state.listOrderItem.value);

  return (
    <View style={{gap: 5}}>
      {listOrderItem.map((item, index) => {
        return(
          <OrderItem item={item} key={index}/>
        )
      })}
    </View>
  );
};

export default OrderList;
