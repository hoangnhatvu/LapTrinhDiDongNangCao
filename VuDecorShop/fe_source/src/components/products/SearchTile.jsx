import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './searchTile.style';

const SearchTile = ({item}) => {
  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <View style={styles.image}>
          <Image source={{uri: item.product_image}} style={styles.productImg} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{item.product_name}</Text>
          <Text style={styles.supplier}>{item.category.category_name}</Text>
          <Text style={styles.supplier}>{item.price}</Text>

        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchTile;
