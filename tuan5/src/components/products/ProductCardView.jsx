import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './productCardView.style';

const ProductCardView = () => {
  return (
    <TouchableOpacity
      onPress={() => {}}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://marshallvietnam.vn/wp-content/uploads/2022/10/loa-di-dong-marshall-emberton-2-3.jpeg",
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            Loa Emberton
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            Loa
          </Text>
          <Text style={styles.price}>đ 1.000.000</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;
