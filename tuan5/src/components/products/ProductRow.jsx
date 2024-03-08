import {View, FlatList} from 'react-native';
import React from 'react';
import {SIZES} from '../../../constants';
import ProductCardView from './ProductCardView';

const ProductRow = () => {
  const data = [1, 2];
  return (
    <View style={{marginTop: SIZES.small, marginHorizontal: 12}}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={() => <ProductCardView />}
        horizontal
        contentContainerStyle={{columnGap: 4}}
      />
    </View>
  );
};

export default ProductRow;
