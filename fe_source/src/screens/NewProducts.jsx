import {View, Text, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './newProducts.style';
import {COLORS} from '../../constants';
import { ProductList } from '../components';
import { searchProducts } from '../helpers/handleProductApis';
import { useToastMessage } from '../hook/showToast';

const NewProducts = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const {showToast} = useToastMessage();

  const loadData = async () => {
    try {
      setIsLoading(true);
      const responseResults = await searchProducts({});
      setProductList(responseResults.data);
    } catch (error) {
      showToast('Có lỗi xảy ra !', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IonIcon
              name="chevron-back-circle"
              size={30}
              color={COLORS.lightWhite}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Sản phẩm mới</Text>
        </View>
        <ProductList data={productList} isLoading={isLoading}/>
      </View>
    </SafeAreaView>
  );
};

export default NewProducts;
