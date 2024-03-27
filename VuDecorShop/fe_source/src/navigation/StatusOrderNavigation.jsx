import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {OrderHistoryList} from '../components';
import {COLORS, SIZES} from '../../constants';

const Tab = createMaterialTopTabNavigator();

const StatusOrderNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {backgroundColor: COLORS.primary},
        tabBarLabelStyle: {
          fontFamily: 'OpenSans-Medium',
          fontSize: SIZES.small,
        },
        tabBarItemStyle: {width: "auto"},
        tabBarStyle: {backgroundColor: COLORS.offwhite, elevation: 0},
      }}>
      <Tab.Screen
        name="Pending"
        component={OrderHistoryList}
        options={{tabBarLabel: 'Chờ xác nhận'}}
        initialParams={{status: 'Chờ xác nhận'}}
      />
      <Tab.Screen
        name="Picking"
        component={OrderHistoryList}
        options={{tabBarLabel: 'Đang lấy hàng'}}
        initialParams={{status: 'Đang lấy hàng'}}
      />
      <Tab.Screen
        name="Delivering"
        component={OrderHistoryList}
        options={{tabBarLabel: 'Đang vận chuyển'}}
        initialParams={{status: 'Đang vận chuyển'}}
      />
      <Tab.Screen
        name="Delivered"
        component={OrderHistoryList}
        options={{tabBarLabel: 'Đã giao hàng'}}
        initialParams={{status: 'Chờ đánh giá'}}
      />
      <Tab.Screen
        name="Canceled"
        component={OrderHistoryList}
        options={{tabBarLabel: 'Đã hủy'}}
        initialParams={{status: 'Đã hủy'}}
      />
    </Tab.Navigator>
  );
};

export default StatusOrderNavigation;
