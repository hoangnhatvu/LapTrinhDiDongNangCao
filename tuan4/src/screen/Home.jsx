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

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{backgroundColor: COLORS.offwhite, flex: 1}}>
      <View className={'mx-22 mt-12'}>
        <View style={(className = 'flex-row justify-between items-center')}>
          <IonIcon name="location-outline" size={24} />
          <Text style={(className = 'font-semibold text-base text-gray-500')}>
            Việt Nam
          </Text>
          <View style={{alignItems: 'flex-end'}}>
            <View
              style={className="absolute bottom-4 w-4 h-4 rounded-2 bg-green-500 flex items-center justify-center z-50"}>
              <Text
                style={{
                  fontFamily: 'OpenSans-Regular',
                  fontWeight: '600',
                  fontSize: 10,
                  color: COLORS.lightWhite,
                }}>
                8
              </Text>
            </View>
            <TouchableOpacity onPress={() => {}}>
              <Fontisto name="shopping-bag" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
