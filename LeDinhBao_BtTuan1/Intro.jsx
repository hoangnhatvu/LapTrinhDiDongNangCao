import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

const Intro = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Homepage');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{alignItems: "center", flex: 1}}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '600',
          paddingVertical: 20,
        }}>
        Giới thiệu bản thân
      </Text>
      <View>
        <Text>Họ tên: Lê Đình Bảo</Text>
        <Text>Mssv: 20110613</Text>
        <Text>Chuyên ngành: công nghệ phần mềm</Text>
      </View>
    </View>
  );
};

export default Intro;