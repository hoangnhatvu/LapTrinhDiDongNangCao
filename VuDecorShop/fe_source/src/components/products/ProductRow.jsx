import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../../constants';
import ProductCardView from './ProductCardView';
import useFetch from '../../hook/fetchData';

const ProductRow = () => {
  const {data, isLoading, error} = useFetch();
  return (
    <View style={{marginTop: SIZES.small, marginHorizontal: 12}}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ) : error ? (
        <Text>Có lỗi xảy ra</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => <ProductCardView item = {item}/>}
          horizontal
          contentContainerStyle={{columnGap: 4}}
        />
      )}
    </View>
  );
};

export default ProductRow;
