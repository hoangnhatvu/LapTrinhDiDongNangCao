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
import { COLORS } from '../../constants';
import tw from 'twrnc';

const Home = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`flex flex-1 bg-offwhite`}>
      <View style={tw`mt-8 mx-4`}>
        <View style={styles.appBar}>
          <IonIcon name="location-outline" size={24} />
          <Text style={styles.location}>Việt Nam</Text>
          <View style={{alignItems: 'flex-end'}}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}> 8 </Text>
            </View>
            <TouchableOpacity onPress={() =>{}}>
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
