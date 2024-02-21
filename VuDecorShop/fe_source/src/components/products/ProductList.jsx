import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import React from 'react';
import styles from './productList.style';
import useFetch from '../../hook/fetchData';
import {COLORS, SIZES} from '../../../constants';
import ProductCardView from './ProductCardView';

const ProductList = ({data, isLoading}) => {

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({item}) => <ProductCardView item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default ProductList;
