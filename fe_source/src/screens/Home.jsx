import {TouchableOpacity, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './home.style';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Welcome} from '../components';
import Carousel from '../components/home/Carousel';
import Headings from '../components/home/Headings';
import ProductRow from '../components/products/ProductRow';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../constants';
import CartManager from '../helpers/cartManager';

const Home = () => {
  const navigation = useNavigation();
  const [cartNumber, setCartNumber] = useState(0);

  const loadData = async () => {
    const cartList = await CartManager.getCartItems();
    setCartNumber(cartList.length);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: COLORS.offwhite, flex: 1}}>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <IonIcon name="location-outline" size={24} />
          <Text style={styles.location}>Việt Nam</Text>
          <View style={{alignItems: 'flex-end'}}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}> {cartNumber} </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <Fontisto name="shopping-bag" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <Welcome />
        <Carousel />
        <Headings />
        <ProductRow />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
