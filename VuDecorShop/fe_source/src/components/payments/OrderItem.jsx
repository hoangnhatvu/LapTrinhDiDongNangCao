import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './orderItem.style';
import {API_URL} from '@env';
import { formatCurrency } from '../../helpers/formatCurrency';

const OrderItem = ({item}) => {
  const {color, size} = item?.option || {};

  const optionText =
    color && size ? `${color}, ${size}` : color ? color : size && size;
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          source={
            item.image
              ? {uri: API_URL + item?.image}
              : require('../../../assets/images/no_image.png')
          }
          style={styles.productImg}
        />
      </View>
      <View style={styles.textContainer}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.productTitle}>
          {item?.productName}
        </Text>
        {optionText && <Text style={styles.option}>{optionText}</Text>}
        <Text style={styles.option}>
          {formatCurrency(item?.price)}  x  {item.quantity}
        </Text>
      </View>
    </View>
  );
};

export default OrderItem;
