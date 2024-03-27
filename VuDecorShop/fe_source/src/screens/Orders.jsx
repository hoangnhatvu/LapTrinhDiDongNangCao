import {SafeAreaView} from 'react-native';
import React from 'react';
import styles from './order.style';
import {Heading} from '../components';
import StatusOrderNavigation from '../navigation/StatusOrderNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Orders = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Heading navigation={navigation} text="Đơn hàng của bạn" />
      <StatusOrderNavigation />
    </SafeAreaView>
  );
};

export default Orders;
