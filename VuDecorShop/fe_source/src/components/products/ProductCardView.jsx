import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './productCardView.style';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '@env';
import { formatCurrency } from '../../helpers/formatCurrency';

const ProductCardView = ({item}) => {
  const navigation = useNavigation();
  const [urlImage, setUrlImage] = useState(API_URL + item.product_image);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', {item})}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: urlImage,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item.product_name}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {item.category.category_name}
          </Text>
          <Text style={styles.price}>đ {formatCurrency(item.options[0].price)}</Text>
        </View>
        {/* <TouchableOpacity style={styles.addBtn}>
          <IonIcon name="add-circle" size={35} color={COLORS.primary} />
        </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;
