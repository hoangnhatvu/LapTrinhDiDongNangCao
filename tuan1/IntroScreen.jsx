import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

const IntroScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('IndexScreen');
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
        Giới thiệu thành viên
      </Text>
      <View>
        <Text>Hoàng Nhất Vũ – 20110751</Text>
        <Text>Lại Văn Quý – 20110708</Text>
        <Text>Lê Đình Bảo – 20110613</Text>
      </View>
    </View>
  );
};

export default IntroScreen;
